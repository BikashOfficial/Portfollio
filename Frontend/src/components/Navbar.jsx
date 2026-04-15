import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = ['Home', 'About', 'Projects', 'Skills', 'Contact'];

const Navbar = ({ activeSection, mobileMenuOpen, setMobileMenuOpen, scrollToSection, heroRef, aboutRef, projectsRef, skillsRef, contactRef }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const refMap = { Home: heroRef, About: aboutRef, Projects: projectsRef, Skills: skillsRef, Contact: contactRef };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '12px 0' : '20px 0',
      background: scrolled ? 'rgba(14,14,14,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid #2e2e2e' : 'none',
      transition: 'all 0.35s ease'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <button onClick={() => scrollToSection(heroRef)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: '#c8ff00', letterSpacing: '-0.02em' }}>
            Bikash<span style={{ color: '#f0f0f0' }}>.</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: 4, fontFamily: 'Syne, sans-serif' }} className="hidden-mobile">
          {NAV_ITEMS.map(item => {
            const active = activeSection === item.toLowerCase();
            return (
              <button key={item} onClick={() => scrollToSection(refMap[item])} style={{
                background: active ? 'rgba(200,255,0,0.1)' : 'none',
                border: 'none',
                borderRadius: 999,
                padding: '7px 18px',
                // fontFamily: 'DM Sans, sans-serif',
                fontWeight: 50,
                fontFamily: 'Syne, sans-serif',
                fontSize: '0.88rem',
                color: active ? '#c8ff00' : '#888',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
                onMouseEnter={e => { if (!active) e.target.style.color = '#f0f0f0'; }}
                onMouseLeave={e => { if (!active) e.target.style.color = '#888'; }}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ fontFamily: 'Syne, sans-serif', background: 'none', border: 'none', color: '#f0f0f0', cursor: 'pointer', display: 'none' }}
          className="show-mobile"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div style={{
          background: '#181818',
          borderTop: '1px solid #2e2e2e',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4
        }}>
          {NAV_ITEMS.map(item => (
            <button key={item} onClick={() => scrollToSection(refMap[item])} style={{
              background: 'none', border: 'none',
              textAlign: 'left',
              padding: '10px 8px',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 500,
              fontSize: '1rem',
              color: activeSection === item.toLowerCase() ? '#c8ff00' : '#888',
              cursor: 'pointer',
              borderBottom: '1px solid #2e2e2e'
            }}>
              {item}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
