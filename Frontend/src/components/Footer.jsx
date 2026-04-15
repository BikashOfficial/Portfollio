import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => (
  <footer style={{ padding: '32px 24px', borderTop: '1px solid var(--c-border)', background: 'var(--c-bg)' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
      <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.1rem', color: '#c8ff00' }}>
        Bikash<span style={{ color: '#444' }}>.</span>
      </span>
      <span style={{ color: '#444', fontSize: '0.8rem', fontFamily: 'DM Sans' }}>
        © {new Date().getFullYear()} Bikash Meher — All Rights Reserved
      </span>
      <div style={{ display: 'flex', gap: 12 }}>
        {[
          { icon: <Github size={16} />, href: 'https://github.com/BikashOfficial' },
          { icon: <Linkedin size={16} />, href: 'https://linkedin.com/in/bikash-meher-725b64275' },
          { icon: <Mail size={16} />, href: 'mailto:bm244368@gmail.com' },
        ].map(({ icon, href }, i) => (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: 'var(--c-surface)', border: '1px solid var(--c-border)', color: '#888', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#c8ff00'; e.currentTarget.style.color = '#c8ff00'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.color = '#888'; }}
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
