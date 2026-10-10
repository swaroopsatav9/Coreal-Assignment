import React, { useState, useEffect } from 'react';
import { submitInquiry } from '../services/api';
import { Building2, Users, Send, CheckCircle2, ShieldCheck, X } from 'lucide-react';

const ProcurePartnerModal = ({ isOpen, onClose, mode = 'procure', selectedProperty = null, onSuccess }) => {
  const [activeTab, setActiveTab] = useState(mode); // 'procure' | 'provide'
  const [submitting, setSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    company_name: '',
    phone: '',
    additional_phone: '',
    email: '',
    service: 'quick_commerce',
    company_type: 'Pvt. Ltd.',
    business_type: 'Broker',
    pincode: selectedProperty ? selectedProperty.pincode : '',
    city: selectedProperty ? selectedProperty.city : '',
    state: selectedProperty ? selectedProperty.state : '',
    district: '',
    total_area_min: selectedProperty ? selectedProperty.area_sqft : '',
    total_area_max: '',
    tenure: '3 to 5 Years',
    structure_type: 'Commercial',
    rate_min: '',
    rate_max: '',
    dg_backup: 'Yes',
    operation_247: 'Yes',
    remarks: ''
  });

  useEffect(() => {
    setActiveTab(mode);
  }, [mode]);

  useEffect(() => {
    if (selectedProperty) {
      setFormData(prev => ({
        ...prev,
        pincode: selectedProperty.pincode,
        city: selectedProperty.city,
        state: selectedProperty.state || '',
        total_area_min: selectedProperty.area_sqft,
        remarks: `Inquiry regarding verified property: ${selectedProperty.title} [PIN: ${selectedProperty.pincode}]`
      }));
    }
  }, [selectedProperty]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    const payload = {
      full_name: formData.name,
      company_name: formData.company_name,
      phone: formData.phone,
      email: formData.email,
      target_pincode: formData.pincode,
      city: formData.city,
      solution_type: formData.service,
      space_size_sqft: formData.total_area_min ? `${formData.total_area_min} sq ft` : '',
      message: `${formData.remarks ? formData.remarks + ' | ' : ''}Tenure: ${formData.tenure}, Type: ${formData.structure_type}, Company Type: ${formData.company_type}`,
      inquiry_type: activeTab
    };

    try {
      await submitInquiry(payload);
      setSubmitting(false);
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      setSubmitting(false);
      if (err && err.errors) {
        const firstKey = Object.keys(err.errors)[0];
        const msg = Array.isArray(err.errors[firstKey]) ? err.errors[firstKey][0] : err.errors[firstKey];
        setErrorMsg(`${firstKey.replace('_', ' ')}: ${msg}`);
      } else if (err && err.message) {
        setErrorMsg(err.message);
      } else {
        onClose();
        if (onSuccess) onSuccess();
      }
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="signup-modal-shell" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          type="button" 
          className="signup-modal-close" 
          onClick={onClose} 
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header Eyebrow & Title */}
        <div className="signup-header">
          <span className="signup-badge">
            <span className="signup-dot"></span> ENTERPRISE DESK · One business day. One clear response.
          </span>
          <h2 className="signup-title">
            Let&rsquo;s Make Your <strong>Next Move Happen.</strong>
          </h2>
          <p className="signup-sub">
            {activeTab === 'procure'
              ? 'Tell us your space requirement — our institutional desk matches it against verified options in 48 hours.'
              : 'Join as an associate partner or landlord to list verified properties for top national brands.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="signup-tabs" role="tablist">
            <button
              type="button"
              className={`signup-tab-btn ${activeTab === 'procure' ? 'active' : ''}`}
              onClick={() => setActiveTab('procure')}
              role="tab"
              aria-selected={activeTab === 'procure'}
            >
              <Building2 size={16} />
              <span>Procure Space</span>
            </button>
            <button
              type="button"
              className={`signup-tab-btn ${activeTab === 'provide' ? 'active' : ''}`}
              onClick={() => setActiveTab('provide')}
              role="tab"
              aria-selected={activeTab === 'provide'}
            >
              <Users size={16} />
              <span>Become Partner</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="signup-form-body">
          {/* Row 1: Contact Name & Company */}
          <div className="signup-form-row">
            <div className="signup-field">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                required
                autoComplete="name"
              />
            </div>
            <div className="signup-field">
              <label>Company Name *</label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="e.g. Blinkit, Zomato, HDFC Bank"
                required
                autoComplete="organization"
              />
            </div>
          </div>

          {/* Row 2: Phone Numbers */}
          <div className="signup-form-row">
            <div className="signup-field">
              <label>Contact Number (10 digits) *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                pattern="[6-9]\d{9}"
                maxLength="10"
                required
                autoComplete="tel"
              />
            </div>
            <div className="signup-field">
              <label>Additional Contact Number</label>
              <input
                type="tel"
                name="additional_phone"
                value={formData.additional_phone}
                onChange={handleChange}
                placeholder="Optional secondary phone"
                maxLength="10"
              />
            </div>
          </div>

          {/* Row 3: Email & Requirement Category */}
          <div className="signup-form-row">
            <div className="signup-field">
              <label>Official Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="signup-field">
              <label>Category / Mandate *</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="quick_commerce">Dark Stores (Quick Commerce)</option>
                <option value="ecommerce">Warehouses (E-Commerce & Logistics)</option>
                <option value="commercial">Commercial &amp; Offices</option>
                <option value="banks_nbfcs">Bank Branches &amp; ATMs</option>
                <option value="healthcare_pharma">Healthcare &amp; Pharma</option>
                <option value="retail_high_street">Retail &amp; High-Street</option>
                <option value="cold_storage">Cold Storage &amp; Supply Chain</option>
                <option value="logistics">Logistics Parks</option>
              </select>
            </div>
          </div>

          {/* Partner Specific Fields: Company & Business Type */}
          {activeTab === 'provide' && (
            <div className="signup-form-row">
              <div className="signup-field">
                <label>Type of Company *</label>
                <select
                  name="company_type"
                  value={formData.company_type}
                  onChange={handleChange}
                  required
                >
                  <option value="Pvt. Ltd.">Pvt. Ltd.</option>
                  <option value="LLP">LLP</option>
                  <option value="Proprietorship">Proprietorship</option>
                  <option value="Individual">Individual Landlord</option>
                </select>
              </div>
              <div className="signup-field">
                <label>Type of Business *</label>
                <select
                  name="business_type"
                  value={formData.business_type}
                  onChange={handleChange}
                  required
                >
                  <option value="Broker">Commercial Broker</option>
                  <option value="Real Estate">Real Estate Developer</option>
                  <option value="Investor">Asset Investor / Landlord</option>
                </select>
              </div>
            </div>
          )}

          {/* Location Details: PIN Code & City */}
          <div className="signup-form-row">
            <div className="signup-field">
              <label>Target PIN Code (6 digits) *</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="e.g. 400069 or 110001"
                maxLength="6"
                pattern="\d{6}"
                required
              />
            </div>
            <div className="signup-field">
              <label>City / Location *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Mumbai, Bengaluru, Delhi"
                required
              />
            </div>
          </div>

          {/* Space Specifications: Area & Tenure */}
          <div className="signup-form-row">
            <div className="signup-field">
              <label>Required Area (Sq ft) *</label>
              <input
                type="number"
                name="total_area_min"
                value={formData.total_area_min}
                onChange={handleChange}
                placeholder="e.g. 2500"
                required
              />
            </div>
            <div className="signup-field">
              <label>Tenure Commitment *</label>
              <select
                name="tenure"
                value={formData.tenure}
                onChange={handleChange}
                required
              >
                <option value="1 to 3 Years">1 to 3 Years</option>
                <option value="3 to 5 Years">3 to 5 Years</option>
                <option value="5 to 9 Years">5 to 9 Years</option>
                <option value="9+ Years">9+ Years</option>
              </select>
            </div>
          </div>

          {/* Remarks */}
          <div className="signup-field" style={{ width: '100%' }}>
            <label>Specific Requirements &amp; Notes</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Power load (kW), ceiling height, dock requirements, power backup, or operational specifications..."
              rows="2"
            ></textarea>
          </div>

          {/* Terms Agreement */}
          <label className="signup-terms">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />
            <span>
              I agree with COREAL&rsquo;s <strong>Terms &amp; Conditions</strong> and institutional privacy policy.
            </span>
          </label>

          {/* Error Message from Backend Validation */}
          {errorMsg && (
            <div 
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: '#fef2f2',
                border: '1px solid #fca5a5',
                color: '#b91c1c',
                fontSize: '0.86rem',
                fontWeight: 500,
                textAlign: 'center'
              }}
            >
              {errorMsg}
            </div>
          )}

          {/* Guarantee Note & Submit Button */}
          <div className="signup-submit-wrap">
            <div className="signup-guarantee-note">
              <ShieldCheck size={18} color="#2563eb" />
              <span>48-Hour Shortlist Guarantee on Verified Properties</span>
            </div>

            <button
              type="submit"
              className="signup-submit-btn"
              disabled={submitting || !termsAccepted}
            >
              <span>{submitting ? 'Submitting…' : activeTab === 'procure' ? 'Submit Mandate →' : 'Register as Partner →'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProcurePartnerModal;
