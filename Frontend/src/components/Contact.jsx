import React, { useState, useEffect } from 'react';
import { Mail, Phone, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { submitContactForm } from '../services/commonService';

const Contact = ({ contactRef }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (submitStatus) {
      const t = setTimeout(() => setSubmitStatus(null), 7000);
      return () => clearTimeout(t);
    }
  }, [submitStatus]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setSubmitStatus({ type: 'success', message: result.message });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: result.message || 'Something went wrong.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: error.message || 'Network error. Is the server running?' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const SOCIALS = [
    { icon: <Github size={18} />, href: 'https://github.com/BikashOfficial', label: 'GitHub', color: '#f0f0f0' },
    { icon: <Linkedin size={18} />, href: 'https://linkedin.com/in/bikash-meher-725b64275', label: 'LinkedIn', color: '#38d9f5' },
    { icon: <Mail size={18} />, href: 'mailto:bm244368@gmail.com', label: 'Email', color: '#c8ff00' },
  ];

  return (
    <section id="contact" ref={contactRef} style={{ padding: '100px 24px', background: 'var(--c-surface)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div className="reveal" style={{ marginBottom: 60 }}>
          <div className="section-label">Contact</div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Let's <span style={{ color: '#c8ff00' }}>Connect</span>
          </h2>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60, alignItems: 'start' }} data-grid>

          {/* Left */}
          <div>
            <p style={{ color: '#888', lineHeight: 1.8, marginBottom: 36, fontSize: '0.97rem' }}>
              I'm always open to discussing new opportunities, interesting projects, or just having a good conversation. Drop me a message — I'll get back to you quickly!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
              <a href="mailto:bm244368@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', padding: '14px 18px', background: 'var(--c-bg)', border: '1px solid var(--c-border)', borderRadius: 12, transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#c8ff00'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--c-border)'}
              >
                <div style={{ color: '#c8ff00' }}><Mail size={18} /></div>
                <div>
                  <div style={{ fontFamily: 'Syne', fontWeight: 600, fontSize: '0.85rem', color: '#f0f0f0' }}>bm244368@gmail.com</div>
                  <div style={{ color: '#666', fontSize: '0.72rem', marginTop: 2 }}>Send an email</div>
                </div>
              </a>
              <a href="tel:+919937290695" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', padding: '14px 18px', background: 'var(--c-bg)', border: '1px solid var(--c-border)', borderRadius: 12, transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#38d9f5'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--c-border)'}
              >
                <div style={{ color: '#38d9f5' }}><Phone size={18} /></div>
                <div>
                  <div style={{ fontFamily: 'Syne', fontWeight: 600, fontSize: '0.85rem', color: '#f0f0f0' }}>+91 9937290695</div>
                  <div style={{ color: '#666', fontSize: '0.72rem', marginTop: 2 }}>Give me a call</div>
                </div>
              </a>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              {SOCIALS.map(({ icon, href, label, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: 'var(--c-bg)', border: '1px solid var(--c-border)', borderRadius: 999, color: '#888', textDecoration: 'none', fontFamily: 'DM Sans', fontWeight: 500, fontSize: '0.82rem', transition: 'border-color 0.2s, color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.color = '#888'; }}
                >
                  {icon} {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)', borderRadius: 20, padding: 32 }}>
            {submitStatus && (
              <div style={{
                marginBottom: 20, padding: '12px 16px', borderRadius: 10,
                background: submitStatus.type === 'success' ? 'rgba(200,255,0,0.08)' : 'rgba(255,92,92,0.08)',
                border: `1px solid ${submitStatus.type === 'success' ? 'rgba(200,255,0,0.3)' : 'rgba(255,92,92,0.3)'}`,
                color: submitStatus.type === 'success' ? '#c8ff00' : '#ff5c5c',
                display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem'
              }}>
                {submitStatus.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#666', marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Name</label>
                <input id="name" type="text" className="field-input" value={formData.name} onChange={handleChange} required placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#666', marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Email</label>
                <input id="email" type="email" className="field-input" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
              </div>
              <div>
                <label htmlFor="message" style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#666', marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Message</label>
                <textarea id="message" className="field-input" rows={5} value={formData.message} onChange={handleChange} required placeholder="Tell me about your project or just say hello!" style={{ resize: 'vertical', minHeight: 120 }} />
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ justifyContent: 'center', opacity: isSubmitting ? 0.65 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                {isSubmitting ? 'Sending…' : <><Send size={15} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          [data-grid] { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
