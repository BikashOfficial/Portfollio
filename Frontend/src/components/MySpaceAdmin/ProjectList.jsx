import React, { useState } from 'react';
import { Edit2, Trash2, ExternalLink, Github, Image as ImageIcon } from 'lucide-react';

const ProjectCard = ({ project, index, onEdit, onDelete, saving }) => {
  const [hovered, setHovered] = useState(false);
  const accent = project.accent || '#c8ff00';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--c-surface)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1.5px solid ${hovered ? accent : 'var(--c-border)'}`,
        boxShadow: hovered
          ? `0 16px 40px rgba(0,0,0,0.3), 0 0 0 1px ${accent}33`
          : '0 4px 12px rgba(0,0,0,0.15)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Image banner ── */}
      <div style={{ position: 'relative', height: '180px', flexShrink: 0, background: 'var(--c-bg)' }}>
        {project.img ? (
          <>
            <img
              src={project.img}
              alt={project.title}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.querySelector('.img-placeholder').style.display = 'flex';
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)',
              pointerEvents: 'none'
            }} />
          </>
        ) : null}

        {/* fallback */}
        <div className="img-placeholder" style={{
          display: project.img ? 'none' : 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          height: '100%',
          color: 'var(--c-muted)',
        }}>
          <ImageIcon size={36} strokeWidth={1.2} />
          <span style={{ fontSize: '0.78rem' }}>No image set</span>
        </div>

        {/* Emoji badge */}
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          width: '38px', height: '38px',
          background: accent,
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.2rem',
          boxShadow: `0 4px 12px ${accent}55`
        }}>
          {project.emoji || '📦'}
        </div>

        {/* Link icons top-right */}
        <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px' }}>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer"
              style={{
                width: '30px', height: '30px', borderRadius: '8px',
                background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', textDecoration: 'none', transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = accent}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.55)'}
              title="Live Demo"
            >
              <ExternalLink size={13} />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer"
              style={{
                width: '30px', height: '30px', borderRadius: '8px',
                background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', textDecoration: 'none', transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#333'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.55)'}
              title="GitHub"
            >
              <Github size={13} />
            </a>
          )}
        </div>
      </div>

      {/* ── Card body ── */}
      <div style={{ padding: '18px 18px 14px', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>

        {/* Title */}
        <h3 style={{
          fontFamily: 'Syne', fontWeight: 800, fontSize: '1.05rem', margin: 0,
          color: 'var(--c-text)', lineHeight: 1.3,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>
          {project.title}
        </h3>

        {/* Description */}
        <p style={{
          color: 'var(--c-muted)', fontSize: '0.82rem', margin: 0,
          lineHeight: 1.6, flex: 1,
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>
          {project.desc}
        </p>

        {/* Tech tags */}
        {project.tech?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {project.tech.slice(0, 5).map((t, i) => (
              <span key={i} style={{
                padding: '3px 9px',
                borderRadius: '20px',
                fontSize: '0.7rem',
                fontWeight: 700,
                background: `${accent}22`,
                color: accent,
                border: `1px solid ${accent}44`,
                letterSpacing: '0.3px'
              }}>
                {t}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span style={{
                padding: '3px 9px', borderRadius: '20px', fontSize: '0.7rem',
                fontWeight: 700, background: 'var(--c-border)', color: 'var(--c-muted)'
              }}>
                +{project.tech.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--c-border)', margin: '2px 0' }} />

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onEdit(index)}
            disabled={saving}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '8px 12px',
              background: 'transparent',
              border: '1.5px solid var(--c-border)',
              color: 'var(--c-text)',
              borderRadius: '8px',
              cursor: saving ? 'not-allowed' : 'pointer',
              fontFamily: 'Syne', fontWeight: 600, fontSize: '0.82rem',
              opacity: saving ? 0.5 : 1,
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { if (!saving) { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; } }}
            onMouseLeave={e => { if (!saving) { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.color = 'var(--c-text)'; } }}
          >
            <Edit2 size={13} /> Edit
          </button>
          <button
            onClick={() => onDelete(index)}
            disabled={saving}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '8px 12px',
              background: 'rgba(255,59,48,0.08)',
              border: '1.5px solid rgba(255,59,48,0.2)',
              color: '#ff5f57',
              borderRadius: '8px',
              cursor: saving ? 'not-allowed' : 'pointer',
              fontFamily: 'Syne', fontWeight: 600, fontSize: '0.82rem',
              opacity: saving ? 0.5 : 1,
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { if (!saving) { e.currentTarget.style.background = 'rgba(255,59,48,0.18)'; e.currentTarget.style.borderColor = '#ff5f57'; } }}
            onMouseLeave={e => { if (!saving) { e.currentTarget.style.background = 'rgba(255,59,48,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,59,48,0.2)'; } }}
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectList = ({ projects, onEdit, onDelete, saving }) => {
  if (!projects || projects.length === 0) {
    return (
      <div style={{
        textAlign: 'center', padding: '80px 24px',
        color: 'var(--c-muted)', background: 'var(--c-surface)',
        borderRadius: '16px', border: '2px dashed var(--c-border)'
      }}>
        <p style={{ fontSize: '2.5rem', margin: '0 0 12px' }}>📦</p>
        <p style={{ fontSize: '1.05rem', fontFamily: 'Syne', fontWeight: 700, margin: '0 0 6px', color: 'var(--c-text)' }}>No projects yet</p>
        <p style={{ fontSize: '0.88rem', margin: 0 }}>Click "Add Project" to get started!</p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
      gap: '20px'
    }}>
      {projects.map((project, index) => (
        <ProjectCard
          key={project._id || index}
          project={project}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
          saving={saving}
        />
      ))}
    </div>
  );
};

export default ProjectList;
