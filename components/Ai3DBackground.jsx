"use client";
import React, { useEffect, useRef } from "react";

export default function Ai3DBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particles for 3D depth mesh
    const particleCount = 65;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 1000,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      vz: (Math.random() - 0.5) * 1.5,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Audio Wave bars
    const waveCount = 48;

    let time = 0;

    const render = () => {
      time += 0.02;

      // Dark futuristic gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, "#080b12");
      bgGradient.addColorStop(0.5, "#0f172a");
      bgGradient.addColorStop(1, "#030712");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // 3D Glowing AI Core in background
      const centerX = width / 2;
      const centerY = height / 2;
      const coreGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        Math.min(width, height) * 0.45
      );
      coreGlow.addColorStop(0, "rgba(234, 179, 8, 0.18)");
      coreGlow.addColorStop(0.4, "rgba(59, 130, 246, 0.12)");
      coreGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = coreGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw 3D Audio Spectrum Waves (Voice Assistant Simulation)
      const barWidth = width / waveCount;
      ctx.lineWidth = 3;

      for (let i = 0; i < waveCount; i++) {
        const x = i * barWidth + barWidth / 2;
        const waveHeight =
          Math.sin(time * 2 + i * 0.3) * 60 +
          Math.cos(time * 3 + i * 0.2) * 40 +
          70;

        const waveGrad = ctx.createLinearGradient(
          x,
          height / 2 - waveHeight,
          x,
          height / 2 + waveHeight
        );
        waveGrad.addColorStop(0, "rgba(234, 179, 8, 0.8)");
        waveGrad.addColorStop(0.5, "rgba(59, 130, 246, 0.6)");
        waveGrad.addColorStop(1, "rgba(147, 51, 234, 0.2)");

        ctx.strokeStyle = waveGrad;
        ctx.beginPath();
        ctx.moveTo(x, height / 2 - waveHeight / 2);
        ctx.lineTo(x, height / 2 + waveHeight / 2);
        ctx.stroke();
      }

      // Draw 3D Floating Nodes and Neural Connections
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.pulse += 0.03;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        if (p.z < 0 || p.z > 1000) p.vz *= -1;

        // Perspective scale
        const scale = 1000 / (1000 - p.z + 1);
        const sx = (p.x - centerX) * scale + centerX;
        const sy = (p.y - centerY) * scale + centerY;
        const radius = Math.max(0.5, p.radius * scale);
        const alpha = Math.min(1, Math.max(0.1, scale * 0.5));

        // Connect nearby nodes
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.strokeStyle = `rgba(234, 179, 8, ${(1 - dist / 140) * 0.15 * alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            const scale2 = 1000 / (1000 - p2.z + 1);
            ctx.lineTo((p2.x - centerX) * scale2 + centerX, (p2.y - centerY) * scale2 + centerY);
            ctx.stroke();
          }
        }

        // Draw node
        ctx.fillStyle = i % 2 === 0 ? "rgba(234, 179, 8, " + alpha + ")" : "rgba(96, 165, 250, " + alpha + ")";
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
    />
  );
}
