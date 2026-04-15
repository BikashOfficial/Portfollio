import React from 'react';
import { X } from 'lucide-react';

const SkillForm = ({ form, setForm, onSave, onCancel, saving }) => {
  const inputStyle = {
    width: '100%',
    padding: 'clamp(10px, 2vw, 14px)',
    background: 'var(--c-bg)',
    border: '1.5px solid var(--c-border)',
    borderRadius: '8px',
    color: 'var(--c-text)',
    fontFamily: 'inherit',
    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
    transition: 'all 0.2s',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
    fontWeight: 600,
    color: 'var(--c-muted)'
  };

  return (
    <div style={{
      background: 'var(--c-surface)',
      padding: 'clamp(20px, 5vw, 28px)',
      borderRadius: '14px',
      marginBottom: '28px',
      border: '1px solid var(--c-border)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
        <h3 style={{ marginBottom: 0, fontFamily: 'Syne', fontWeight: 700, fontSize: 'clamp(1.1rem, 3vw, 1.3rem)' }}>
          {form.name ? '✏️ Edit Skill' : '➕ Add New Skill'}
        </h3>
        <button
          onClick={onCancel}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--c-muted)',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={24} />
        </button>
      </div>

      <div style={{ display: 'grid', gap: '18px', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}>
        {/* Skill Name */}
        <div>
          <label style={labelStyle}>Skill Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g., React.js"
            style={inputStyle}
          />
        </div>

        {/* Icon Emoji or Image */}
        <div>
          <label style={labelStyle}>Icon (Emoji or Image URL)</label>
          <input
            type="text"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            placeholder="⚛️ or https://image.url/icon.png"
            style={inputStyle}
          />
          {form.icon && (
            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px', background: 'var(--c-bg)', borderRadius: '6px' }}>
              {form.icon.startsWith('http') ? (
                <img src={form.icon} alt="preview" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
              ) : (
                <span style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>{form.icon}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginTop: 'clamp(20px, 5vw, 28px)', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button
          onClick={onCancel}
          disabled={saving}
          style={{
            padding: 'clamp(10px, 2vw, 12px) clamp(18px, 3vw, 24px)',
            background: 'transparent',
            border: '1.5px solid var(--c-border)',
            color: 'var(--c-text)',
            borderRadius: '8px',
            cursor: saving ? 'not-allowed' : 'pointer',
            fontFamily: 'Syne',
            fontWeight: 600,
            fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
            opacity: saving ? 0.5 : 1,
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => !saving && (e.currentTarget.style.background = 'var(--c-border)')}
          onMouseLeave={e => !saving && (e.currentTarget.style.background = 'transparent')}
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={saving}
          style={{
            padding: 'clamp(10px, 2vw, 12px) clamp(20px, 3vw, 28px)',
            background: saving ? '#999' : '#c8ff00',
            color: '#0e0e0e',
            border: 'none',
            borderRadius: '8px',
            cursor: saving ? 'not-allowed' : 'pointer',
            fontFamily: 'Syne',
            fontWeight: 600,
            fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={e => !saving && (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => !saving && (e.currentTarget.style.opacity = '1')}
        >
          {saving ? '⏳ Saving...' : '💾 Save Skill'}
        </button>
      </div>
    </div>
  );
};

export default SkillForm;
