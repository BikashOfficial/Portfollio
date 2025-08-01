import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);


  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = [heroRef, aboutRef, projectsRef, skillsRef, contactRef];
    sections.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className={` transition-all duration-300`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
        <Navbar
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

        <Hero
          heroRef={heroRef}
          scrollToSection={scrollToSection}
          projectsRef={projectsRef}
        />

        <About aboutRef={aboutRef} />

        <Projects projectsRef={projectsRef} />

        <Skills skillsRef={skillsRef} />

        <Contact contactRef={contactRef} />

        <Footer />
      </div>
    </div>
  );
}

export default App;
