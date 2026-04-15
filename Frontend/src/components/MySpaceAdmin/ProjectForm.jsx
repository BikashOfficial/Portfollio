import React, { useState, useRef } from 'react';
import { X, Upload, Link, Image } from 'lucide-react';
import { uploadProjectImage } from '../../services/projectService';

const ProjectForm = ({ form, setForm, onSave, onCancel, saving }) => {
  const [imgMode, setImgMode] = useState('url'); // 'url' | 'upload'
  const [techInput, setTechInput] = useState(form.tech.join(', '));
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Keep raw string while typing; parse into array only on blur
  const handleTechInput = (e) => setTechInput(e.target.value);
  const handleTechBlur = () => {
    const tech = techInput.split(',').map(t => t.trim()).filter(t => t);
    setForm({ ...form, tech });
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setUploadError('Only image files are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be under 5MB.');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const result = await uploadProjectImage(file, 'projects');
      if (result.success) {
        setForm({ ...form, img: result.data.url });
      } else {
        setUploadError(result.message || 'Upload failed. Try again.');
      }
    } catch (err) {
      setUploadError(err.message || 'Upload failed. Make sure backend & Cloudinary are configured.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

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

  const tabBtn = (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    background: active ? '#c8ff00' : 'var(--c-bg)',
    color: active ? '#0e0e0e' : 'var(--c-muted)',
    border: `1.5px solid ${active ? '#c8ff00' : 'var(--c-border)'}`,
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: 'Syne',
    fontWeight: 600,
    fontSize: '0.82rem',
    transition: 'all 0.2s'
  });

  return (
    <div style={{
      background: 'var(--c-surface)',
      padding: 'clamp(20px, 5vw, 28px)',
      borderRadius: '14px',
      marginBottom: '28px',
      border: '1px solid var(--c-border)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
        <h3 style={{ marginBottom: 0, fontFamily: 'Syne', fontWeight: 700, fontSize: 'clamp(1.1rem, 3vw, 1.3rem)' }}>
          {form.title ? '✏️ Edit Project' : '➕ Add New Project'}
        </h3>
        <button onClick={onCancel} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--c-muted)', padding: '4px', display: 'flex', alignItems: 'center' }}>
          <X size={24} />
        </button>
      </div>

      <div style={{ display: 'grid', gap: '18px', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}>
        {/* Title */}
        <div>
          <label style={labelStyle}>Project Title *</label>
          <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g., Uber Clone" style={inputStyle} />
        </div>

        {/* Emoji */}
        <div>
          <label style={labelStyle}>Emoji Badge</label>
          <input type="text" value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} placeholder="📦" maxLength="2" style={{ ...inputStyle, fontSize: 'clamp(1rem, 3vw, 1.3rem)', textAlign: 'center' }} />
        </div>

        {/* Description - Full Width */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Description *</label>
          <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Describe what this project does..." rows="3" style={{ ...inputStyle, resize: 'vertical', minHeight: '90px', fontFamily: 'inherit' }} />
        </div>

        {/* Tech Stack - Full Width */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Tech Stack (comma-separated)</label>
          <input
            type="text"
            value={techInput}
            onChange={handleTechInput}
            onBlur={handleTechBlur}
            placeholder="React, Node.js, MongoDB, Tailwind"
            style={inputStyle}
          />
        </div>

        {/* Demo URL */}
        <div>
          <label style={labelStyle}>Demo URL</label>
          <input type="url" value={form.demo} onChange={(e) => setForm({ ...form, demo: e.target.value })} placeholder="https://demo.example.com" style={inputStyle} />
        </div>

        {/* GitHub URL */}
        <div>
          <label style={labelStyle}>GitHub URL</label>
          <input type="url" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} placeholder="https://github.com/user/repo" style={inputStyle} />
        </div>

        {/* ── IMAGE SECTION ── Full Width */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Project Image *</label>

          {/* Toggle Tabs */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
            <button type="button" style={tabBtn(imgMode === 'url')} onClick={() => { setImgMode('url'); setUploadError(''); }}>
              <Link size={14} /> Direct URL
            </button>
            <button type="button" style={tabBtn(imgMode === 'upload')} onClick={() => { setImgMode('upload'); setUploadError(''); }}>
              <Upload size={14} /> Upload File
            </button>
          </div>

          {/* URL Mode */}
          {imgMode === 'url' && (
            <input
              type="url"
              value={form.img}
              onChange={(e) => setForm({ ...form, img: e.target.value })}
              placeholder="https://image.example.com/photo.jpg"
              style={inputStyle}
            />
          )}

          {/* Upload Mode */}
          {imgMode === 'upload' && (
            <div>
              <div
                onClick={() => !uploading && fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                style={{
                  border: `2px dashed ${dragOver ? '#c8ff00' : uploading ? '#666' : 'var(--c-border)'}`,
                  borderRadius: '10px',
                  padding: 'clamp(24px, 5vw, 36px) 20px',
                  textAlign: 'center',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  background: dragOver ? 'rgba(200,255,0,0.06)' : 'var(--c-bg)',
                  transition: 'all 0.2s',
                  opacity: uploading ? 0.7 : 1
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                />
                <Upload size={32} color={dragOver ? '#c8ff00' : 'var(--c-muted)'} style={{ marginBottom: '10px' }} />
                <p style={{ color: 'var(--c-muted)', fontSize: '0.9rem', margin: 0 }}>
                  {uploading ? '⏳ Uploading to Cloudinary...' : 'Click to browse or drag & drop'}
                </p>
                <p style={{ color: 'var(--c-muted)', fontSize: '0.75rem', marginTop: '6px', opacity: 0.6 }}>
                  JPEG, PNG, GIF, WebP · Max 5MB
                </p>
              </div>

              {/* Upload Error */}
              {uploadError && (
                <p style={{ color: '#ff6464', fontSize: '0.82rem', marginTop: '8px', fontWeight: 600 }}>
                  ⚠️ {uploadError}
                </p>
              )}
            </div>
          )}

          {/* Image Preview */}
          {form.img && !uploading && (
            <div style={{ marginTop: '14px', display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', background: 'var(--c-bg)', borderRadius: '10px', border: '1px solid var(--c-border)' }}>
              <img
                src={form.img}
                alt="Preview"
                onError={(e) => { e.target.style.display = 'none'; }}
                style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.78rem', color: '#c8ff00', fontWeight: 600, margin: '0 0 4px' }}>
                  <Image size={12} style={{ marginRight: '4px' }} />
                  Image set ✓
                </p>
                <p style={{ fontSize: '0.72rem', color: 'var(--c-muted)', margin: 0, overflowWrap: 'anywhere' }}>
                  {form.img}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setForm({ ...form, img: '' })}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--c-muted)', padding: '2px', flexShrink: 0 }}
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Accent Color */}
        <div>
          <label style={labelStyle}>Accent Color</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="color"
              value={form.accent}
              onChange={(e) => setForm({ ...form, accent: e.target.value })}
              style={{ width: '60px', height: '42px', padding: '4px', background: 'var(--c-bg)', border: '1.5px solid var(--c-border)', borderRadius: '8px', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '0.85rem', color: 'var(--c-muted)', fontFamily: 'monospace' }}>{form.accent}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginTop: 'clamp(20px, 5vw, 28px)', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button
          onClick={onCancel}
          disabled={saving || uploading}
          style={{
            padding: 'clamp(10px, 2vw, 12px) clamp(18px, 3vw, 24px)',
            background: 'transparent',
            border: '1.5px solid var(--c-border)',
            color: 'var(--c-text)',
            borderRadius: '8px',
            cursor: (saving || uploading) ? 'not-allowed' : 'pointer',
            fontFamily: 'Syne',
            fontWeight: 600,
            fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
            opacity: (saving || uploading) ? 0.5 : 1,
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => !(saving || uploading) && (e.currentTarget.style.background = 'var(--c-border)')}
          onMouseLeave={e => !(saving || uploading) && (e.currentTarget.style.background = 'transparent')}
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={saving || uploading}
          style={{
            padding: 'clamp(10px, 2vw, 12px) clamp(20px, 3vw, 28px)',
            background: (saving || uploading) ? '#999' : '#c8ff00',
            color: '#0e0e0e',
            border: 'none',
            borderRadius: '8px',
            cursor: (saving || uploading) ? 'not-allowed' : 'pointer',
            fontFamily: 'Syne',
            fontWeight: 600,
            fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={e => !(saving || uploading) && (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => !(saving || uploading) && (e.currentTarget.style.opacity = '1')}
        >
          {uploading ? '⏳ Uploading...' : saving ? '⏳ Saving...' : '💾 Save Project'}
        </button>
      </div>
    </div>
  );
};

export default ProjectForm;
