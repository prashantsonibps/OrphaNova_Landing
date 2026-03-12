import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, BookOpen, Database, Lightbulb, FlaskConical, FileText, CheckCircle } from 'lucide-react';

export default function WorkflowDiagram({ theme }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const isDark = theme === 'dark';

  const stages = [
    { 
      icon: Upload, 
      title: "Upload & Context",
      description: "Provide disease name, context, or research question.",
      angle: 0 
    },
    { 
      icon: BookOpen, 
      title: "Literature Retrieval",
      description: "Automatically collects relevant papers, case reports, registries, and OrphanAtlas insights.",
      angle: 51.4 
    },
    { 
      icon: Database, 
      title: "Evidence Extraction",
      description: "Extracts mechanisms, gene interactions, phenotypes, pathway data, and clinically relevant signals.",
      angle: 102.8 
    },
    { 
      icon: Lightbulb, 
      title: "Hypothesis Generation",
      description: "Produces evidence-grounded mechanistic hypotheses.",
      angle: 154.2 
    },
    { 
      icon: FlaskConical, 
      title: "Experiment Suggestions",
      description: "Suggests computational or wet-lab experiments to validate the hypotheses.",
      angle: 205.6 
    },
    { 
      icon: FileText, 
      title: "Paper Drafting",
      description: "Generates structured manuscript sections (Intro, Methods, Discussion).",
      angle: 257 
    },
    { 
      icon: CheckCircle, 
      title: "Review & Scoring",
      description: "Scores the reasoning, checks evidence grounding, and iterates with human-in-the-loop feedback.",
      angle: 308.4 
    }
  ];

  const radius = 180;
  const centerX = 250;
  const centerY = 250;

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
        {/* Background gradient circle */}
        <defs>
          <radialGradient id="bgGradient">
            <stop offset="0%" stopColor={isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <circle cx={centerX} cy={centerY} r={radius} fill="url(#bgGradient)" />
        
        {/* Orbit ring */}
        <circle 
          cx={centerX} 
          cy={centerY} 
          r={radius} 
          fill="none" 
          stroke={isDark ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.2)"} 
          strokeWidth="2"
          strokeDasharray="5,5"
        />

        {/* Connection arrows */}
        {stages.map((stage, index) => {
          const nextIndex = (index + 1) % stages.length;
          const x1 = centerX + radius * Math.cos((stage.angle - 90) * Math.PI / 180);
          const y1 = centerY + radius * Math.sin((stage.angle - 90) * Math.PI / 180);
          const x2 = centerX + radius * Math.cos((stages[nextIndex].angle - 90) * Math.PI / 180);
          const y2 = centerY + radius * Math.sin((stages[nextIndex].angle - 90) * Math.PI / 180);
          
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;
          const controlX = centerX + (radius + 20) * Math.cos(((stage.angle + stages[nextIndex].angle) / 2 - 90) * Math.PI / 180);
          const controlY = centerY + (radius + 20) * Math.sin(((stage.angle + stages[nextIndex].angle) / 2 - 90) * Math.PI / 180);

          return (
            <g key={`arrow-${index}`}>
              <motion.path
                d={`M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`}
                fill="none"
                stroke={isDark ? "rgba(59, 130, 246, 0.4)" : "rgba(59, 130, 246, 0.3)"}
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: hoveredIndex === index || hoveredIndex === null ? 1 : 0.3 
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              
              {/* Animated dot */}
              <motion.circle
                r="4"
                fill={isDark ? "#3b82f6" : "#2563eb"}
                filter="url(#glow)"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: index * 0.4
                }}
              >
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  begin={`${index * 0.4}s`}
                >
                  <mpath href={`#path-${index}`} />
                </animateMotion>
              </motion.circle>
              
              <path
                id={`path-${index}`}
                d={`M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`}
                fill="none"
                stroke="none"
              />
            </g>
          );
        })}
      </svg>

      {/* Center text */}
      <motion.div
        className="absolute flex flex-col items-center justify-center text-center"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div 
          className="text-lg sm:text-xl font-bold mb-1"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        >
          OrphaNova
        </div>
        <div 
          className="text-sm"
          style={{ color: isDark ? '#60a5fa' : '#3b82f6' }}
        >
          AI Scientist
        </div>
      </motion.div>

      {/* Stage nodes */}
      {stages.map((stage, index) => {
        const x = centerX + radius * Math.cos((stage.angle - 90) * Math.PI / 180);
        const y = centerY + radius * Math.sin((stage.angle - 90) * Math.PI / 180);
        const Icon = stage.icon;
        const isHovered = hoveredIndex === index;

        return (
          <motion.div
            key={index}
            className="absolute cursor-pointer group"
            style={{
              left: `${(x / 500) * 100}%`,
              top: `${(y / 500) * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                width: '80px',
                height: '80px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                background: isDark 
                  ? 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
                filter: 'blur(8px)'
              }}
              animate={{
                scale: isHovered ? 1.5 : 1,
                opacity: isHovered ? 1 : 0.5
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Node circle */}
            <motion.div
              className="relative backdrop-blur-sm border-2 rounded-full flex items-center justify-center"
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                borderColor: isHovered 
                  ? (isDark ? '#3b82f6' : '#2563eb')
                  : (isDark ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)'),
                boxShadow: isHovered 
                  ? `0 0 20px ${isDark ? 'rgba(59, 130, 246, 0.6)' : 'rgba(59, 130, 246, 0.4)'}`
                  : 'none'
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon 
                className="w-7 h-7" 
                style={{ color: isDark ? '#60a5fa' : '#3b82f6' }}
              />
            </motion.div>

            {/* Tooltip */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 p-3 rounded-lg shadow-xl backdrop-blur-md border max-w-[200px]"
                style={{
                  top: '80px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                  borderColor: isDark ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)'
                }}
              >
                <div 
                  className="text-sm font-semibold mb-1"
                  style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                >
                  {stage.title}
                </div>
                <div 
                  className="text-xs leading-relaxed"
                  style={{ color: isDark ? '#cbd5e1' : '#475569' }}
                >
                  {stage.description}
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}