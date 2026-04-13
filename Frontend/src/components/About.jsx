import React from 'react';
import { GraduationCap, MapPin, Code2, Zap } from 'lucide-react';

const HIGHLIGHTS = [
  { icon: <GraduationCap size={18} />, label: 'B.Tech CSE', sub: 'Einstein Academy, Odisha — 2025', color: '#c8ff00' },
  { icon: <MapPin size={18} />, label: 'Odisha, India', sub: 'Belpara, Balangir', color: '#38d9f5' },
  { icon: <Code2 size={18} />, label: 'MERN Stack', sub: 'Specialisation', color: '#b57bee' },
  { icon: <Zap size={18} />, label: 'Real-time Apps', sub: 'Socket.io • APIs • Auth', color: '#ff8c42' },
];

const About = ({ aboutRef }) => {
  return (
    <section id="about" ref={aboutRef} style={{ padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* accent line */}
      <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: '60%', background: 'linear-gradient(180deg, transparent, #c8ff00, transparent)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} data-reveal>

          {/* Left: text */}
          <div>
            <div className="section-label">About Me</div>
            <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.02em' }}>
              Turning ideas into<br /><span style={{ color: '#c8ff00' }}>working products</span>
            </h2>
            <p style={{ color: '#aaa', lineHeight: 1.8, marginBottom: 20, fontSize: '0.97rem' }}>
              I'm a recent Computer Science Engineering graduate from Einstein Academy of Technology and Management, Odisha. My journey in web development began with a curiosity for building digital solutions that actually make a difference.
            </p>
            <p style={{ color: '#aaa', lineHeight: 1.8, fontSize: '0.97rem' }}>
              I specialise in the MERN stack and have hands-on experience building full-stack applications featuring real-time communication, payment integration, AI-powered features, and responsive interfaces. I care deeply about writing clean, efficient code.
            </p>

            {/* Fun facts */}
            <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['Clean Code', 'REST APIs', 'Real-time', 'Responsive UI', 'Auth & JWT', 'Stripe'].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Right: highlight cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {HIGHLIGHTS.map(({ icon, label, sub, color }) => (
              <div key={label} className="card" style={{ padding: 24 }}>
                <div style={{ color, marginBottom: 12 }}>{icon}</div>
                <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>{label}</div>
                <div style={{ color: '#666', fontSize: '0.78rem', lineHeight: 1.5 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          [data-reveal] { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
