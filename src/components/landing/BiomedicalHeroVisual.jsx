import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const STRUCTURE_URL = '/structures/6OGJ.pdb';

function createTube(points, radius, materialOptions) {
  if (points.length < 2) {
    return null;
  }

  const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal', 0.22);
  const geometry = new THREE.TubeGeometry(curve, Math.max(points.length * 8, 72), radius, 14, false);
  const material = new THREE.MeshPhysicalMaterial(materialOptions);

  return new THREE.Mesh(geometry, material);
}

function createBond(start, end, color, opacity = 0.22) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.022, length, 10),
    new THREE.MeshPhysicalMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.08,
      roughness: 0.3,
      metalness: 0.04,
      transparent: true,
      opacity,
    }),
  );

  mesh.position.copy(midpoint);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());

  return mesh;
}

function createMarker(position, radius, color, emissive, intensity) {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 18, 18),
    new THREE.MeshPhysicalMaterial({
      color,
      emissive,
      emissiveIntensity: intensity,
      roughness: 0.18,
      metalness: 0.04,
      transparent: true,
      opacity: 0.95,
    }),
  );

  mesh.position.copy(position);
  return mesh;
}

function disposeMaterial(material) {
  if (Array.isArray(material)) {
    material.forEach((entry) => entry?.dispose?.());
    return;
  }

  material?.dispose?.();
}

function parseStructure(text) {
  const proteinChains = { A: [], B: [] };
  const dnaChains = { C: [], D: [] };
  const highlights = [];
  const collected = [];

  for (const line of text.split(/\r?\n/)) {
    if (!line.startsWith('ATOM') && !line.startsWith('HETATM')) {
      continue;
    }

    const atomName = line.slice(12, 16).trim();
    const chain = line.slice(21, 22).trim();
    const residueNumber = Number.parseInt(line.slice(22, 26).trim(), 10);
    const element = line.slice(76, 78).trim();

    if (element === 'X') {
      continue;
    }

    const point = new THREE.Vector3(
      Number.parseFloat(line.slice(30, 38)),
      Number.parseFloat(line.slice(38, 46)),
      Number.parseFloat(line.slice(46, 54)),
    );

    if ((chain === 'A' || chain === 'B') && atomName === 'CA') {
      proteinChains[chain].push(point);
      collected.push(point.clone());

      if (residueNumber === 133) {
        highlights.push(point.clone());
      }
    }

    if ((chain === 'C' || chain === 'D') && atomName === 'P') {
      dnaChains[chain].push(point);
      collected.push(point.clone());
    }
  }

  if (!collected.length) {
    return { proteinChains, dnaChains, highlights };
  }

  const bounds = new THREE.Box3().setFromPoints(collected);
  const center = bounds.getCenter(new THREE.Vector3());
  const size = bounds.getSize(new THREE.Vector3());
  const scale = 7.2 / Math.max(size.x, size.y, size.z);

  const normalizePoints = (points) => points.map((point) => point.clone().sub(center).multiplyScalar(scale));

  return {
    proteinChains: {
      A: normalizePoints(proteinChains.A),
      B: normalizePoints(proteinChains.B),
    },
    dnaChains: {
      C: normalizePoints(dnaChains.C),
      D: normalizePoints(dnaChains.D),
    },
    highlights: normalizePoints(highlights),
  };
}

