import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import IndiaNetworkMap from './IndiaNetworkMap';
import { fetchMetrics } from '../services/api';

const TAGLINES = [
  { text: "Connect. Close. Celebrate", color: "#f97316" },
  { text: "Clear Deals. Better Moves.", color: "#ff8c00" },
  { text: "One location Multiple options", color: "#22c55e" },
  { text: "Real Vision, Real Value, Real Estate.", color: "#3b82f6" }
];

const defaultHeroMetrics = {
  cities: "750+",
  partners: "175K+",
  agreement: "1",
  coverage: "Tier 1–4"
};

const HeroSection = ({ onSearch, onOpenProcure }) => {
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const [searchQuery, setSearchQuery] = useState('Mumbai');
  const [heroMetrics, setHeroMetrics] = useState(defaultHeroMetrics);

  useEffect(() => {
    fetchMetrics().then(items => {
      if (Array.isArray(items) && items.length > 0) {
        const updated = { ...defaultHeroMetrics };
        items.forEach(m => {
          if (m.key === 'cities') updated.cities = m.value;
          if (m.key === 'partners') updated.partners = m.value;
          if (m.key === 'agreement') updated.agreement = m.value;
        });
        setHeroMetrics(updated);
      }
    }).catch(err => console.warn("Using fallback hero metrics", err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTaglineIdx((prev) => (prev + 1) % TAGLINES.length);
        setFade(true);
      }, 250);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <section className="home-hero">
      {/* Container for Split 2-Column Hero */}
      <div className="container hero-split-container">
        {/* Left Column: Segmented Zone-Colored India Map */}
        <div className="hero-map-col">
          <IndiaNetworkMap />
        </div>

        {/* Right Column: Hero Copy + Geodesic Network Wireframe */}
        <div className="hero-copy-col">
          {/* Geodesic Wireframe SVG Globe in background */}
          <div className="geodesic-wireframe-bg" aria-hidden="true">
            <svg viewBox="0 0 500 500" width="100%" height="100%" fill="none" opacity="0.32">
              {/* Concentric circles and poly lines representing 3D node dome */}
              <circle cx="250" cy="250" r="210" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 5" />
              <circle cx="250" cy="250" r="160" stroke="#2563eb" strokeWidth="0.8" strokeDasharray="4 4" />
              <circle cx="250" cy="250" r="100" stroke="#1d4ed8" strokeWidth="0.8" />
              
              {/* Geodesic Triangulation Lattice */}
              <polygon points="250,40 370,120 370,260 250,340 130,260 130,120" stroke="#38bdf8" strokeWidth="1" />
              <polygon points="250,90 340,160 340,280 250,350 160,280 160,160" stroke="#2563eb" strokeWidth="0.8" />
              <line x1="250" y1="40" x2="250" y2="340" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 3" />
              <line x1="130" y1="120" x2="370" y2="260" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 3" />
              <line x1="130" y1="260" x2="370" y2="120" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 3" />

              {/* Interconnected points */}
              {[
                [250, 40], [370, 120], [370, 260], [250, 340], [130, 260], [130, 120],
                [200, 180], [300, 180], [250, 250], [210, 290], [290, 290], [340, 200]
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="3" fill="#60a5fa">
                  <animate attributeName="r" values="2;4;2" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </svg>
          </div>

          {/* Kicker Pill */}
          <div className="home-kicker-pill">
            <span className="kicker-pulse-dot"></span>
            <span>India's First Integrated Real Estate Platform</span>
          </div>

          {/* Heading H1 (2 Lines) */}
          <h1 className="hero-main-title">
            Find the Right Space,
            <span className="hero-pin-gradient">In Every Pin Code.</span>
          </h1>

          {/* Subtitle Paragraph with rotating highlighted tagline */}
          <p className="hero-desc-para">
            Verified commercial spaces across India, For Dark Stores, Warehouses, Commercial &amp; Offices, Bank Branches &amp; ATMs, Healthcare &amp; Pharma, Retail &amp; High-Street, Logistics Parks and Cold Storage to Fulfillment Centers,{' '}
            <b 
              className="hero-dynamic-tagline"
              style={{
                opacity: fade ? 1 : 0,
                color: TAGLINES[taglineIdx].color,
                transition: 'opacity 0.25s ease'
              }}
            >
              {TAGLINES[taglineIdx].text}
            </b>
          </p>

          {/* Search Card */}
          <form className="hero-search-card" onSubmit={handleSearchSubmit}>
            <span className="search-ico-wrap" aria-hidden="true">
              <Search size={18} />
            </span>
            <input 
              type="text" 
              className="search-input-field" 
              placeholder="Search by locality" 
              aria-label="Search by locality"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-submit-btn">
              Search
            </button>
          </form>

          {/* Action CTAs */}
          <div className="hero-buttons-row">
            <button className="btn-hero-blue" onClick={() => onOpenProcure('procure')}>
              Procure Space →
            </button>
            <button className="btn-hero-white" onClick={() => onOpenProcure('provide')}>
              Become Partner →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Stats Row */}
      <div className="container hero-stats-container">
        <div className="hero-stat-col">
          <div className="stat-accent-bar"></div>
          <div>
            <strong>{heroMetrics.cities}</strong>
            <span>Cities covered</span>
          </div>
        </div>

        <div className="hero-stat-col">
          <div className="stat-accent-bar"></div>
          <div>
            <strong>{heroMetrics.partners}</strong>
            <span>Associate partners</span>
          </div>
        </div>

        <div className="hero-stat-col">
          <div className="stat-accent-bar"></div>
          <div>
            <strong>{heroMetrics.agreement}</strong>
            <span>Simple agreement</span>
          </div>
        </div>

        <div className="hero-stat-col">
          <div className="stat-accent-bar"></div>
          <div>
            <strong>{heroMetrics.coverage}</strong>
            <span>City coverage</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
