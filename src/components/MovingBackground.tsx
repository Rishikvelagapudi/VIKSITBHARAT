import React, { useEffect, useRef } from 'react';

export const MovingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const updateDimensions = () => {
      if (!canvas) return;
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        window.innerHeight
      );
      const docWidth = Math.max(
        document.documentElement.scrollWidth,
        document.body.scrollWidth,
        window.innerWidth
      );

      width = canvas.width = docWidth;
      height = canvas.height = docHeight;
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(document.body);

    window.addEventListener('resize', updateDimensions);
    window.addEventListener('scroll', updateDimensions);

    // Mouse tracking
    let mouse = { x: width / 2, y: height / 2, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.pageX;
      mouse.y = e.pageY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // 1. Regular Twinkling Background Stars (Small & Medium)
    const starCount = Math.min(Math.floor((width * height) / 10000), 160);

    interface Star {
      x: number;
      y: number;
      radius: number;
      baseAlpha: number;
      twinkleSpeed: number;
      phase: number;
      color: string;
    }

    const starColors = [
      '#ffffff',               // Pure Diamond White
      '#ffffff',
      '#fef08a',               // Starlight Gold
      '#bae6fd',               // Starlight Cyan
      '#fed7aa',               // Warm Kesari Saffron
      '#a7f3d0',               // Starlight Emerald Green
    ];

    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * (width || window.innerWidth),
      y: Math.random() * (height || window.innerHeight),
      radius: Math.random() * 1.6 + 0.6,
      baseAlpha: Math.random() * 0.6 + 0.25,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      phase: Math.random() * Math.PI * 2,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    // 2. Large Radiant Shining Stars (with 4-Point Lens Flare Spikes)
    const shiningStarCount = Math.min(Math.max(Math.floor((width * height) / 80000), 14), 28);

    interface RadiantStar {
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      pulseSpeed: number;
      phase: number;
      color: 'white' | 'saffron' | 'cyan' | 'gold';
    }

    const radiantColors: ('white' | 'saffron' | 'cyan' | 'gold')[] = ['white', 'saffron', 'cyan', 'gold'];

    const radiantStars: RadiantStar[] = Array.from({ length: shiningStarCount }, () => ({
      x: Math.random() * (width || window.innerWidth),
      y: Math.random() * (height || window.innerHeight),
      size: Math.random() * 12 + 10,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.008,
      pulseSpeed: Math.random() * 0.025 + 0.015,
      phase: Math.random() * Math.PI * 2,
      color: radiantColors[Math.floor(Math.random() * radiantColors.length)],
    }));

    // 3. Graceful Shooting Stars (Meteors)
    interface Meteor {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
      active: boolean;
    }

    let meteor: Meteor = {
      x: 0,
      y: 0,
      length: 0,
      speed: 0,
      angle: 0.6, // ~35 degrees
      alpha: 0,
      active: false,
    };

    let meteorCooldown = 120; // frames before next meteor attempt

    const triggerMeteor = () => {
      meteor = {
        x: Math.random() * (width * 0.8),
        y: Math.random() * (height * 0.4),
        length: Math.random() * 90 + 70,
        speed: Math.random() * 10 + 9,
        angle: 0.55 + Math.random() * 0.15,
        alpha: 1,
        active: true,
      };
      meteorCooldown = Math.floor(Math.random() * 240 + 180);
    };

    // Helper: Draw 4-point shining star with cross flares
    const drawShiningStar = (
      x: number,
      y: number,
      radius: number,
      rotation: number,
      alpha: number,
      colorType: 'white' | 'saffron' | 'cyan' | 'gold'
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      const colorHues = {
        white: { glow: 'rgba(255, 255, 255, ', spike: 'rgba(255, 255, 255, ' },
        saffron: { glow: 'rgba(255, 103, 31, ', spike: 'rgba(255, 153, 51, ' },
        cyan: { glow: 'rgba(2, 132, 199, ', spike: 'rgba(56, 189, 248, ' },
        gold: { glow: 'rgba(245, 158, 11, ', spike: 'rgba(253, 224, 71, ' },
      }[colorType];

      // Soft circular halo
      const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, radius * 2.2);
      grad.addColorStop(0, `${colorHues.glow}${alpha * 0.9})`);
      grad.addColorStop(0.4, `${colorHues.glow}${alpha * 0.3})`);
      grad.addColorStop(1, `${colorHues.glow}0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Horizontal & Vertical long light streak spikes
      const spikeLength = radius * 2.5;
      const spikeWidth = radius * 0.18;

      ctx.fillStyle = `${colorHues.spike}${alpha * 0.85})`;

      // Horizontal spike
      ctx.beginPath();
      ctx.moveTo(-spikeLength, 0);
      ctx.lineTo(0, -spikeWidth);
      ctx.lineTo(spikeLength, 0);
      ctx.lineTo(0, spikeWidth);
      ctx.closePath();
      ctx.fill();

      // Vertical spike
      ctx.beginPath();
      ctx.moveTo(0, -spikeLength);
      ctx.lineTo(-spikeWidth, 0);
      ctx.lineTo(0, spikeLength);
      ctx.lineTo(spikeWidth, 0);
      ctx.closePath();
      ctx.fill();

      // 45-degree smaller secondary spikes
      const diagLength = radius * 1.3;
      const diagWidth = radius * 0.14;
      ctx.rotate(Math.PI / 4);

      ctx.beginPath();
      ctx.moveTo(-diagLength, 0);
      ctx.lineTo(0, -diagWidth);
      ctx.lineTo(diagLength, 0);
      ctx.lineTo(0, diagWidth);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, -diagLength);
      ctx.lineTo(-diagWidth, 0);
      ctx.lineTo(0, diagLength);
      ctx.lineTo(diagWidth, 0);
      ctx.closePath();
      ctx.fill();

      // Brilliant white center point
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(1.8, radius * 0.22), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();
    };

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw regular twinkling background stars
      stars.forEach((s) => {
        s.phase += s.twinkleSpeed;
        let alpha = s.baseAlpha + Math.sin(s.phase) * 0.35;
        alpha = Math.max(0.1, Math.min(0.95, alpha));

        // Proximity flare with mouse
        if (mouse.active) {
          const dx = mouse.x - s.x;
          const dy = mouse.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            alpha = Math.min(1, alpha + (1 - dist / 120) * 0.5);
          }
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      // 2. Draw large radiant 4-point shining stars
      radiantStars.forEach((rs) => {
        rs.phase += rs.pulseSpeed;
        rs.rotation += rs.rotationSpeed;

        let alpha = 0.55 + Math.sin(rs.phase) * 0.35;
        alpha = Math.max(0.2, Math.min(1, alpha));

        let currentSize = rs.size * (0.85 + Math.sin(rs.phase) * 0.25);

        // Mouse proximity increases star flare brightness
        if (mouse.active) {
          const dx = mouse.x - rs.x;
          const dy = mouse.y - rs.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const factor = 1 - dist / 150;
            currentSize += factor * 8;
            alpha = Math.min(1, alpha + factor * 0.4);
          }
        }

        drawShiningStar(rs.x, rs.y, currentSize, rs.rotation, alpha, rs.color);
      });

      // 3. Handle Meteor / Shooting Star
      if (meteor.active) {
        meteor.x += Math.cos(meteor.angle) * meteor.speed;
        meteor.y += Math.sin(meteor.angle) * meteor.speed;
        meteor.alpha -= 0.015;

        if (meteor.alpha <= 0) {
          meteor.active = false;
        } else {
          const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
          const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

          const meteorGrad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
          meteorGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          meteorGrad.addColorStop(0.7, `rgba(56, 189, 248, ${meteor.alpha * 0.6})`);
          meteorGrad.addColorStop(1, `rgba(255, 255, 255, ${meteor.alpha})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(meteor.x, meteor.y);
          ctx.strokeStyle = meteorGrad;
          ctx.lineWidth = 2.2;
          ctx.lineCap = 'round';
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 10;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      } else {
        meteorCooldown--;
        if (meteorCooldown <= 0) {
          triggerMeteor();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('scroll', updateDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#03060f]">
      {/* Cinematic Ambient Nebula Light Cones */}
      <div 
        className="absolute -top-[10%] left-[10%] w-[50vw] h-[50vh] rounded-full blur-[140px] opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF671F 0%, transparent 70%)' }}
      />
      <div 
        className="absolute top-[35%] -right-[10%] w-[55vw] h-[55vh] rounded-full blur-[160px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0284c7 0%, #000080 50%, transparent 75%)' }}
      />
      <div 
        className="absolute bottom-[5%] left-[5%] w-[55vw] h-[55vh] rounded-full blur-[150px] opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #10b981 0%, #047857 50%, transparent 70%)' }}
      />

      {/* Cyber Grid Texture */}
      <div className="absolute inset-0 bg-grid-tricolor opacity-30 pointer-events-none" />

      {/* Canvas for Twinkling Stars, Radiant 4-Point Shining Stars & Meteors */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
};