export default function BiomedicalHeroVisual() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0.15, 11.4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.42;
    controls.minPolarAngle = Math.PI * 0.28;
    controls.maxPolarAngle = Math.PI * 0.72;

    scene.add(new THREE.AmbientLight(0xe7f4ff, 1.05));
    scene.add(new THREE.HemisphereLight(0xcff3ff, 0x07111c, 0.78));

    const keyLight = new THREE.PointLight(0x86ebff, 26, 28, 2);
    keyLight.position.set(-6, 5, 8);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xd8a04d, 18, 18, 2);
    fillLight.position.set(5, -2, 6);
    scene.add(fillLight);

    const backLight = new THREE.PointLight(0xbfeeff, 10, 24, 2);
    backLight.position.set(0, 4, -7);
    scene.add(backLight);

    const root = new THREE.Group();
    scene.add(root);

    const haloRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.65, 0.04, 12, 160),
      new THREE.MeshBasicMaterial({
        color: 0xe5f6ff,
        transparent: true,
        opacity: 0.16,
      }),
    );
    haloRing.rotation.set(Math.PI / 2.4, 0.28, 0.2);
    root.add(haloRing);

    const particlePositions = new Float32Array(140 * 3);
    for (let index = 0; index < 140; index += 1) {
      const radius = 3.3 + Math.random() * 1.25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const positionIndex = index * 3;
      particlePositions[positionIndex] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[positionIndex + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.76;
      particlePositions[positionIndex + 2] = radius * Math.cos(phi);
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleCloud = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0xeaf7ff,
        transparent: true,
        opacity: 0.48,
        size: 0.045,
        sizeAttenuation: true,
      }),
    );
    root.add(particleCloud);

    let structureGroup = null;
    let cancelled = false;

    const buildStructure = async () => {
      const response = await fetch(STRUCTURE_URL);
      if (!response.ok) {
        throw new Error(`Failed to load structure: ${response.status}`);
      }

      const text = await response.text();
      if (cancelled) {
        return;
      }

      const structure = parseStructure(text);
      const group = new THREE.Group();
      root.add(group);
      structureGroup = group;

      const proteinA = createTube(structure.proteinChains.A, 0.115, {
        color: 0x8ae6fb,
        emissive: 0x2d8da7,
        emissiveIntensity: 0.16,
        roughness: 0.14,
        metalness: 0.04,
        transparent: true,
        opacity: 0.96,
        clearcoat: 0.8,
      });

      const proteinB = createTube(structure.proteinChains.B, 0.102, {
        color: 0xd8a04d,
        emissive: 0x8f5c27,
        emissiveIntensity: 0.18,
        roughness: 0.16,
        metalness: 0.04,
        transparent: true,
        opacity: 0.94,
        clearcoat: 0.72,
      });

      if (proteinA) {
        group.add(proteinA);
      }
      if (proteinB) {
        group.add(proteinB);
      }

      const dnaC = createTube(structure.dnaChains.C, 0.06, {
        color: 0xe7f4ff,
        emissive: 0x88c4eb,
        emissiveIntensity: 0.1,
        roughness: 0.18,
        metalness: 0.02,
        transparent: true,
        opacity: 0.86,
      });

      const dnaD = createTube(structure.dnaChains.D, 0.06, {
        color: 0xb3ebff,
        emissive: 0x4fb9dc,
        emissiveIntensity: 0.14,
        roughness: 0.18,
        metalness: 0.02,
        transparent: true,
        opacity: 0.86,
      });

      if (dnaC) {
        group.add(dnaC);
      }
      if (dnaD) {
        group.add(dnaD);
      }

      const rungCount = Math.min(structure.dnaChains.C.length, structure.dnaChains.D.length);
      for (let index = 0; index < rungCount; index += 1) {
        const start = structure.dnaChains.C[index];
        const end = structure.dnaChains.D[rungCount - index - 1];
        group.add(createBond(start, end, 0xcdefff, index % 2 === 0 ? 0.24 : 0.16));
      }

      structure.proteinChains.A.filter((_, index) => index % 11 === 0).forEach((point) => {
        group.add(createMarker(point, 0.072, 0xeef7ff, 0x7adbf7, 0.12));
      });

      structure.proteinChains.B.filter((_, index) => index % 13 === 0).forEach((point) => {
        group.add(createMarker(point, 0.078, 0xd8a04d, 0xd8a04d, 0.22));
      });

      structure.highlights.forEach((point) => {
        group.add(createMarker(point, 0.13, 0xf4d38f, 0xd8a04d, 0.44));
      });

      const highlightRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.55, 0.015, 10, 80),
        new THREE.MeshBasicMaterial({
          color: 0xf4d38f,
          transparent: true,
          opacity: 0.34,
        }),
      );
      highlightRing.position.set(0.2, 0.05, -0.1);
      highlightRing.rotation.set(Math.PI / 2.5, 0.6, 0.25);
      group.add(highlightRing);
    };

    buildStructure().catch((error) => {
      console.error(error);
    });

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (!clientWidth || !clientHeight) {
        return;
      }

      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight, false);
    };

    resize();
    window.addEventListener('resize', resize);

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      root.rotation.x = Math.sin(elapsed * 0.16) * 0.025;

      if (structureGroup) {
        structureGroup.rotation.y = -elapsed * 0.16;
        structureGroup.rotation.x = -0.08 + Math.sin(elapsed * 0.22) * 0.03;
        structureGroup.rotation.z = Math.sin(elapsed * 0.3) * 0.04;
      }

      haloRing.rotation.z += 0.0015;
      particleCloud.rotation.y = elapsed * 0.05;
      particleCloud.rotation.x = Math.sin(elapsed * 0.18) * 0.08;

      controls.update();
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      controls.dispose();

      root.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose?.();
        }
        if (object.material) {
          disposeMaterial(object.material);
        }
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="bio-hero-visual bio-hero-visual--interactive" aria-hidden="true">
      <div className="bio-aurora bio-aurora-one" />
      <div className="bio-aurora bio-aurora-two" />
      <div className="bio-aurora bio-aurora-three" />
      <div className="bio-stage-shell">
        <div className="bio-shell-ring bio-shell-ring-one" />
        <div className="bio-shell-ring bio-shell-ring-two" />
        <div className="bio-shell-ring bio-shell-ring-three" />
        <div ref={mountRef} className="bio-canvas-shell" />
      </div>
    </div>
  );
}
