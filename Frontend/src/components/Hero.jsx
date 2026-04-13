import React, { useEffect, useState, useRef } from 'react';
import { Download, ArrowDown } from 'lucide-react';

const ROLES = ['Full Stack Developer', 'MERN Stack Dev', 'UI Enthusiast', 'Problem Solver'];

const Hero = ({ heroRef, scrollToSection, projectsRef }) => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const cursorRef = useRef(null);

  // Typewriter
  useEffect(() => {
    const full = ROLES[roleIdx];
    let timer;
    if (!deleting && displayed.length < full.length) {
      timer = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === full.length) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(full.slice(0, displayed.length - 1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((roleIdx + 1) % ROLES.length);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, roleIdx]);

  // Cursor follow glow
  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <section id="home" ref={heroRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 80 }}>
      <div ref={cursorRef} className="cursor-glow" />

      {/* BG decorative blobs */}
      <div style={{ position: 'absolute', top: '10%', right: '-5%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,255,0,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', left: '-8%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,217,245,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Floating dots grid */}
      <svg style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', opacity: 0.08, pointerEvents: 'none' }}>
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 20 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={c * 80 + 40} cy={r * 80 + 40} r={1.5} fill="#c8ff00" />
          ))
        )}
      </svg>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 5vw, 24px)', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'clamp(40px, 8vw, 60px)', alignItems: 'center' }} className="hero-grid">

          {/* Left */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,255,0,0.08)', border: '1px solid rgba(200,255,0,0.2)', borderRadius: 999, padding: '6px 14px', marginBottom: 24 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#c8ff00', display: 'inline-block', boxShadow: '0 0 8px #c8ff00' }} />
              <span style={{ fontFamily: 'DM Sans', fontSize: '0.78rem', fontWeight: 500, color: '#c8ff00', letterSpacing: '0.08em' }}>AVAILABLE FOR HIRE</span>
            </div>

            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2.8rem, 6vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 20 }}>
              Hi, I'm<br />
              <span style={{ color: '#c8ff00' }}>Bikash</span> Meher
            </h1>

            <div style={{ height: 40, display: 'flex', alignItems: 'center', marginBottom: 24 }}>
              <span style={{ fontFamily: 'Syne', fontWeight: 600, fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: '#38d9f5' }}>
                {displayed}<span className="blink" style={{ color: '#c8ff00' }}>|</span>
              </span>
            </div>

            <p style={{ color: '#888', fontSize: '1rem', lineHeight: 1.75, maxWidth: 520, marginBottom: 36 }}>
              Building responsive, scalable web applications with the MERN stack. Passionate about clean code, great UX, and solving real problems through software.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => scrollToSection(projectsRef)}>
                View My Work <ArrowDown size={15} />
              </button>
              <a
                href="https://drive.google.com/file/d/18UGUHSrI_aI1QMqh6qPIPdy19V8Cf5VI/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Download size={15} /> Resume
              </a>
            </div>

            {/* Quick stats */}
            <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
              {[['6+', 'Projects Built'], ['1+', 'Years Coding'], ['MERN', 'Stack Expert']].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.6rem', color: '#c8ff00' }}>{val}</div>
                  <div style={{ fontSize: '0.78rem', color: '#888', letterSpacing: '0.05em', marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — avatar blob */}
          <div className="hero-avatar-wrap" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ position: 'relative', width: 'clamp(200px, 40vw, 400px)' }} className="float">
              {/* Spinning ring */}
              <svg viewBox="0 0 400 400" className="spin-slow" style={{ position: 'absolute', top: '-7%', left: '-7%', width: '114%', height: '114%', opacity: 0.4, aspectRatio: '1' }}>
                <circle cx="150" cy="150" r="145" fill="none" stroke="#c8ff00" strokeWidth="1" strokeDasharray="6 14" />
              </svg>

              <div style={{
                width: '100%', aspectRatio: '1',
                borderRadius: '40% 60% 55% 45% / 50% 45% 55% 50%',
                overflow: 'hidden',
                border: 'clamp(2px, 0.5vw, 3px) solid rgba(200,255,0,0.3)',
                background: 'linear-gradient(135deg, #1a1a1a, #222)',
                position: 'relative',
                zIndex: 1
              }

              }>
                <img src="h.jpg" alt="Bikash Meher" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Accent badge */}
              <div style={{
                position: 'absolute', bottom: 'clamp(5px, 2vw, 10px)', right: 'clamp(-12px, -3vw, -16px)', zIndex: 2,
                background: '#c8ff00', color: '#0e0e0e',
                borderRadius: 'clamp(8px, 1vw, 12px)', padding: 'clamp(6px, 1vw, 8px) clamp(10px, 2vw, 14px)',
                fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)',
                boxShadow: '0 4px 20px rgba(200,255,0,0.4)', whiteSpace: 'nowrap'
              }}>⚡ MERN Dev</div>

              <div style={{
                position: 'absolute', top: 'clamp(5px, 2vw, 10px)', left: 'clamp(-16px, -3vw, -20px)', zIndex: 2,
                background: '#38d9f5', color: '#0e0e0e',
                borderRadius: 'clamp(8px, 1vw, 12px)', padding: 'clamp(6px, 1vw, 8px) clamp(10px, 2vw, 14px)',
                fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)',
                boxShadow: '0 4px 20px rgba(56,217,245,0.35)', whiteSpace: 'nowrap'
              }}>🚀 Open to Work</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-grid { gap: clamp(30px, 5vw, 60px) !important; }
        }
        @media (max-width: 768px) {
          .hero-grid { 
            grid-template-columns: 1fr !important; 
            gap: clamp(25px, 5vw, 40px) !important; 
          }
          .hero-avatar-wrap { justify-content: center !important; }
        }
        @media (max-width: 480px) {
          .hero-grid { gap: 20px !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
