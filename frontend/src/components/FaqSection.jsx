import React, { useState, useEffect } from 'react';
import { fetchFAQs } from '../services/api';

const defaultFaqLeft = [
  {
    q: "What is COREAL?",
    a: "COREAL is a commercial real estate network that sources verified spaces, such as dark stores, warehouses, offices, retail, bank branches, cold storage and logistics parks, across India, mapped pin code by pin code, under one simple agreement."
  },
  {
    q: "How does the 48-hour process work?",
    a: "Share your requirements and target pin codes. COREAL's team searches its network and returns verified, inspected options within 48 hours, so you can shortlist and finalize without visiting sites blindly."
  },
  {
    q: "Which cities and pin codes does COREAL cover?",
    a: "Coreal serves 750+ cities from Tier 1 to Tier 4, mapped 11,000+ Pin Codes."
  }
];

const defaultFaqRight = [
  {
    q: "What does \"one agreement\" mean?",
    a: "It means a business can source multiple spaces, in different cities, through a single standard agreement with COREAL, instead of negotiating a separate contract with every individual property owner."
  },
  {
    q: "Can I lease or buy through COREAL?",
    a: "Coreal provides property options for leasing as well as for buying purposes."
  },
  {
    q: "How does verification work?",
    a: "COREAL verifies ownership documents, site details and compliance status before a space is listed, so businesses see only inspected, verified options rather than raw listings."
  }
];

const FaqItem = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-card-exact ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)}>
      <div className="faq-question-row">
        <span className="faq-question-text">{item.q}</span>
        <span className="faq-plus-icon">{open ? '−' : '+'}</span>
      </div>
      {open && (
        <div className="faq-answer-body">
          {item.a}
        </div>
      )}
    </div>
  );
};

const FaqSection = () => {
  const [leftItems, setLeftItems] = useState(defaultFaqLeft);
  const [rightItems, setRightItems] = useState(defaultFaqRight);

  useEffect(() => {
    fetchFAQs().then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const left = data
          .filter(f => f.column === 'left')
          .map(f => ({ q: f.question, a: f.answer }));
        const right = data
          .filter(f => f.column === 'right')
          .map(f => ({ q: f.question, a: f.answer }));

        if (left.length > 0) setLeftItems(left);
        if (right.length > 0) setRightItems(right);
      }
    }).catch(err => {
      console.warn("Using fallback FAQs", err);
    });
  }, []);

  return (
    <section className="faq-section-city" id="faq">
      <div className="container faq-container">
        <h2 className="faq-heading">Frequently Asked Questions</h2>
        <p className="faq-desc">
          Got questions? We’ve answered the most common ones to help you get started confidently.
        </p>

        <div className="faq-grid-exact">
          <div className="faq-col">
            {leftItems.map((item, idx) => (
              <FaqItem key={`l-${idx}`} item={item} />
            ))}
          </div>
          <div className="faq-col">
            {rightItems.map((item, idx) => (
              <FaqItem key={`r-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
