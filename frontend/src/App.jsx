import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TickerBar from './components/TickerBar';
import HeroSection from './components/HeroSection';
import SolutionsGrid from './components/SolutionsGrid';
import PropertySearchSection from './components/PropertySearchSection';
import HowItWorksSection from './components/HowItWorksSection';
import CorealStandardSection from './components/CorealStandardSection';
import FilmShowcase from './components/FilmShowcase';
import NetworkMetricsBand from './components/NetworkMetricsBand';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import PartnerLoginModal from './components/PartnerLoginModal';
import ProcurePartnerModal from './components/ProcurePartnerModal';
import SuccessModal from './components/SuccessModal';
import ContactWidget from './components/ContactWidget';

function App() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [procureModalOpen, setProcureModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [procureMode, setProcureMode] = useState('procure');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchParam, setSearchParam] = useState('');

  const handleOpenProcure = (mode = 'procure', property = null) => {
    setProcureMode(mode);
    setSelectedProperty(property);
    setProcureModalOpen(true);
  };

  const handleSearch = (query) => {
    setSearchParam(query);
    const propElem = document.getElementById('properties');
    if (propElem) {
      propElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (categorySlug) => {
    setSearchParam(categorySlug);
    const propElem = document.getElementById('properties');
    if (propElem) {
      propElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="enterprise-site">
      <Navbar 
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenProcure={handleOpenProcure}
        onTriggerSearch={() => handleSearch('')}
      />

      <TickerBar onSelectCategory={handleCategorySelect} />

      <main>
        <HeroSection 
          onSearch={handleSearch}
          onOpenProcure={handleOpenProcure}
        />

        <FilmShowcase />

        <NetworkMetricsBand />

        <SolutionsGrid onSelectCategory={handleCategorySelect} />

        <PropertySearchSection 
          searchParam={searchParam} 
          onOpenProcure={handleOpenProcure} 
        />

        <HowItWorksSection />

        <CorealStandardSection />

        <FaqSection />
      </main>

      <Footer onOpenProcure={handleOpenProcure} />

      {/* Modals */}
      <PartnerLoginModal 
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

      <ProcurePartnerModal 
        isOpen={procureModalOpen}
        onClose={() => setProcureModalOpen(false)}
        mode={procureMode}
        selectedProperty={selectedProperty}
        onSuccess={() => setSuccessModalOpen(true)}
      />

      <SuccessModal 
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
      />

      <ContactWidget />
    </div>
  );
}

export default App;
