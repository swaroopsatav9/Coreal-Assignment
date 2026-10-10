import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, ArrowLeft, CheckCircle, ExternalLink } from 'lucide-react';
import { loginPartner } from '../services/api';

const PartnerLoginModal = ({ isOpen, onClose }) => {
  const [activeView, setActiveView] = useState('select'); // 'select' | 'form'
  const [portalType, setPortalType] = useState('partner'); // 'partner' | 'customer'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info'); // 'info' | 'success' | 'error'
  const [loggedInUser, setLoggedInUser] = useState(null);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOpenForm = (type) => {
    setPortalType(type);
    setActiveView('form');
    setMessage('');
    setLoggedInUser(null);
  };

  const handleBackToSelect = () => {
    setActiveView('select');
    setMessage('');
    setLoggedInUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const res = await loginPartner(username, password);
      setSubmitting(false);
      setMessageType('success');
      setLoggedInUser(res.user);
      setMessage(`Welcome back, ${res.user.first_name || res.user.username}! Authenticated successfully.`);
    } catch (err) {
      setSubmitting(false);
      setMessageType('error');
      if (err.non_field_errors && err.non_field_errors.length > 0) {
        setMessage(err.non_field_errors[0]);
      } else if (err.errors) {
        const firstKey = Object.keys(err.errors)[0];
        setMessage(Array.isArray(err.errors[firstKey]) ? err.errors[firstKey][0] : String(err.errors[firstKey]));
      } else if (err.message) {
        setMessage(err.message);
      } else {
        setMessage("Invalid credentials. Please verify your username and password.");
      }
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="loginModalTitle">
      <div className="modal login-modal" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="login-modal-close" 
          onClick={onClose} 
          aria-label="Close"
        >
          &times;
        </button>

        {activeView === 'select' ? (
          <>
            <h3 id="loginModalTitle" className="login-modal-title">Sign in to COREAL</h3>
            <p className="login-modal-sub">Choose your account to continue</p>

            <div className="login-cards">
              {/* Option 1: Associate Partner Login */}
              <a 
                className="login-card" 
                href="https://crm.coreal.in:8443/partner/Login"
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => {
                  // If user holds Ctrl/Cmd or wants external, let default handle; otherwise support in-app too
                }}
              >
                <span className="login-card-ico" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                  </svg>
                </span>
                <span className="login-card-body">
                  <span className="login-card-title">Associate Partner Login</span>
                  <span className="login-card-desc">For channel partners, landlords &amp; associate brokers</span>
                </span>
                <span className="login-card-arrow" aria-hidden="true">→</span>
              </a>

              {/* Option 2: Associate Customer Login */}
              <a 
                className="login-card" 
                href="https://crm.coreal.in:8443/CustomerPortal/Login"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <span className="login-card-ico" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="3" width="16" height="18" rx="1.5" />
                    <path d="M9 8h6M9 12h6M9 16h3" />
                  </svg>
                </span>
                <span className="login-card-body">
                  <span className="login-card-title">Associate Customer Login</span>
                  <span className="login-card-desc">For enterprise brands, occupiers &amp; procurement teams</span>
                </span>
                <span className="login-card-arrow" aria-hidden="true">→</span>
              </a>
            </div>

            {/* Quick in-modal login toggle */}
            <div style={{ marginTop: '22px', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
              <button 
                type="button" 
                onClick={() => handleOpenForm('partner')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2563eb',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Login directly with credentials →
              </button>
            </div>
          </>
        ) : (
          /* Exact Partner Portal form from crm.coreal.in:8443/partner/Login */
          <div className="portal-form-wrap">
            <button type="button" className="portal-back-btn" onClick={handleBackToSelect}>
              <ArrowLeft size={16} /> Back to options
            </button>

            <div style={{ textAlign: 'center', marginTop: '12px', marginBottom: '8px' }}>
              <img 
                src="/assets/coreal_logo.png" 
                alt="COREAL" 
                className="portal-brand-logo" 
              />
              <p className="portal-power-text">
                Powered by IH&amp;MS Infra India Pvt. Ltd.
              </p>
              <h4 className="portal-form-title">
                {portalType === 'partner' ? 'Partner Portal — Login' : 'Customer Portal — Login'}
              </h4>
            </div>

            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="portal-form-group">
                <label className="portal-form-label">Username</label>
                <div className="portal-input-wrap">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="portal-input"
                    placeholder="Enter your username"
                    autoComplete="username"
                    required
                  />
                  <span className="portal-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="portal-form-group">
                <label className="portal-form-label">Password</label>
                <div className="portal-input-wrap">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="portal-input"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="portal-input-icon"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {message && (
                <div 
                  style={{ 
                    padding: '10px 14px', 
                    borderRadius: '8px', 
                    fontSize: '0.86rem', 
                    marginBottom: '14px', 
                    textAlign: 'center',
                    background: messageType === 'error' ? '#fef2f2' : messageType === 'success' ? '#f0fdf4' : '#eff6ff',
                    border: `1px solid ${messageType === 'error' ? '#fca5a5' : messageType === 'success' ? '#86efac' : '#bfdbfe'}`,
                    color: messageType === 'error' ? '#b91c1c' : messageType === 'success' ? '#15803d' : '#1d4ed8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {messageType === 'success' && <CheckCircle size={16} />}
                  <span>{message}</span>
                </div>
              )}

              {loggedInUser ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                  <a
                    href="http://127.0.0.1:8000/admin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portal-submit-btn"
                    style={{ background: '#059669', color: '#ffffff', textDecoration: 'none', justifyContent: 'center' }}
                  >
                    <ExternalLink size={16} /> Open Django Admin Portal
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="portal-submit-btn"
                    style={{ background: '#0f172a', color: '#ffffff' }}
                  >
                    Done (Stay on Site)
                  </button>
                </div>
              ) : (
                <button 
                  type="submit" 
                  className="portal-submit-btn" 
                  disabled={submitting}
                >
                  <LogIn size={18} />
                  <span>{submitting ? 'Authenticating…' : 'Login'}</span>
                </button>
              )}
            </form>

            <div className="portal-help-box">
              <p>Username &amp; password are sent to your registered email after KYC approval</p>
              <p style={{ marginTop: '6px' }}>
                Need help?{' '}
                <a 
                  href="mailto:business@coreal.in" 
                  style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}
                >
                  business@coreal.in
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerLoginModal;
