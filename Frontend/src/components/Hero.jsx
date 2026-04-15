import React, { useEffect, useState, useRef } from 'react';
import { Download, ArrowDown } from 'lucide-react';

const ROLES = ['Full Stack Developer', 'MERN Stack Dev', 'UI Enthusiast', 'Problem Solver'];

const Hero = ({ heroRef, scrollToSection, projectsRef }) => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const cursorRef = useRef(null);

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
    <section
      id="home"
      ref={heroRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 80,
      }}
    >
      <div ref={cursorRef} className="cursor-glow" />

      {/* BG blobs */}
      <div style={{ position: 'absolute', top: '5%', right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,217,245,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Dot grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07, pointerEvents: 'none' }}>
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 20 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={c * 80 + 40} cy={r * 80 + 40} r={1.5} fill="#c8ff00" />
          ))
        )}
      </svg>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 48px', width: '100%' }}>
        <div className="hero-grid">

          {/* ── LEFT: text ── */}
          <div className="hero-text">
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(200,255,0,0.08)', border: '1px solid rgba(200,255,0,0.2)',
              borderRadius: 999, padding: '6px 16px', marginBottom: 28,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#c8ff00', display: 'inline-block', boxShadow: '0 0 8px #c8ff00' }} />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', fontWeight: 500, color: '#c8ff00', letterSpacing: '0.1em' }}>
                AVAILABLE FOR HIRE
              </span>
            </div>

            {/* Heading */}
            <h1 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.6rem, 4.5vw, 5.2rem)',
              lineHeight: 1.04, letterSpacing: '-0.03em', marginBottom: 18,
            }}>
              Hi, I'm<br />
              <span style={{ color: '#c8ff00' }}>Bikash</span> Meher
            </h1>

            {/* Typewriter */}
            <div style={{ minHeight: 40, display: 'flex', alignItems: 'center', marginBottom: 22 }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: '#38d9f5' }}>
                {displayed}<span className="blink" style={{ color: '#c8ff00' }}>|</span>
              </span>
            </div>

            {/* Description */}
            <p style={{ color: '#888', fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', lineHeight: 1.8, maxWidth: 480, marginBottom: 36 }}>
              Building responsive, scalable web applications with the MERN stack. Passionate about clean code, great UX, and solving real problems through software.
            </p>

            {/* CTAs */}
            <div className="hero-ctas">
              <button className="btn-primary" onClick={() => scrollToSection(projectsRef)}>
                My Work <ArrowDown size={15} />
              </button>
              <a
                href="https://drive.google.com/file/d/18UGUHSrI_aI1QMqh6qPIPdy19V8Cf5VI/view?usp=drive_link"
                target="_blank" rel="noopener noreferrer"
                className="btn-outline"
              >
                <Download size={15} /> Resume
              </a>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              {[['6+', 'Projects Built'], ['1+', 'Years Coding'], ['MERN', 'Stack Expert']].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#c8ff00' }}>{val}</div>
                  <div style={{ fontSize: '0.75rem', color: '#555', letterSpacing: '0.05em', marginTop: 3 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: avatar ── */}
          <div className="hero-avatar-col">
            <div className="hero-avatar-wrap float">

              {/* Spinning dashed ring */}
              <svg viewBox="0 0 440 440" className="spin-slow hero-ring" aria-hidden="true">
                <circle cx="220" cy="220" r="210" fill="none" stroke="#c8ff00" strokeWidth="1.5" strokeDasharray="8 16" />
              </svg>

              {/* Photo blob */}
              <div className="hero-blob">
                <img src="h.jpg" alt="Bikash Meher" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
              </div>

              {/* Badges */}
              <div className="badge badge-br" style={{ background: '#c8ff00', color: '#0e0e0e', boxShadow: '0 6px 24px rgba(200,255,0,0.45)' }}>
                ⚡ MERN Dev
              </div>
              <div className="badge badge-tl" style={{ background: '#38d9f5', color: '#0e0e0e', boxShadow: '0 6px 24px rgba(56,217,245,0.4)' }}>
                🚀 Open to Work
              </div>

            </div>
          </div>

        </div>
      </div>

      <style>{`
        /* ── DESKTOP BASE ── */
        .hero-grid {
          display: grid;
          grid-template-columns: 55% 45%;
          align-items: center;
          width: 100%;
        }

        .hero-text {
          padding-right: 48px;
        }

        .hero-ctas {
          display: flex;
          gap: 30px;
          // flex-wrap: wrap;
          // flex-direction: column;
        }

        .hero-stats {
          display: flex;
          gap: 44px;
          margin-top: 52px;
          flex-wrap: wrap;
        }

        .hero-avatar-col {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Avatar sized to fill its column nicely */
        .hero-avatar-wrap {
          position: relative;
          width: min(380px, 90%);
          aspect-ratio: 1;
        }

        .hero-ring {
          position: absolute;
          top: -7%;
          left: -7%;
          width: 114%;
          height: 114%;
          opacity: 0.45;
        }

        .hero-blob {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 40% 60% 55% 45% / 50% 45% 55% 50%;
          overflow: hidden;
          border: 2.5px solid rgba(200,255,0,0.3);
          position: relative;
          z-index: 1;
        }

        .badge {
          position: absolute;
          z-index: 2;
          border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.8rem;
          white-space: nowrap;
          padding: 9px 16px;
        }

        .badge-br { bottom: 8%; right: -8%; }
        .badge-tl { top: 8%; left: -8%; }

        /* ── LARGE DESKTOP 1400px+ ── */
        @media (min-width: 1400px) {
          .hero-avatar-wrap { width: min(430px, 90%); }
        }

        /* ── LAPTOP 1024–1280px ── */
        @media (max-width: 1280px) {
          .hero-grid { grid-template-columns: 58% 42%; }
          .hero-avatar-wrap { width: min(340px, 90%); }
          .hero-text { padding-right: 32px; }
        }

        /* ── TABLET 768–1024px ── */
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
          .hero-text { padding-right: 0; }
          .hero-avatar-wrap { width: min(300px, 90%); }
          .badge { font-size: 0.72rem; padding: 7px 13px; }
          .badge-br { right: -4%; }
          .badge-tl { left: -4%; }
        }

        /* ── MOBILE ≤768px ── */
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr; gap: 44px; text-align: center; }
          .hero-avatar-col { order: -1; }
          .hero-avatar-wrap { width: min(260px, 70vw); margin: 0 auto; }
          .hero-text { padding-right: 0; }
          .hero-ctas { justify-content: center; }
          .hero-stats { justify-content: center; gap: 28px; margin-top: 36px; }
          .badge { font-size: 0.65rem; padding: 6px 11px; border-radius: 9px; }
          .badge-br { right: -2%; bottom: 4%; }
          .badge-tl { left: -2%; top: 4%; }
        }

        /* ── SMALL MOBILE ≤480px ── */
        @media (max-width: 480px) {
          .hero-avatar-wrap { width: min(220px, 72vw); }
          .badge { font-size: 0.58rem; padding: 5px 9px; }
          .badge-br { right: 0; }
          .badge-tl { left: 0; }
        }

        /* ── VERY SMALL ≤360px ── */
        @media (max-width: 360px) {
          .hero-avatar-wrap { width: 150px; }
          .badge { display: none; }
        }
      `}</style>
    </section>
  );
};

export default Hero;