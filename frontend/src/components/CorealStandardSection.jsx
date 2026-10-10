import React, { useRef, useEffect } from 'react';

const CardGlobe = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const pts = [];
    const count = 72;
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = i * 2.399963;
      pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
    }

    let cw = 0, ch = 0, dpr = 1, angle = Math.random() * 10;
    let animId;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = canvas.clientWidth || 250;
      ch = canvas.clientHeight || 165;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const draw = () => {
      angle += 0.005;
      ctx.clearRect(0, 0, cw, ch);
      const cx = cw / 2;
      const cy = ch / 2;
      const R = Math.min(cw, ch) * 0.46;
      const ax = angle * 0.7;
      const ay = angle * 1.25;

      const p = pts.map(([x, y, z]) => {
        const x1 = x * Math.cos(ay) - z * Math.sin(ay);
        const z1 = x * Math.sin(ay) + z * Math.cos(ay);
        const y1 = y * Math.cos(ax) - z1 * Math.sin(ax);
        const z2 = y * Math.sin(ax) + z1 * Math.cos(ax);
        const k = 2.4 / (2.4 - z2);
        return { x: cx + x1 * R * k, y: cy + y1 * R * k, z: z2 };
      });

      const limit = (R * 0.6) ** 2;
      ctx.lineWidth = 0.8;
      for (let i = 0; i < p.length; i++) {
        for (let j = i + 1; j < p.length; j++) {
          const dx = p[i].x - p[j].x;
          const dy = p[i].y - p[j].y;
          const d = dx * dx + dy * dy;
          if (d < limit) {
            const al = (1 - d / limit) * 0.35 * ((p[i].z + p[j].z) / 2 + 1);
            ctx.strokeStyle = `rgba(37, 99, 235, ${Math.max(0, Math.min(al, 0.52))})`;
            ctx.beginPath();
            ctx.moveTo(p[i].x, p[i].y);
            ctx.lineTo(p[j].x, p[j].y);
            ctx.stroke();
          }
        }
      }

      p.forEach((pt) => {
        const depth = (pt.z + 1) / 2;
        ctx.fillStyle = `rgba(37, 99, 235, ${0.25 + depth * 0.55})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 0.8 + depth * 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="ad-globe" aria-hidden="true" />;
};

const AdCard = ({ isAriaHidden }) => (
  <article className="ad-slide has-card-globe" aria-hidden={isAriaHidden}>
    <CardGlobe />
    <div className="ad-slide-lockup">
      <div className="card-brand-lockup">
        <span className="card-brand-title">COREAL</span>
        <span className="card-brand-sub">The Perfect Space</span>
      </div>
      <div className="card-brand-tagline">
        One Location,<br />Multiple Options
      </div>
    </div>
  </article>
);

const principles = [
  {
    letter: "C",
    title: "Commitment",
    desc: "We deliver our promises on time"
  },
  {
    letter: "O",
    title: "Originality",
    desc: "Every property is verified with clear ownership and documentation."
  },
  {
    letter: "R",
    title: "Reliability",
    desc: "A dependable network built for businesses, who wants to scale."
  },
  {
    letter: "E",
    title: "Excellence",
    desc: "High standards in sourcing, verification and service."
  },
  {
    letter: "A",
    title: "Accountability",
    desc: "We take responsibility from sourcing to activation."
  },
  {
    letter: "L",
    title: "Leadership",
    desc: "Leading with Integrity, Foresight and Excellence"
  }
];

const CorealStandardSection = () => {
  const cardsCount = [0, 1, 2, 3, 4];

  return (
    <section className="standard-section" id="standard">
      <div className="container standard-container">
        <span className="standard-eyebrow-pill">
          <span className="eyebrow-dot"></span> THE COREAL STANDARD
        </span>
        <h2 className="standard-heading">Six Principles. One Promise: Space You Can Trust.</h2>
        <p className="standard-desc">
          Every Coreal space is sourced, Verified and delivered with the standards your business deserves.
        </p>

        <div className="principles-grid">
          {principles.map((p, idx) => (
            <article key={idx} className="principle-card">
              <span className="principle-badge">{p.letter}</span>
              <div className="principle-content">
                <h3 className="principle-title">{p.title}</h3>
                <p className="principle-desc">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom Horizontal Globe Slider */}
      <div className="ad-slider" aria-label="Partner spaces">
        <div className="ad-slider-track">
          {cardsCount.map((i) => (
            <AdCard key={`card-${i}`} />
          ))}
          {cardsCount.map((i) => (
            <AdCard key={`card-dup-${i}`} isAriaHidden={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CorealStandardSection;
