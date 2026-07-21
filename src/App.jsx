import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import VehicleDetailPage from './components/VehicleDetailPage';
import Hero from './sections/Hero';
import FeaturedVehicles from './sections/FeaturedVehicles';
import VehicleCategories from './sections/VehicleCategories';
import Services from './sections/Services';
import WhyChooseUs from './sections/WhyChooseUs';
import Testimonials from './sections/Testimonials';
import Gallery from './sections/Gallery';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CreditsPage from './pages/CreditsPage';

function App() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [activePage, setActivePage] = useState(null); // 'privacy' | 'terms' | 'credits'

  // Allow child components to open vehicle detail via custom event
  useEffect(() => {
    const handler = (e) => setSelectedVehicle(e.detail);
    window.addEventListener('open-vehicle', handler);
    return () => window.removeEventListener('open-vehicle', handler);
  }, []);

  // Lock body scroll when detail is open
  useEffect(() => {
    document.body.style.overflow = selectedVehicle ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedVehicle]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero onBookNow={() => document.getElementById('vehicles')?.scrollIntoView({ behavior: 'smooth' })} />
        <WhyChooseUs />
        <FeaturedVehicles onSelectVehicle={setSelectedVehicle} />
        <VehicleCategories onSelectVehicle={setSelectedVehicle} />
        <Services />
        <Testimonials />
        <Contact />
        <Gallery />
      </main>
      <Footer onOpenPage={setActivePage} />
      <WhatsAppButton />

      {/* Vehicle detail overlay */}
      {selectedVehicle && (
        <VehicleDetailPage
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}

      {/* Legal / credits overlays */}
      {activePage === 'privacy'  && <PrivacyPage  onClose={() => setActivePage(null)} />}
      {activePage === 'terms'    && <TermsPage    onClose={() => setActivePage(null)} />}
      {activePage === 'credits'  && <CreditsPage  onClose={() => setActivePage(null)} />}
    </div>
  );
}

export default App;
