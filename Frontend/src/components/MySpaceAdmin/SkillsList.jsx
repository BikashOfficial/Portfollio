import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const SkillsList = ({ skills, onEdit, onDelete, saving }) => {
  if (!skills || skills.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 24px',
        color: 'var(--c-muted)',
        background: 'var(--c-surface)',
        borderRadius: '12px',
        border: '2px dashed var(--c-border)'
      }}>
        <p style={{ fontSize: '1.1rem' }}>🎯 No skills yet</p>
        <p style={{ fontSize: '0.9rem' }}>Click "Add Skill" to get started!</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: '28px' }}>
      {skills.map((group, groupIndex) => (
        <div key={groupIndex}>
          <h3 style={{
            fontFamily: 'Syne',
            fontWeight: 700,
            marginBottom: '16px',
            color: group.color || 'var(--c-text)',
            fontSize: '1.15rem'
          }}>
            {group.label}
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
            gap: '12px'
          }}>
            {group.skills && group.skills.map((skill, skillIndex) => (
              <div
                key={skillIndex}
                style={{
                  background: 'var(--c-surface)',
                  border: '1.5px solid var(--c-border)',
                  borderRadius: '10px',
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(200, 255, 0, 0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  {skill.icon && skill.icon.startsWith('http') ? (
                    <img src={skill.icon} alt={skill.name} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                  ) : (
                    <span style={{ fontSize: '1.4rem' }}>{skill.icon || '🔧'}</span>
                  )}
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{skill.name}</span>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  <button
                    onClick={() => onEdit(groupIndex, skillIndex)}
                    disabled={saving}
                    style={{
                      padding: '8px 10px',
                      background: 'var(--c-bg)',
                      color: 'var(--c-text)',
                      border: '1px solid var(--c-border)',
                      borderRadius: '6px',
                      cursor: saving ? 'not-allowed' : 'pointer',
                      opacity: saving ? 0.5 : 1,
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={e => !saving && (e.currentTarget.style.background = 'var(--c-border)')}
                    onMouseLeave={e => !saving && (e.currentTarget.style.background = 'var(--c-bg)')}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(groupIndex, skillIndex)}
                    disabled={saving}
                    style={{
                      padding: '8px 10px',
                      background: 'rgba(255, 59, 48, 0.1)',
                      color: '#ff3b30',
                      border: '1px solid rgba(255, 59, 48, 0.3)',
                      borderRadius: '6px',
                      cursor: saving ? 'not-allowed' : 'pointer',
                      opacity: saving ? 0.5 : 1,
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={e => !saving && (e.currentTarget.style.background = 'rgba(255, 59, 48, 0.2)')}
                    onMouseLeave={e => !saving && (e.currentTarget.style.background = 'rgba(255, 59, 48, 0.1)')}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsList;
