import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroAnimation({ theme }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Central lens - soft rotating glow (very faint)
    const lensGeometry = new THREE.RingGeometry(10, 12, 64);
    const lensMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x1e3a8a : 0x3b82f6,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const lens = new THREE.Mesh(lensGeometry, lensMaterial);
    lens.position.z = -20;
    scene.add(lens);

    // Inner lens glow
    const innerLensGeometry = new THREE.RingGeometry(8, 10, 64);
    const innerLensMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x3b82f6 : 0x60a5fa,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const innerLens = new THREE.Mesh(innerLensGeometry, innerLensMaterial);
    innerLens.position.z = -20;
    scene.add(innerLens);

    // Scientific micro-nodes (papers, genes, variants, trials)
    const nodeCount = 40;
    const nodes = [];
    const nodeGeometry = new THREE.SphereGeometry(0.15, 12, 12);

    // Define safe zone for text (no particles in center viewport)
    const textSafeZoneY = { min: -5, max: 10 };
    const textSafeZoneX = { min: -20, max: 20 };

    for (let i = 0; i < nodeCount; i++) {
      const colors = [0x60a5fa, 0x818cf8, 0xa78bfa, 0x06b6d4, 0x34d399];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0
      });

      const node = new THREE.Mesh(nodeGeometry, material);
      
      // Start from edges
      const side = Math.floor(Math.random() * 4);
      let startX, startY;
      
      if (side === 0) { // Top
        startX = (Math.random() - 0.5) * 80;
        startY = 40;
      } else if (side === 1) { // Bottom
        startX = (Math.random() - 0.5) * 80;
        startY = -40;
      } else if (side === 2) { // Left
        startX = -50;
        startY = (Math.random() - 0.5) * 60;
      } else { // Right
        startX = 50;
        startY = (Math.random() - 0.5) * 60;
      }

      node.position.set(startX, startY, (Math.random() - 0.5) * 30 - 10);

      // Target position - avoid text safe zone
      let targetX, targetY;
      do {
        targetX = (Math.random() - 0.5) * 40;
        targetY = (Math.random() - 0.5) * 35;
      } while (
        targetY > textSafeZoneY.min && 
        targetY < textSafeZoneY.max && 
        targetX > textSafeZoneX.min && 
        targetX < textSafeZoneX.max
      );

      node.userData = {
        startPosition: new THREE.Vector3(startX, startY, node.position.z),
        targetPosition: new THREE.Vector3(targetX, targetY, node.position.z),
        speed: 0.003 + Math.random() * 0.002,
        phase: 'drifting',
        connectableAfter: 2000 + Math.random() * 3000
      };

      nodes.push(node);
      scene.add(node);
    }

    // Connection lines between nodes (below text area only)
    const lines = [];
    const lineMaterial = new THREE.LineBasicMaterial({
      color: isDark ? 0x3b82f6 : 0x60a5fa,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });

    // Animation state
    let startTime = Date.now();

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      const elapsed = Date.now() - startTime;
      const seconds = elapsed / 1000;

      // Fade in lens slowly
      if (seconds < 3) {
        lens.material.opacity = Math.min(lens.material.opacity + 0.003, 0.08);
        innerLens.material.opacity = Math.min(innerLens.material.opacity + 0.003, 0.05);
      }

      // Rotate lens very slowly
      lens.rotation.z += 0.001;
      innerLens.rotation.z -= 0.0015;

      // Nodes drift inward slowly
      nodes.forEach((node, i) => {
        if (node.userData.phase === 'drifting') {
          // Fade in
          node.material.opacity = Math.min(node.material.opacity + 0.005, 0.4);

          // Move toward target
          const direction = node.userData.targetPosition.clone().sub(node.position).normalize();
          node.position.add(direction.multiplyScalar(node.userData.speed));

          // Check if reached target
          if (node.position.distanceTo(node.userData.targetPosition) < 0.5) {
            node.userData.phase = 'orbiting';
            node.userData.orbitCenter = node.position.clone();
            node.userData.orbitRadius = 0.3 + Math.random() * 0.5;
            node.userData.orbitSpeed = 0.0005 + Math.random() * 0.001;
            node.userData.orbitAngle = Math.random() * Math.PI * 2;
          }
        } else if (node.userData.phase === 'orbiting') {
          // Gentle orbital motion
          node.userData.orbitAngle += node.userData.orbitSpeed;
          node.position.x = node.userData.orbitCenter.x + Math.cos(node.userData.orbitAngle) * node.userData.orbitRadius;
          node.position.y = node.userData.orbitCenter.y + Math.sin(node.userData.orbitAngle) * node.userData.orbitRadius;
          
          // Subtle pulse
          node.material.opacity = 0.3 + Math.sin(seconds * 1.5 + i * 0.3) * 0.1;
        }

        // Create connections (only if below text safe zone)
        if (elapsed > node.userData.connectableAfter && node.userData.phase === 'orbiting') {
          const nearbyNodes = nodes.filter((other, j) => {
            if (i >= j) return false;
            const distance = node.position.distanceTo(other.position);
            // Only connect nodes that are below the text safe zone
            const nodeBelowText = node.position.y < textSafeZoneY.min;
            const otherBelowText = other.position.y < textSafeZoneY.min;
            return distance < 8 && distance > 0.1 && nodeBelowText && otherBelowText;
          });

          nearbyNodes.forEach(other => {
            const existingLine = lines.find(line => 
              (line.userData.nodeA === node && line.userData.nodeB === other) ||
              (line.userData.nodeA === other && line.userData.nodeB === node)
            );

            if (!existingLine && lines.length < 25 && Math.random() > 0.98) {
              const points = [node.position.clone(), other.position.clone()];
              const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
              const line = new THREE.Line(lineGeometry, lineMaterial.clone());
              line.userData = { nodeA: node, nodeB: other, createdAt: elapsed };
              lines.push(line);
              scene.add(line);
            }
          });
        }
      });

      // Update and fade in connection lines
      lines.forEach((line, idx) => {
        // Update line positions
        const points = [
          line.userData.nodeA.position.clone(),
          line.userData.nodeB.position.clone()
        ];
        line.geometry.setFromPoints(points);

        // Fade in slowly
        const lineAge = elapsed - line.userData.createdAt;
        if (lineAge < 2000) {
          line.material.opacity = Math.min(line.material.opacity + 0.002, 0.15);
        } else {
          // Gentle pulse
          line.material.opacity = 0.1 + Math.sin(seconds * 2 + idx * 0.2) * 0.05;
        }
      });

      renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0"
      style={{
        background: isDark 
          ? 'radial-gradient(ellipse at center, #0a1628 0%, #020617 50%, #000000 100%)'
          : 'radial-gradient(ellipse at center, #dbeafe 0%, #f1f5f9 50%, #e0f2fe 100%)'
      }}
    />
  );
}