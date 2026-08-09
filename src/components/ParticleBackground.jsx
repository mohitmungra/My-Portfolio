import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create stars
    const count = Math.floor((window.innerWidth * window.innerHeight) / 8000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width,
        size: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        color: Math.random() > 0.92
          ? (Math.random() > 0.5 ? '#00f0ff' : '#7b2fff')
          : '#ffffff',
      });
    }

    // Nebula clouds (static blobs)
    const nebulae = [
      { x: 0.15, y: 0.2,  r: 250, color: 'rgba(123,47,255,0.04)' },
      { x: 0.85, y: 0.7,  r: 300, color: 'rgba(0,240,255,0.03)'  },
      { x: 0.5,  y: 0.5,  r: 200, color: 'rgba(255,0,110,0.025)' },
      { x: 0.25, y: 0.75, r: 180, color: 'rgba(0,255,136,0.025)' },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw nebulae
      nebulae.forEach(n => {
        const grd = ctx.createRadialGradient(
          n.x * canvas.width, n.y * canvas.height, 0,
          n.x * canvas.width, n.y * canvas.height, n.r
        );
        grd.addColorStop(0, n.color);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x * canvas.width, n.y * canvas.height, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw stars
      particles.forEach(p => {
        p.twinkle += p.twinkleSpeed;
        const twinkleFactor = (Math.sin(p.twinkle) + 1) / 2;
        const opacity = p.opacity * (0.5 + 0.5 * twinkleFactor);

        ctx.globalAlpha = opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow for colored stars
        if (p.color !== '#ffffff') {
          ctx.globalAlpha = opacity * 0.4;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Drift
        p.y += p.speed * 0.1;
        p.x += p.speed * 0.05 * Math.sin(p.twinkle * 0.3);
        if (p.y > canvas.height) { p.y = 0; p.x = Math.random() * canvas.width; }
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="bg-canvas"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '100%', height: '100%',
          zIndex: 0, pointerEvents: 'none'
        }}
      />
      <div className="grid-overlay" />
    </>
  );
}
