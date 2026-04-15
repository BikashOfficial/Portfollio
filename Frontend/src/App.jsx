import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import CustomCursor from './components/CustomCursor';
import AccessCodeGate from './components/AccessCodeGate';
import HomePage from './pages/HomePage';
import './index.css';


const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { threshold: 0.35 });

    [heroRef, aboutRef, projectsRef, skillsRef, contactRef].forEach(r => {
      if (r.current) observer.observe(r.current);
    });
    return () => observer.disconnect();
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#f0f0f0',
            border: '1px solid #2a2a2a',
            borderRadius: '10px',
            fontFamily: 'Syne, sans-serif',
            fontSize: '0.9rem'
          },
          success: { iconTheme: { primary: '#c8ff00', secondary: '#0e0e0e' } },
          error:   { iconTheme: { primary: '#ff4444', secondary: '#fff' } }
        }}
      />
      <CustomCursor />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              activeSection={activeSection}
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              scrollToSection={scrollToSection}
              heroRef={heroRef}
              aboutRef={aboutRef}
              projectsRef={projectsRef}
              skillsRef={skillsRef}
              contactRef={contactRef}
            />
          }
        />
        <Route path="/myspace" element={<AccessCodeGate />} />
      </Routes>
    </Router>
  );
};

export default App;
