import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const HomePage = ({ activeSection, mobileMenuOpen, setMobileMenuOpen, scrollToSection, heroRef, aboutRef, projectsRef, skillsRef, contactRef }) => (
  <>
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
    <Hero heroRef={heroRef} scrollToSection={scrollToSection} projectsRef={projectsRef} />
    <About aboutRef={aboutRef} />
    <Projects projectsRef={projectsRef} />
    <Skills skillsRef={skillsRef} />
    <Contact contactRef={contactRef} />
    <Footer />
  </>
);

export default HomePage;
