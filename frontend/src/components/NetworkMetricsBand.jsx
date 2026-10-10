import React, { useRef, useEffect, useState } from 'react';
import { fetchMetrics } from '../services/api';

const NetworkCardGlobe = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // 72 nodes on Fibonacci sphere
    const pts = [];
    const count = 72;
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = i * 2.399963;
      pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
    }

    let cw = 0, ch = 0, dpr = 1, angle = 0;
    let animId;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = canvas.clientWidth || 800;
      ch = canvas.clientHeight || 260;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const draw = () => {
      angle += 0.0045;
      ctx.clearRect(0, 0, cw, ch);
      const cx = cw / 2;
      const cy = ch / 2;
      const R = Math.min(cw, ch) * 0.44;
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
      ctx.lineWidth = 0.85;
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
        ctx.arc(pt.x, pt.y, 0.9 + depth * 1.6, 0, Math.PI * 2);
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

const defaultMetrics = {
  states: { val: "28", unit: "States", sub: "+8 Union Territories" },
  cities: { val: "750+", unit: "Cities", sub: "Across Tier 1-4" },
  pincodes: { val: "11K+", unit: "PIN Codes", sub: "Mapped & Serviceable" },
  areas: { val: "65K+", unit: "Areas", sub: "Across India" },
  partners: { val: "175K+", sub: "Associate Partners Enrolled nationwide" },
};

const NetworkMetricsBand = () => {
  const [metrics, setMetrics] = useState(defaultMetrics);

  useEffect(() => {
    fetchMetrics().then(items => {
      if (Array.isArray(items) && items.length > 0) {
        const map = { ...defaultMetrics };
        items.forEach(m => {
          if (m.key === 'states') map.states = { val: m.value, unit: m.label, sub: m.subtext };
          if (m.key === 'cities') map.cities = { val: m.value, unit: m.label, sub: m.subtext };
          if (m.key === 'pincodes') map.pincodes = { val: m.value, unit: m.label, sub: m.subtext };
          if (m.key === 'areas') map.areas = { val: m.value, unit: m.label, sub: m.subtext };
          if (m.key === 'partners') map.partners = { val: m.value, sub: `${m.label} ${m.subtext}` };
        });
        setMetrics(map);
      }
    }).catch(err => console.warn("Using fallback metrics", err));
  }, []);

  return (
    <section className="network-band" id="network">
      {/* Subtle Concentric Rings Background */}
      <svg className="network-rings-bg" aria-hidden="true" viewBox="0 0 1600 900" fill="none">
        <circle cx="800" cy="340" r="140" stroke="#818cf8" strokeWidth="1.2" strokeOpacity="0.22" />
        <circle cx="800" cy="340" r="280" stroke="#818cf8" strokeWidth="1.2" strokeOpacity="0.20" />
        <circle cx="800" cy="340" r="430" stroke="#818cf8" strokeWidth="1.2" strokeOpacity="0.18" />
        <circle cx="800" cy="340" r="590" stroke="#818cf8" strokeWidth="1.2" strokeOpacity="0.16" />
        <circle cx="800" cy="340" r="760" stroke="#818cf8" strokeWidth="1.2" strokeOpacity="0.13" />
        <circle cx="800" cy="340" r="950" stroke="#818cf8" strokeWidth="1.2" strokeOpacity="0.10" />
        <circle cx="800" cy="340" r="1150" stroke="#818cf8" strokeWidth="1.2" strokeOpacity="0.08" />
      </svg>

      <div className="container network-container">
        <span className="network-eyebrow">OUR NETWORK</span>
        <h2 className="network-heading">India, Connected by Reach.</h2>
        <p className="network-subheading">
          A nationwide partner network built for fast, reliable commercial access.
        </p>

        {/* 5 Stats Cards Row */}
        <div className="network-metrics-grid">
          <div className="network-stat-card">
            <div className="stat-card-top">
              <span className="stat-number">{metrics.states.val}</span>
              <span className="stat-unit">{metrics.states.unit}</span>
            </div>
            <span className="stat-desc">{metrics.states.sub}</span>
          </div>

          <div className="network-stat-card">
            <div className="stat-card-top">
              <span className="stat-number">{metrics.cities.val}</span>
              <span className="stat-unit">{metrics.cities.unit}</span>
            </div>
            <span className="stat-desc">{metrics.cities.sub}</span>
          </div>

          <div className="network-stat-card">
            <div className="stat-card-top">
              <span className="stat-number">{metrics.pincodes.val}</span>
              <span className="stat-unit">{metrics.pincodes.unit}</span>
            </div>
            <span className="stat-desc">{metrics.pincodes.sub}</span>
          </div>

          <div className="network-stat-card">
            <div className="stat-card-top">
              <span className="stat-number">{metrics.areas.val}</span>
              <span className="stat-unit">{metrics.areas.unit}</span>
            </div>
            <span className="stat-desc">{metrics.areas.sub}</span>
          </div>

          <div className="network-stat-card">
            <div className="stat-card-top">
              <span className="stat-number">{metrics.partners.val}</span>
            </div>
            <span className="stat-desc">
              <strong className="stat-desc-bold">Associate Partners</strong><br />
              Enrolled nationwide
            </span>
          </div>
        </div>

        {/* Big Bottom Network Card */}
        <div className="network-hero-card has-card-globe">
          <NetworkCardGlobe />
          <div className="network-hero-lockup">
            <h3 className="network-hero-title">COREAL</h3>
            <div className="network-hero-sub">The Perfect Space</div>
            <div className="network-hero-tagline">One Location, Multiple Options</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkMetricsBand;
