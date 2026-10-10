import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-card" 
        style={{ 
          textAlign: 'center', 
          maxWidth: '440px',
          background: '#ffffff',
          borderRadius: '18px',
          padding: '36px 28px',
          boxShadow: '0 20px 45px rgba(15, 23, 42, 0.18)',
          position: 'relative'
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="login-modal-close" 
          onClick={onClose} 
          aria-label="Close"
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#64748b' }}
        >
          <X size={20} />
        </button>

        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: '#ecfdf5',
          border: '2px solid #a7f3d0',
          color: '#059669',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
          <CheckCircle2 size={40} />
        </div>

        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          Mandate Submitted!
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.94rem', marginBottom: '24px', lineHeight: 1.55 }}>
          Thank you for sharing your requirement. Our institutional enterprise desk will match verified options and respond in <strong>48 hours</strong>.
        </p>

        <button 
          className="portal-submit-btn" 
          style={{ width: '100%', background: '#2563eb', color: '#ffffff', borderRadius: '9999px', padding: '12px 24px', fontWeight: 700 }} 
          onClick={onClose}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
