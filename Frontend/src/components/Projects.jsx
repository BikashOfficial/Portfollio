import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/projects';

const Projects = ({ projectsRef }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" ref={projectsRef} style={{ padding: '100px 24px', background: 'var(--c-surface)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div className="reveal" style={{ marginBottom: 60 }}>
          <div className="section-label">Featured Work</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Things I've <span style={{ color: '#c8ff00' }}>Built</span>
            </h2>
            <a href="https://github.com/BikashOfficial" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#888', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 500 }}
              onMouseEnter={e => e.currentTarget.style.color = '#c8ff00'}
              onMouseLeave={e => e.currentTarget.style.color = '#888'}
            >
              All on GitHub <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {PROJECTS.map((p, i) => (
            <div
              key={i}
              className="card"
              style={{ overflow: 'hidden', borderColor: hovered === i ? p.accent : undefined }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: 190, overflow: 'hidden' }}>
                <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hovered === i ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.4s ease' }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(14,14,14,0.9) 0%, transparent 55%)` }} />
                <div style={{ position: 'absolute', top: 14, right: 14, background: p.accent, color: '#0e0e0e', borderRadius: 999, padding: '4px 12px', fontFamily: 'Syne', fontWeight: 700, fontSize: '0.7rem' }}>
                  {p.emoji} {p.title.split(' ')[0]}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '20px 22px 22px' }}>
                <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>{p.title}</h3>
                <p style={{ color: '#888', fontSize: '0.83rem', lineHeight: 1.65, marginBottom: 14 }}>{p.desc}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                  {p.tech.map(t => (
                    <span key={t} className="tag" style={{ fontSize: '0.68rem' }}>{t}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  {p.demo !== '#' && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: 6, background: p.accent, color: '#0e0e0e', borderRadius: 999, padding: '7px 16px', fontFamily: 'Syne', fontWeight: 700, fontSize: '0.78rem', textDecoration: 'none', transition: 'opacity 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      <ExternalLink size={13} /> Live
                    </a>
                  )}
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #2e2e2e', color: '#888', borderRadius: 999, padding: '7px 16px', fontFamily: 'Syne', fontWeight: 600, fontSize: '0.78rem', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#888'; e.currentTarget.style.color = '#f0f0f0'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#2e2e2e'; e.currentTarget.style.color = '#888'; }}
                  >
                    <Github size={13} /> Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
