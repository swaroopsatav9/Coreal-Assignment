import React, { useState, useEffect } from 'react';
import { Zap, Warehouse, Building2, Landmark, Activity, ShoppingBag, Truck, Snowflake } from 'lucide-react';
import { fetchSolutions } from '../services/api';

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
  {
    title: "Dark Stores",
    desc: "Bulk dark-store deals across the pan-India network.",
    icon: Zap,
    slug: "dark-stores"
  },
  {
    title: "Warehouses",
    desc: "From last-mile units to large-format distribution centers.",
    icon: Warehouse,
    slug: "warehouses"
  },
  {
    title: "Commercial & Offices",
    desc: "Offices, Corporate campuses and service centers, Pin-code-wise.",
    icon: Building2,
    slug: "commercial-spaces"
  },
  {
    title: "Bank Branches & ATMs",
    desc: "Branch, ATM and vault networks — Footfall-mapped and compliant.",
    icon: Landmark,
    slug: "bank-branches"
  },
  {
    title: "Healthcare & Pharma",
    desc: "Hospitals, Clinics and pharma facilities sited and fitted for compliance from day one.",
    icon: Activity,
    slug: "healthcare-pharma"
  },
  {
    title: "Retail & High-Street",
    desc: "High-street, Mall and neighborhood storefronts that convert.",
    icon: ShoppingBag,
    slug: "retail-spaces"
  },
  {
    title: "Logistics Parks",
    desc: "Large-format parks and land on the corridors that matter.",
    icon: Truck,
    slug: "logistics-parks"
  },
  {
    title: "Cold Storage",
    desc: "Temperature-controlled storage that keeps the chain unbroken.",
    icon: Snowflake,
    slug: "cold-storage"
  }
];

const SolutionsGrid = ({ onSelectCategory }) => {
  const [items, setItems] = useState(defaultSolutions);

  useEffect(() => {
    fetchSolutions().then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const formatted = data.map(item => ({
          title: item.name || item.title,
          desc: item.description || item.desc,
          slug: item.slug,
          icon: iconMap[item.icon] || Building2
        }));
        setItems(formatted);
      }
    }).catch(err => console.warn("Using fallback solutions:", err));
  }, []);

  return (
    <section className="solutions-band" id="solutions">
      <div className="container solutions-container">
        <span className="solutions-eyebrow">SOLUTIONS</span>
        <h2 className="solutions-heading">Every Space You Need. One Network.</h2>
        <p className="solutions-desc">
          From Dark Stores and Warehouses to Offices, Retail Spaces and Specialized Facilities<br />
          — Find verified commercial spaces across India, All through one simple agreement.
        </p>

        <div className="solution-grid">
          {items.map((item, idx) => {
            const Icon = item.icon || Building2;
            return (
              <div 
                key={idx} 
                className="solution-card"
                onClick={() => onSelectCategory && onSelectCategory(item.slug)}
              >
                <div className="solution-icon-circle">
                  <Icon size={20} strokeWidth={2.2} />
                </div>
                <h3 className="solution-title">{item.title}</h3>
                <p className="solution-text">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionsGrid;
