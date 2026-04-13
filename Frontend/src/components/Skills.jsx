import React from 'react';

const SKILL_GROUPS = [
  {
    label: 'Frontend',
    color: '#c8ff00',
    skills: [
      { name: 'React.js', icon: '⚛️' },
      { name: 'JavaScript', icon: '🟨' },
      { name: 'HTML5', icon: '🧱' },
      { name: 'CSS3', icon: '🎨' },
      { name: 'Tailwind CSS', icon: '💨' },
      { name: 'Bootstrap', icon: '🅱️' },
    ]
  },
  {
    label: 'Backend',
    color: '#38d9f5',
    skills: [
      { name: 'Node.js', icon: '🟩' },
      { name: 'Express.js', icon: '🚂' },
      { name: 'Socket.io', icon: '⚡' },
      { name: 'REST APIs', icon: '🔌' },
    ]
  },
  {
    label: 'Database',
    color: '#b57bee',
    skills: [
      { name: 'MongoDB', icon: '🍃' },
      { name: 'SQL / MySQL', icon: '🗃️' },
    ]
  },
  {
    label: 'Tools & More',
    color: '#ff8c42',
    skills: [
      { name: 'Git', icon: '🔀' },
      { name: 'GitHub', icon: '🐙' },
      { name: 'OOP', icon: '🧩' },
      { name: 'Stripe', icon: '💳' },
      { name: 'Gemini API', icon: '🤖' },
      { name: 'JWT Auth', icon: '🔐' },
    ]
  }
];

const Skills = ({ skillsRef }) => {
  return (
    <section id="skills" ref={skillsRef} style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div className="reveal" style={{ marginBottom: 60 }}>
          <div className="section-label">Tech Stack</div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Tools I <span style={{ color: '#c8ff00' }}>Work With</span>
          </h2>
        </div>

        {/* Skill groups */}
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
          {SKILL_GROUPS.map(({ label, color, skills }) => (
            <div key={label} className="card" style={{ padding: 28 }}>
              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, boxShadow: `0 0 10px ${color}80` }} />
                <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '0.9rem', color }}>{label}</span>
              </div>

              {/* Skills list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {skills.map(({ name, icon }) => (
                  <div key={name} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 12px',
                    background: 'var(--c-bg)',
                    borderRadius: 8,
                    border: '1px solid var(--c-border)',
                    transition: 'border-color 0.2s, background 0.2s',
                    cursor: 'default'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = `${color}0d`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.background = 'var(--c-bg)'; }}
                  >
                    <span style={{ fontSize: '0.9rem' }}>{icon}</span>
                    <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '0.85rem', color: '#ccc' }}>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Marquee strip */}
        <div className="reveal" style={{ marginTop: 60, overflow: 'hidden', padding: '20px 0', borderTop: '1px solid var(--c-border)', borderBottom: '1px solid var(--c-border)' }}>
          <div className="marquee-track">
            {[...SKILL_GROUPS.flatMap(g => g.skills.map(s => s.name)), ...SKILL_GROUPS.flatMap(g => g.skills.map(s => s.name))].map((name, i) => (
              <span key={i} style={{ fontFamily: 'Syne', fontWeight: 600, fontSize: '0.8rem', color: '#444', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                {name} <span style={{ color: '#c8ff00', marginLeft: 8 }}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
