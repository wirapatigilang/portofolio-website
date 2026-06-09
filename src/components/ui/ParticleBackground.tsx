"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originalVx: number;
  originalVy: number;
  radius: number;
  alpha: number;
  originalAlpha: number;
}

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  decay: number;
  alpha: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let trailParticles: TrailParticle[] = [];

    // Track mouse state
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      active: false,
    };

    const lastMouse = {
      x: 0,
      y: 0,
    };

    // Check media queries
    let hasHover = false;
    let isDarkMode = false;

    const updateMediaQueries = () => {
      hasHover = window.matchMedia("(hover: hover)").matches;
      isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    };

    updateMediaQueries();

    // Resize handler
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      // Initialize particles based on screen size
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width;
      const height = canvas.height;
      
      // Calculate particle count relative to screen area
      // Desktop gets ~100 particles, mobile gets ~40
      const area = (width * height) / (dpr * dpr);
      const particleCount = Math.min(Math.floor(area / 15000), hasHover ? 120 : 40);

      for (let i = 0; i < particleCount; i++) {
        // Base random velocities (extremely slow drift)
        const vx = (Math.random() - 0.5) * 0.4 * dpr;
        const vy = (Math.random() - 0.5) * 0.4 * dpr;
        const radius = (Math.random() * 1.5 + 0.8) * dpr;
        const originalAlpha = Math.random() * 0.4 + 0.15; // 0.15 to 0.55 opacity

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: vx,
          vy: vy,
          originalVx: vx,
          originalVy: vy,
          radius: radius,
          alpha: originalAlpha,
          originalAlpha: originalAlpha,
        });
      }
    };

    // Event listeners
    const handleMouseMove = (e: MouseEvent) => {
      if (!hasHover) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
      mouse.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // If user specified static on mobile, we ignore touch interaction
      // to keep it static/ambient.
      // So we do nothing here.
    };

    const handleSystemThemeChange = () => {
      isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    };

    // Setup listeners
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const hoverMediaQuery = window.matchMedia("(hover: hover)");

    // Listen to preferences changing dynamically
    themeMediaQuery.addEventListener("change", handleSystemThemeChange);
    hoverMediaQuery.addEventListener("change", updateMediaQueries);

    // Initial sizing
    resizeCanvas();

    // Animation Loop
    const animate = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width;
      const height = canvas.height;

      // Clear with transparent layer
      ctx.clearRect(0, 0, width, height);

      // Determine colors based on current system theme
      // Antigravity particles are clean white in dark mode, dark grey in light mode
      const rgbColor = isDarkMode ? "255, 255, 255" : "23, 23, 23";

      // 1. Update and Render Ambient Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around borders
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Interaction with mouse (Desktop only)
        if (hasHover && mouse.active && mouse.x !== null && mouse.y !== null) {
          const mx = mouse.x * dpr;
          const my = mouse.y * dpr;
          
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.hypot(dx, dy);
          const interactionRadius = 180 * dpr;

          if (dist < interactionRadius) {
            // Calculate pull force (stronger closer to the center)
            const force = (interactionRadius - dist) / interactionRadius;
            
            // Gently nudge particles toward the mouse cursor (attraction swarm)
            const targetVx = p.originalVx + (dx / dist) * force * 0.8 * dpr;
            const targetVy = p.originalVy + (dy / dist) * force * 0.8 * dpr;

            p.vx += (targetVx - p.vx) * 0.1;
            p.vy += (targetVy - p.vy) * 0.1;
            
            // Brighten up the particles that follow the cursor
            p.alpha += (Math.min(p.originalAlpha * 1.8, 0.8) - p.alpha) * 0.1;
          } else {
            // Restore original properties slowly
            p.vx += (p.originalVx - p.vx) * 0.03;
            p.vy += (p.originalVy - p.vy) * 0.03;
            p.alpha += (p.originalAlpha - p.alpha) * 0.03;
          }
        } else {
          // Restore original properties slowly if mouse inactive
          p.vx += (p.originalVx - p.vx) * 0.02;
          p.vy += (p.originalVy - p.vy) * 0.02;
          p.alpha += (p.originalAlpha - p.alpha) * 0.02;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgbColor}, ${p.alpha})`;
        ctx.fill();
      });

      // 2. Spawn and Render Trail Particles from Mouse movement (Desktop only)
      if (hasHover && mouse.active && mouse.x !== null && mouse.y !== null) {
        const mx = mouse.x * dpr;
        const my = mouse.y * dpr;

        // If the mouse has moved, generate trailing sparkles
        const dx = mx - lastMouse.x;
        const dy = my - lastMouse.y;
        const speed = Math.hypot(dx, dy);

        if (speed > 1 && trailParticles.length < 60) {
          // Spawn 1-2 particles per frame when moving
          const spawnCount = Math.min(Math.floor(speed / 4) + 1, 3);
          for (let i = 0; i < spawnCount; i++) {
            // Add slight random offset to position
            const offsetX = (Math.random() - 0.5) * 10 * dpr;
            const offsetY = (Math.random() - 0.5) * 10 * dpr;

            // Trail particles drift outwards slightly
            const pvx = (Math.random() - 0.5) * 0.3 * dpr - (dx * 0.05);
            const pvy = (Math.random() - 0.5) * 0.3 * dpr - (dy * 0.05);

            trailParticles.push({
              x: mx + offsetX,
              y: my + offsetY,
              vx: pvx,
              vy: pvy,
              radius: (Math.random() * 1.8 + 0.6) * dpr,
              life: 1.0,
              decay: 0.015 + Math.random() * 0.015, // lasts about 30-60 frames
              alpha: Math.random() * 0.5 + 0.3, // starting opacity
            });
          }
        }

        lastMouse.x = mx;
        lastMouse.y = my;
      }

      // Update and draw trail particles
      for (let i = trailParticles.length - 1; i >= 0; i--) {
        const tp = trailParticles[i];
        tp.x += tp.vx;
        tp.y += tp.vy;
        tp.life -= tp.decay;

        if (tp.life <= 0) {
          trailParticles.splice(i, 1);
          continue;
        }

        // Draw trail particle
        ctx.beginPath();
        ctx.arc(tp.x, tp.y, tp.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgbColor}, ${tp.alpha * tp.life})`;
        ctx.fill();
      }

      // 3. Draw connection lines for particles close to the mouse (Desktop only)
      if (hasHover && mouse.active && mouse.x !== null && mouse.y !== null) {
        const mx = mouse.x * dpr;
        const my = mouse.y * dpr;
        const connectionRadius = 120 * dpr;

        // Find particles near mouse to interconnect
        const nearParticles = particles.filter((p) => {
          const dist = Math.hypot(mx - p.x, my - p.y);
          return dist < connectionRadius;
        });

        // Draw connections between them to make it look like a constellation swarm
        for (let i = 0; i < nearParticles.length; i++) {
          for (let j = i + 1; j < nearParticles.length; j++) {
            const p1 = nearParticles[i];
            const p2 = nearParticles[j];
            const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            const maxConnectDist = 80 * dpr;

            if (dist < maxConnectDist) {
              const alphaFactor = (1 - dist / maxConnectDist) * 0.12;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${rgbColor}, ${alphaFactor})`;
              ctx.lineWidth = 0.6 * dpr;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start loop
    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      themeMediaQuery.removeEventListener("change", handleSystemThemeChange);
      hoverMediaQuery.removeEventListener("change", updateMediaQueries);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1, mixBlendMode: "normal" }}
    />
  );
}
