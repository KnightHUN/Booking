import React, { useState } from 'react';
import { Navbar } from './src/components/Navbar';
import { Hero } from './src/components/Hero';
import { About } from './src/components/sections/About';
import { DoctorList } from './src/components/DoctorList';
import { Contact } from './src/components/sections/Contact';
import { BookingForm } from './src/components/BookingForm';
import { Footer } from './src/components/Footer';
import { BookingModal } from './src/components/booking/BookingModal';
import { doctors } from './src/data/doctors';
import { Doctor, Appointment } from './src/types';
import { usePayment } from './src/hooks/usePayment';
import { Toaster } from 'react-hot-toast';

function App() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const { isProcessing, processPayment } = usePayment();

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleBookingSubmit = async (appointment: Appointment) => {
    if (selectedDoctor) {
      await processPayment(appointment, selectedDoctor.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster position="top-right" />
      <Navbar />
      <Hero />
      <About />
      
      <section id="book-appointment" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Specialist Doctors
          </h2>
          <DoctorList 
            doctors={doctors} 
            onDoctorSelect={handleDoctorSelect} 
          />
        </div>
      </section>

      <Contact />
      <Footer />

      {selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onSubmit={handleBookingSubmit}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
}

export default App;