import React, { useState, useEffect } from 'react';
import { fetchProperties } from '../services/api';
import { MapPin, ShieldCheck, CheckCircle2, ArrowRight, Search, Building } from 'lucide-react';

const PropertySearchSection = ({ searchParam, onOpenProcure }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParam || '');
  const [cityFilter, setCityFilter] = useState('');
  const [spaceTypeFilter, setSpaceTypeFilter] = useState('');
  const [listingTypeFilter, setListingTypeFilter] = useState('');

  useEffect(() => {
    if (searchParam !== undefined) {
      setQuery(searchParam);
    }
  }, [searchParam]);

  const loadProperties = async () => {
    setLoading(true);
    const params = {};
    if (query) params.q = query;
    if (cityFilter) params.city = cityFilter;
    if (spaceTypeFilter) params.space_type = spaceTypeFilter;
    if (listingTypeFilter) params.listing_type = listingTypeFilter;

    try {
      const data = await fetchProperties(params);
      setProperties(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn("Failed to load properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, [query, cityFilter, spaceTypeFilter, listingTypeFilter]);

  return (
    <section className="directory-section" id="properties">
      <div className="container">
        {/* Header Block matching COREAL exact standard */}
        <div className="directory-header">
          <div className="directory-eyebrow">
            <span className="directory-eyebrow-dot"></span>
            <span>VERIFIED COMMERCIAL DIRECTORY</span>
          </div>
          <h2 className="directory-title">Verified Spaces In Every PIN Code</h2>
          <p className="directory-desc">
            Explore 100% pre-inspected, legally clear commercial properties available across India under COREAL's Master Lease Framework.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="directory-filter-card">
          <div className="directory-filter-grid">
            {/* Search PIN Code / Locality */}
            <div className="filter-field">
              <label className="filter-field-label">Search PIN Code / Locality</label>
              <div className="filter-input-wrap">
                <Search size={16} className="filter-input-ico" />
                <input 
                  type="text" 
                  className="filter-input" 
                  placeholder="Search by Pin Code (e.g. 400069, 560066, Andheri)..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            {/* City */}
            <div className="filter-field">
              <label className="filter-field-label">City</label>
              <select 
                className="filter-select" 
                value={cityFilter} 
                onChange={(e) => setCityFilter(e.target.value)}
              >
                <option value="">All Cities</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Gurugram">Gurugram</option>
                <option value="Pune">Pune</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Bhiwandi">Bhiwandi (Mumbai MMR)</option>
              </select>
            </div>

            {/* Space Category */}
            <div className="filter-field">
              <label className="filter-field-label">Space Category</label>
              <select 
                className="filter-select" 
                value={spaceTypeFilter} 
                onChange={(e) => setSpaceTypeFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Dark Store">Dark Store</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Commercial Office">Commercial Office</option>
                <option value="Bank Branch">Bank Branch</option>
                <option value="Healthcare Facility">Healthcare Facility</option>
                <option value="Retail Space">Retail Space</option>
                <option value="Cold Storage">Cold Storage</option>
              </select>
            </div>

            {/* Transaction Type */}
            <div className="filter-field">
              <label className="filter-field-label">Transaction Type</label>
              <select 
                className="filter-select" 
                value={listingTypeFilter} 
                onChange={(e) => setListingTypeFilter(e.target.value)}
              >
                <option value="">Lease &amp; Sale</option>
                <option value="Lease">Lease Only</option>
                <option value="Sale">Buy Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Property Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
            Loading verified spaces across India...
          </div>
        ) : properties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 20px', background: '#ffffff', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
            <Building size={48} color="#f97316" style={{ margin: '0 auto 16px auto', display: 'block' }} />
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 700 }}>No spaces found matching your search</h3>
            <p style={{ color: '#64748b', marginTop: '8px', marginBottom: '24px', maxWidth: '520px', margin: '8px auto 24px auto' }}>
              Our network spans 11,000+ PIN Codes nationwide! Share your target locality and our institutional team will shortlist options within 48 hours.
            </p>
            <button 
              type="button"
              className="property-inquire-btn" 
              onClick={() => onOpenProcure('procure')}
              style={{ margin: '0 auto' }}
            >
              Submit Custom Requirement <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <div className="directory-properties-grid">
            {properties.map((prop) => (
              <div key={prop.id} className="property-card-exact">
                {/* Media Image with Top Badges */}
                <div className="property-media-exact">
                  <img 
                    src={prop.image_url || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"} 
                    alt={prop.title} 
                    className="property-media-img"
                  />
                  <div className="property-media-overlay" />

                  {/* COREAL Verified 100% Badge */}
                  <div className="property-badge-verified">
                    <ShieldCheck size={13} />
                    <span>{prop.verification_badge || "COREAL Verified 100%"}</span>
                  </div>

                  {/* PIN Code Badge */}
                  <div className="property-badge-pin">
                    PIN: {prop.pincode}
                  </div>

                  {/* Space Type Badge */}
                  {prop.space_type && (
                    <div className="property-badge-type">
                      {prop.space_type}
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="property-body-exact">
                  <h3 className="property-title-exact" title={prop.title}>
                    {prop.title}
                  </h3>

                  {/* Locality & City */}
                  <div className="property-locality-row">
                    <MapPin size={15} color="#f97316" style={{ flexShrink: 0 }} />
                    <span className="property-locality-text">
                      {prop.locality}, {prop.city}
                    </span>
                  </div>

                  {/* Specs Table */}
                  <div className="property-specs-table">
                    <div className="property-spec-col">
                      <span className="property-spec-lbl">Available Area</span>
                      <strong className="property-spec-num">
                        {Number(prop.area_sqft).toLocaleString()} sq.ft.
                      </strong>
                    </div>

                    <div className="property-spec-col">
                      <span className="property-spec-lbl">Rate / Sq.Ft.</span>
                      <strong className="property-spec-num">
                        ₹{Number(prop.price_per_sqft).toFixed(2)} / mo
                      </strong>
                    </div>
                  </div>

                  {/* Feature Tags */}
                  {prop.features && Array.isArray(prop.features) && prop.features.length > 0 && (
                    <div className="property-tags-wrap">
                      {prop.features.slice(0, 4).map((ft, fidx) => (
                        <span key={fidx} className="property-tag-item">
                          <CheckCircle2 size={11} color="#2563eb" />
                          <span>{ft}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer Row: Monthly Rent & Inquire Button */}
                  <div className="property-footer-row">
                    <div className="property-rent-box">
                      <span className="property-rent-title">Monthly Rent</span>
                      <strong className="property-rent-figure">
                        ₹{Number(prop.monthly_rent).toLocaleString()}
                      </strong>
                    </div>

                    <button 
                      type="button"
                      className="property-inquire-btn"
                      onClick={() => onOpenProcure('procure', prop)}
                      aria-label={`Inquire about ${prop.title}`}
                    >
                      <span>Inquire</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertySearchSection;
