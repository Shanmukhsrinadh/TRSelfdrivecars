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

function App() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

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
        <Services />
        <VehicleCategories onSelectVehicle={setSelectedVehicle} />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />

      {/* Vehicle detail overlay */}
      {selectedVehicle && (
        <VehicleDetailPage
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </div>
  );
}

export default App;
