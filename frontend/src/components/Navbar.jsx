import React, { useState, useEffect } from 'react';
import { ChevronDown, User, Menu, X, ArrowRight, Zap, Warehouse, Building2, Landmark, Activity, ShoppingBag, Truck, Snowflake } from 'lucide-react';
import { fetchSolutions, fetchIndustries } from '../services/api';

const iconMap = {
  Zap,
  Warehouse,
  Building2,
  Landmark,
  Activity,
  ShoppingBag,
  Truck,
  Snowflake,
};

const defaultSolutions = [
  { title: "Dark Stores", desc: "Bulk dark-store deals across pan-India network.", icon: Zap },
  { title: "Warehouses", desc: "From last-mile units to large distribution centers.", icon: Warehouse },
  { title: "Commercial & Offices", desc: "Corporate offices & service centers pin-code wise.", icon: Building2 },
  { title: "Bank Branches & ATMs", desc: "Footfall-mapped & compliant branch network.", icon: Landmark },
  { title: "Healthcare & Pharma", desc: "Hospitals & pharma facilities fitted for compliance.", icon: Activity },
  { title: "Retail & High-Street", desc: "High-street & mall storefronts that convert.", icon: ShoppingBag },
  { title: "Logistics Parks", desc: "Large format parks on prime corridors.", icon: Truck },
  { title: "Cold Storage", desc: "Temperature-controlled unbroken supply chain.", icon: Snowflake },
];

const defaultIndustries = [
  { title: "Quick Commerce", desc: "Dark stores at delivery-grade density nationwide." },
  { title: "E-Commerce", desc: "Fulfillment & last-mile footprints that scale." },
  { title: "Commercial & Offices", desc: "Grade-A corporate offices & IT parks nationwide." },
  { title: "Banks & NBFCs", desc: "Branches, ATMs, vaults footfall-mapped." },
  { title: "BFSI Sector", desc: "Regional hubs & service centers across every zone." },
  { title: "Healthcare & Pharma", desc: "Compliant pharma distribution & diagnostic centers." },
  { title: "Logistics & Warehousing", desc: "Warehouses & cross-docks on key freight corridors." },
  { title: "Food & Beverages", desc: "Cold chains, central kitchens & distribution." },
  { title: "Grocery & Retail", desc: "High-street & feeder space for organized retail." },
];

const Navbar = ({ onOpenLogin, onOpenProcure, onTriggerSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [solutions, setSolutions] = useState(defaultSolutions);
  const [industries, setIndustries] = useState(defaultIndustries);

  useEffect(() => {
    fetchSolutions().then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setSolutions(data.map(item => ({
          title: item.name || item.title,
          desc: item.description || item.desc,
          icon: iconMap[item.icon] || Building2
        })));
      }
    }).catch(err => console.warn("Using default navbar solutions", err));

    fetchIndustries().then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setIndustries(data.map(item => ({
          title: item.name || item.title,
          desc: item.description || item.desc
        })));
      }
    }).catch(err => console.warn("Using default navbar industries", err));
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown(prev => (prev === name ? null : name));
  };

  return (
    <nav className="nav top-nav-white">
      <div className="nav-inner-fitted">
        {/* Exact Logo: Black COREAL with THE PERFECT SPACE */}
        <a href="/" className="brand-logo-clean">
          <span className="brand-logo-title">COREAL</span>
          <span className="brand-logo-subtitle">THE PERFECT SPACE</span>
        </a>

        {/* Nav Links */}
        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <a href="#" className="nav-link nav-link-active" onClick={() => setMobileMenuOpen(false)}>
            Home
          </a>

          {/* Solutions Mega Menu */}
          <div className="dropdown-wrapper">
            <button 
              type="button" 
              className="nav-link"
              onClick={() => toggleDropdown('solutions')}
            >
              Solutions <ChevronDown size={14} style={{ transform: activeDropdown === 'solutions' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            <div className={`dropdown-menu mega-menu ${activeDropdown === 'solutions' ? 'show-mobile' : ''}`}>
              <div className="mega-grid">
                {solutions.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a 
                      key={idx} 
                      href="#solutions" 
                      className="mega-item"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="mega-ico">
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="mega-name">{item.title}</div>
                        <div className="mega-desc">{item.desc}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Industries Dropdown */}
          <div className="dropdown-wrapper">
            <button 
              type="button" 
              className="nav-link"
              onClick={() => toggleDropdown('industries')}
            >
              Industries <ChevronDown size={14} style={{ transform: activeDropdown === 'industries' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            <div className={`dropdown-menu industries-dropdown ${activeDropdown === 'industries' ? 'show-mobile' : ''}`}>
              {industries.map((ind, idx) => (
                <a 
                  key={idx} 
                  href="#solutions" 
                  className="industry-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="industry-name">{ind.title}</div>
                  <div className="industry-desc">{ind.desc}</div>
                </a>
              ))}
            </div>
          </div>

          <a href="#how-it-works" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            How It Works
          </a>
          <a href="#contact" className="nav-link" onClick={() => { setMobileMenuOpen(false); onOpenProcure('procure'); }}>
            Contact
          </a>
          <a href="#standard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            About
          </a>

          {/* Mobile Actions */}
          <div style={{ display: mobileMenuOpen ? 'flex' : 'none', flexDirection: 'column', width: '100%', gap: '12px', marginTop: '16px' }}>
            <button className="nav-partner-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { setMobileMenuOpen(false); onOpenLogin(); }}>
              <User size={16} />
              <span>Partner Login</span>
            </button>
            <button className="nav-signup-pill" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { setMobileMenuOpen(false); onOpenProcure('procure'); }}>
              Sign Up →
            </button>
          </div>
        </div>

        {/* Right Tools: Partner Login & Sign Up */}
        <div className="nav-actions">
          <button className="nav-partner-btn desktop-only-btn" onClick={onOpenLogin}>
            <User size={16} />
            <span>Partner Login</span>
          </button>

          <button className="nav-signup-pill desktop-only-btn" onClick={() => onOpenProcure('procure')}>
            Sign Up →
          </button>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={22} color="#0f172a" /> : <Menu size={22} color="#0f172a" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
