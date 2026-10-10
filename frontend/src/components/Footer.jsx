import React from 'react';

const Footer = ({ onOpenProcure }) => {
  return (
    <footer className="footer-exact" id="contact">
      <div className="container footer-container-exact">
        <div className="footer-columns-grid">
          {/* Column 1: Brand & Details */}
          <div className="footer-brand-col">
            <a href="/" className="footer-brand-link">
              <span className="footer-brand-title">COREAL</span>
              <span className="footer-brand-sub">THE PERFECT SPACE</span>
            </a>

            <div className="footer-network-info">
              <h4 className="footer-network-heading">
                India's PIN-Code Based Commercial Real Estate Network
              </h4>
              <p className="footer-network-desc">
                Dark Stores, Warehouses, Fulfillment Centers, Commercial Spaces, etc.
              </p>
            </div>

            <p className="footer-flagship-text">
              A flagship platform of <strong>IH&amp;MS Infra India Pvt. Ltd.</strong>
            </p>

            {/* Social Icons Strip */}
            <div className="footer-social-strip">
              {/* Instagram */}
              <a href="https://www.instagram.com/coreal.in/" target="_blank" rel="noopener noreferrer" className="social-badge social-ig" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* Facebook */}
              <a href="https://www.facebook.com/profile.php?id=61594029523074" target="_blank" rel="noopener noreferrer" className="social-badge social-fb" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>

              {/* YouTube */}
              <a href="http://youtube.com/@Coreal.spaces" target="_blank" rel="noopener noreferrer" className="social-badge social-yt" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path fill="#ffffff" d="M10 15l5-3-5-3v6z"></path>
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/coreal-india" target="_blank" rel="noopener noreferrer" className="social-badge social-li" aria-label="LinkedIn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#fff">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z"></path>
                </svg>
              </a>

              {/* Call */}
              <a href="tel:+918600018432" className="social-badge social-call" aria-label="Call">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path>
                </svg>
              </a>

              {/* WhatsApp */}
              <a href="https://wa.me/918600018432" target="_blank" rel="noopener noreferrer" className="social-badge social-wa" aria-label="WhatsApp">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="#fff">
                  <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35zM12.05 21.78h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zm8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41z"></path>
                </svg>
              </a>

              {/* Play Store */}
              <span className="social-badge social-play" aria-label="Google Play">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                  <path fill="#00d7fe" d="M4.4 2.6 13.6 12l-9.2 9.4c-.26-.23-.4-.6-.4-1V3.6c0-.4.14-.77.4-1z"></path>
                  <path fill="#00f076" d="M16.7 8.9 6.1 2.5c-.66-.4-1.3-.3-1.7.1l9.2 9.4z"></path>
                  <path fill="#ff3a44" d="M16.7 15.1 13.6 12l-9.2 9.4c.4.4 1.04.5 1.7.1z"></path>
                  <path fill="#ffce00" d="m16.7 15.1-3.1-3.1 3.1-3.1 3.55 2.02c1 .57 1 1.5 0 2.06z"></path>
                </svg>
              </span>

              {/* App Store */}
              <span className="social-badge social-apple" aria-label="Apple Store">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="#000">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.72-.94 2.74.99.08 2.02-.49 2.64-1.24"></path>
                </svg>
              </span>

              {/* Mail */}
              <a 
                href="#contact" 
                className="social-badge social-mail" 
                aria-label="Contact"
                onClick={(e) => { e.preventDefault(); onOpenProcure && onOpenProcure('procure'); }}
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                  <path d="m3.5 6.5 8.5 6 8.5-6"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">SOLUTIONS</h4>
            <a href="#solutions" className="footer-nav-link">Dark Stores</a>
            <a href="#solutions" className="footer-nav-link">Warehouses</a>
            <a href="#solutions" className="footer-nav-link">Commercial &amp; Offices</a>
            <a href="#solutions" className="footer-nav-link">Bank Branches &amp; ATMs</a>
            <a href="#solutions" className="footer-nav-link">Healthcare &amp; Pharma</a>
            <a href="#solutions" className="footer-nav-link">Retail &amp; High-Street</a>
            <a href="#solutions" className="footer-nav-link">Logistics Parks</a>
            <a href="#solutions" className="footer-nav-link">Cold Storage</a>
            <a href="#solutions" className="footer-nav-link footer-nav-arrow">All Solutions →</a>
          </div>

          {/* Column 3: Industries */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">INDUSTRIES</h4>
            <a href="#solutions" className="footer-nav-link">Quick Commerce</a>
            <a href="#solutions" className="footer-nav-link">E-Commerce</a>
            <a href="#solutions" className="footer-nav-link">Commercial &amp; Offices</a>
            <a href="#solutions" className="footer-nav-link">Banks &amp; NBFCs</a>
            <a href="#solutions" className="footer-nav-link">BFSI Sector</a>
            <a href="#solutions" className="footer-nav-link">Healthcare &amp; Pharma</a>
            <a href="#solutions" className="footer-nav-link">Logistics &amp; Warehousing</a>
            <a href="#solutions" className="footer-nav-link">Food &amp; Beverages</a>
            <a href="#solutions" className="footer-nav-link">Grocery &amp; Retail</a>
            <a href="#solutions" className="footer-nav-link footer-nav-arrow">All Industries →</a>
          </div>

          {/* Column 4: Company */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">COMPANY</h4>
            <a href="#" className="footer-nav-link" onClick={(e) => { e.preventDefault(); onOpenProcure && onOpenProcure('procure'); }}>Privacy Policy</a>
            <a href="#" className="footer-nav-link" onClick={(e) => { e.preventDefault(); onOpenProcure && onOpenProcure('procure'); }}>Procure Space</a>
            <a href="#" className="footer-nav-link" onClick={(e) => { e.preventDefault(); onOpenProcure && onOpenProcure('provide'); }}>Become a Partner</a>
            <a href="https://www.ihmsinfra.com" target="_blank" rel="noopener noreferrer" className="footer-nav-link">IH&amp;MS Infra India ↗</a>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="footer-disclaimer-box">
          <p className="footer-disclaimer-text">
            COREAL™ is an exclusive proprietary B2B asset network and trademark application owned and operated by IH&amp;MS Infra India Pvt. Ltd. All real estate agent, advisory and development services are executed in compliance with applicable statutory and regulatory requirements. All enterprise leasing and transaction agreements are executed directly through the parent entity under pre-agreed terms and conditions.
          </p>
        </div>

        {/* Copyright */}
        <div className="footer-bottom-row">
          <span className="footer-copy-text">
            © 2026 COREAL™ · IH&amp;MS Infra India Pvt. Ltd. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
