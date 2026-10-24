import React, { useState } from 'react';
import { MovingBackground } from './components/MovingBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MysteryBoxesPage } from './components/MysteryBoxesPage';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'projects'>('landing');

  return (
    <div className="min-h-screen bg-[#03060f] text-white font-sans selection:bg-[#FF671F]/40 selection:text-white relative z-0 flex flex-col justify-between">
      
      {/* Dynamic Celestial Shining Star Background */}
      <MovingBackground />

      {currentPage === 'landing' ? (
        <>
          {/* Main Navigation Header */}
          <Navbar />

          {/* Main Landing Page Hero Stating VIKSIT BHARAT with ONLY ONE "Launch Project" Button */}
          <main className="relative z-10 flex-1 flex flex-col justify-center">
            <HeroSection
              onLaunchProject={() => setCurrentPage('projects')}
            />
          </main>
        </>
      ) : (
        /* New Project Page with 3 Indian Tricolor Mystery Boxes */
        <main className="relative z-10 flex-1 flex flex-col">
          <MysteryBoxesPage
            onBack={() => setCurrentPage('landing')}
          />
        </main>
      )}

      {/* Sovereign Footer with Rishik Velagapudi Photo & LinkedIn Profile Link */}
      <Footer />

    </div>
  );
}
