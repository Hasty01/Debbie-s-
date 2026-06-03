import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  angle: number;
  speed: number;
}

export const InteractiveGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    const maxNodes = 80;
    const connectionDistance = 150;
    const repelRadius = 180;
    const easeFactor = 0.08;

    // Track theme
    const isDarkMode = () => document.documentElement.classList.contains("dark");

    const resizeCanvas = () => {
      const container = containerRef.current;
      const width = container ? container.clientWidth : window.innerWidth;
      const height = container ? container.clientHeight : window.innerHeight;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Re-initialize nodes on major resize to fill screen size
      initNodes(width, height);
    };

    const initNodes = (width: number, height: number) => {
      nodes = [];
      const density = Math.min(80, Math.floor((width * height) / 18000));
      for (let i = 0; i < density; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.5 + 1.2,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.005,
        });
      }
    };

    // Frame loops to draw the grid and nodes
    const render = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      const dark = isDarkMode();
      
      // Select colors based on theme
      const nodeColor = dark ? "rgba(212, 175, 55, 0.45)" : "rgba(212, 175, 55, 0.55)"; // Gold nodes
      const lineColor = dark ? "rgba(255, 255, 255, 0.04)" : "rgba(8, 8, 12, 0.04)"; // Interconnect lines
      const activeLineColor = dark ? "rgba(212, 175, 55, 0.15)" : "rgba(212, 175, 55, 0.18)"; // Hovered connections
      const gridPaperColor = dark ? "rgba(255, 255, 255, 0.015)" : "rgba(8, 8, 12, 0.015)"; // Digital grid background

      // 1. Draw dynamic background blueprint grid paper
      ctx.strokeStyle = gridPaperColor;
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Loop & Update Node coordinates
      nodes.forEach((node) => {
        // Subtle ambient horizontal/vertical float
        node.angle += node.speed;
        const driftX = Math.sin(node.angle) * 0.15;
        const driftY = Math.cos(node.angle) * 0.15;

        node.baseX += node.vx + driftX;
        node.baseY += node.vy + driftY;

        // Wall collisions / Wrap around
        if (node.baseX < 0) node.baseX = width;
        if (node.baseX > width) node.baseX = 0;
        if (node.baseY < 0) node.baseY = height;
        if (node.baseY > height) node.baseY = 0;

        // Pointer proximity reactive physics (Push Away / Repel effect similar to modern WebGL)
        let targetX = node.baseX;
        let targetY = node.baseY;

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        if (mx !== null && my !== null) {
          const dx = node.baseX - mx;
          const dy = node.baseY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repelRadius) {
            // Repel intensity curves stronger as mouse gets closer
            const force = (repelRadius - dist) / repelRadius;
            const repelX = (dx / dist) * force * 35;
            const repelY = (dy / dist) * force * 35;

            targetX = node.baseX + repelX;
            targetY = node.baseY + repelY;
          }
        }

        // Apply smooth transition acceleration (Easing)
        node.x += (targetX - node.x) * easeFactor;
        node.y += (targetY - node.y) * easeFactor;

        // Draw node
        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw subtle ring highlight for gold coordinate nodes if active near mouse
        if (mx !== null && my !== null) {
          const dx = node.x - mx;
          const dy = node.y - my;
          if (Math.sqrt(dx * dx + dy * dy) < repelRadius - 40) {
            ctx.strokeStyle = dark ? "rgba(212, 175, 55, 0.12)" : "rgba(212, 175, 55, 0.18)";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 2.8, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      });

      // 3. Connect close nodes with high-fidelity vector lines
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            let isFocused = false;

            if (mx !== null && my !== null) {
              const dX1 = n1.x - mx;
              const dY1 = n1.y - my;
              const dX2 = n2.x - mx;
              const dY2 = n2.y - my;
              if (Math.sqrt(dX1 * dX1 + dY1 * dY1) < repelRadius || Math.sqrt(dX2 * dX2 + dY2 * dY2) < repelRadius) {
                isFocused = true;
              }
            }

            const alpha = (connectionDistance - dist) / connectionDistance;
            ctx.strokeStyle = isFocused 
              ? activeLineColor.replace("0.15", (alpha * 0.28).toString()).replace("0.18", (alpha * 0.32).toString())
              : lineColor.replace("0.04", (alpha * 0.08).toString());
            
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Mouse movement track
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    // Setup events
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    // Resize Observer to match responsive grid calculations correctly
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    // Initial paint
    resizeCanvas();
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full min-h-screen overflow-hidden pointer-events-none z-0"
      id="hut8-background-container"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ opacity: 0.85 }}
      />
      {/* Dynamic luxury drift ambient glow underlays */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-elite-gold/5 blur-[160px] animate-pulse pointer-events-none" style={{ animationDuration: "12s" }} />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-neon-blue/[0.03] dark:bg-neon-blue/[0.04] blur-[180px] pointer-events-none" />
    </div>
  );
};
