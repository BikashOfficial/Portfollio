import React, { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import ProjectForm from '../components/MySpaceAdmin/ProjectForm';
import SkillForm from '../components/MySpaceAdmin/SkillForm';
import ProjectList from '../components/MySpaceAdmin/ProjectList';
import SkillsList from '../components/MySpaceAdmin/SkillsList';
import { getProjects, updateProjects } from '../services/projectService';
import { getSkills, updateSkills } from '../services/skillService';
import { healthCheck } from '../services/commonService';

const API_KEY = 'your-secret-admin-key'; // Change this to your actual API key

const MySpace = () => {
    const [activeTab, setActiveTab] = useState('projects');
    const projectFormRef = useRef(null);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [editingProject, setEditingProject] = useState(null);
    const [editingSkill, setEditingSkill] = useState(null);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showSkillForm, setShowSkillForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(0);
    const [error, setError] = useState('');
    const [serverOnline, setServerOnline] = useState(null); // null = checking

    const [projectForm, setProjectForm] = useState({
        title: '',
        desc: '',
        tech: [],
        demo: '',
        github: '',
        img: '',
        accent: '#c8ff00',
        emoji: '📦'
    });

    const [skillForm, setSkillForm] = useState({
        name: '',
        icon: '🔧'
    });

    // Fetch data on mount
    useEffect(() => {
        // Store admin key in localStorage for axios interceptor
        localStorage.setItem('adminKey', API_KEY);
        // Check server health
        healthCheck()
            .then(() => setServerOnline(true))
            .catch(() => setServerOnline(false));
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError('');
            
            // Try to fetch from database first
            try {
              const projectsResult = await getProjects();
                const skillsResult = await getSkills();
                
                if (projectsResult.success && projectsResult.data) {
                    setProjects(projectsResult.data);
                }
                if (skillsResult.success && skillsResult.data) {
                    setSkills(skillsResult.data);
                }
            } catch (apiError) {
              // Fallback to local data files if API fails
                console.log('Falling back to local data files...');
                try {
                    const projectsModule = await import('../data/projects');
                    const skillsModule = await import('../data/skills');

                    setProjects(projectsModule.PROJECTS || []);
                    setSkills(skillsModule.SKILL_GROUPS || []);
                } catch (localError) {
                    setError('Failed to load data. Check server connection.');
                    console.error('Local data fetch error:', localError);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error loading data');
        } finally {
            setLoading(false);
        }
    };

    // Project handlers
    const handleAddProject = () => {
        setProjectForm({
            title: '',
            desc: '',
            tech: [],
            demo: '',
            github: '',
            img: '',
            accent: '#c8ff00',
            emoji: '📦'
        });
        setEditingProject(null);
        setShowProjectForm(true);
    };

    const handleEditProject = (index) => {
        setProjectForm({ ...projects[index] });
        setEditingProject(index);
        setShowProjectForm(true);
        // Scroll to form after React renders it
        setTimeout(() => {
            projectFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    };

    const handleDeleteProject = async (index) => {
        toast((t) => (
            <span style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span>Delete this project?</span>
                <span style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={async () => { toast.dismiss(t.id); const updated = projects.filter((_, i) => i !== index); await saveProjects(updated); }}
                        style={{ padding: '4px 12px', background: '#ff4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                    >Delete</button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        style={{ padding: '4px 12px', background: '#333', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                    >Cancel</button>
                </span>
            </span>
        ), { duration: 8000 });
    };

    const handleSaveProject = async () => {
        if (!projectForm.title || !projectForm.desc) {
            toast.error('Please fill in title and description');
            return;
        }

        let updatedProjects;
        if (editingProject !== null) {
            updatedProjects = [...projects];
            updatedProjects[editingProject] = projectForm;
        } else {
            updatedProjects = [...projects, projectForm];
        }

        await saveProjects(updatedProjects);
        if (!saving) {
            setShowProjectForm(false);
        }
    };

    const saveProjects = async (updatedProjects) => {
        try {
            setSaving(true);
            setError('');
            const result = await updateProjects(updatedProjects);

            if (result.success) {
                setProjects(updatedProjects);
                setError('');
                toast.success('Projects saved successfully!');
            } else {
                setError(result.message || 'Failed to save projects');
                toast.error(result.message || 'Failed to save projects');
            }
        } catch (error) {
            console.error('Error saving projects:', error);
            const errorMessage = error.message || 'Error saving projects. Make sure backend is running.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setSaving(false);
        }
    };

    // Skill handlers
    const handleAddSkill = () => {
        setSkillForm({ name: '', icon: '🔧' });
        setEditingSkill(null);
        setShowSkillForm(true);
    };

    const handleEditSkill = (groupIndex, skillIndex) => {
        setSkillForm({ ...skills[groupIndex].skills[skillIndex] });
        setEditingSkill({ groupIndex, skillIndex });
        setShowSkillForm(true);
    };

    const handleDeleteSkill = async (groupIndex, skillIndex) => {
        toast((t) => (
            <span style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span>Delete this skill?</span>
                <span style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={async () => { toast.dismiss(t.id); const updated = [...skills]; updated[groupIndex].skills = updated[groupIndex].skills.filter((_, i) => i !== skillIndex); await saveSkills(updated); }}
                        style={{ padding: '4px 12px', background: '#ff4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                    >Delete</button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        style={{ padding: '4px 12px', background: '#333', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                    >Cancel</button>
                </span>
            </span>
        ), { duration: 8000 });
    };

    const handleSaveSkill = async () => {
        if (!skillForm.name) {
            toast.error('Please enter skill name');
            return;
        }

        let updatedSkills;
        if (editingSkill !== null) {
            updatedSkills = [...skills];
            updatedSkills[editingSkill.groupIndex].skills[editingSkill.skillIndex] = skillForm;
        } else {
            updatedSkills = [...skills];
            updatedSkills[selectedGroup].skills.push(skillForm);
        }

        await saveSkills(updatedSkills);
        if (!saving) {
            setShowSkillForm(false);
        }
    };

    const saveSkills = async (updatedSkills) => {
        try {
            setSaving(true);
            setError('');
            const result = await updateSkills(updatedSkills);

            if (result.success) {
                setSkills(updatedSkills);
                setError('');
                toast.success('Skills saved successfully!');
            } else {
                setError(result.message || 'Failed to save skills');
                toast.error(result.message || 'Failed to save skills');
            }
        } catch (error) {
            console.error('Error saving skills:', error);
            const errorMessage = error.message || 'Error saving skills. Make sure backend is running.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--c-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-text)' }}>
                <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: 'var(--c-muted)' }}>Loading...</p>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--c-bg)', padding: 'clamp(20px, 5vw, 50px) clamp(16px, 4vw, 40px)', color: 'var(--c-text)' }}>
            {/* Server status banner */}
            {serverOnline === false && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
                    background: '#ff4444', color: '#fff', textAlign: 'center',
                    padding: '10px 16px', fontSize: '0.88rem', fontWeight: 600,
                    letterSpacing: '0.3px'
                }}>
                    ⚠️ Backend server is offline — changes won't be saved. Start the server and refresh.
                </div>
            )}
            <div style={{ maxWidth: 1400, margin: serverOnline === false ? '44px auto 0' : '0 auto' }}>
                {/* Header */}
                <div style={{ marginBottom: 'clamp(30px, 6vw, 50px)', paddingBottom: 'clamp(20px, 4vw, 30px)', borderBottom: '2px solid var(--c-border)' }}>
                    <h1 style={{ fontFamily: 'Syne', fontSize: 'clamp(2.2rem, 6vw, 3rem)', fontWeight: 800, marginBottom: 8 }}>
                        🚀 MySpace Admin
                    </h1>
                    <p style={{ color: 'var(--c-muted)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', margin: 0 }}>
                        Manage and organize your portfolio content with ease
                    </p>
                    {error && (
                        <div style={{
                            marginTop: '16px',
                            padding: '12px 16px',
                            background: 'rgba(255, 100, 100, 0.1)',
                            border: '1px solid rgba(255, 100, 100, 0.3)',
                            borderRadius: '8px',
                            color: '#ff6464',
                            fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)'
                        }}>
                            ⚠️ {error}
                        </div>
                    )}
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: 'clamp(8px, 2vw, 16px)', marginBottom: 'clamp(24px, 4vw, 40px)', borderBottom: '2px solid var(--c-border)', overflowX: 'auto', paddingBottom: '12px' }}>
                    <button
                        onClick={() => setActiveTab('projects')}
                        style={{
                            padding: 'clamp(10px, 2vw, 14px) clamp(16px, 3vw, 24px)',
                            background: activeTab === 'projects' ? 'var(--c-surface)' : 'transparent',
                            border: `2px solid ${activeTab === 'projects' ? '#c8ff00' : 'transparent'}`,
                            color: activeTab === 'projects' ? '#c8ff00' : 'var(--c-muted)',
                            fontFamily: 'Syne',
                            fontWeight: 700,
                            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                            borderRadius: 10,
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            whiteSpace: 'nowrap',
                            flexShrink: 0
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        📁 Projects
                    </button>
                    <button
                        onClick={() => setActiveTab('skills')}
                        style={{
                            padding: 'clamp(10px, 2vw, 14px) clamp(16px, 3vw, 24px)',
                            background: activeTab === 'skills' ? 'var(--c-surface)' : 'transparent',
                            border: `2px solid ${activeTab === 'skills' ? '#c8ff00' : 'transparent'}`,
                            color: activeTab === 'skills' ? '#c8ff00' : 'var(--c-muted)',
                            fontFamily: 'Syne',
                            fontWeight: 700,
                            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                            borderRadius: 10,
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            whiteSpace: 'nowrap',
                            flexShrink: 0
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        🎯 Skills
                    </button>
                </div>

                {/* Projects Tab */}
                {activeTab === 'projects' && (
                    <div>
                        <button
                            onClick={handleAddProject}
                            disabled={saving}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 'clamp(6px, 1vw, 12px)',
                                padding: 'clamp(11px, 2vw, 14px) clamp(18px, 3vw, 28px)',
                                background: saving ? '#888' : '#c8ff00',
                                color: '#0e0e0e',
                                fontFamily: 'Syne',
                                fontWeight: 700,
                                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                                border: 'none',
                                borderRadius: 10,
                                cursor: saving ? 'not-allowed' : 'pointer',
                                marginBottom: 'clamp(20px, 4vw, 28px)',
                                transition: 'all 0.3s',
                                opacity: saving ? 0.6 : 1
                            }}
                            onMouseEnter={e => !saving && (e.currentTarget.style.transform = 'translateY(-2px)')}
                            onMouseLeave={e => !saving && (e.currentTarget.style.transform = 'translateY(0)')}
                        >
                            <Plus size={20} /> Add Project
                        </button>

                        {showProjectForm && (
                            <div ref={projectFormRef}>
                                <ProjectForm
                                    form={projectForm}
                                    setForm={setProjectForm}
                                    onSave={handleSaveProject}
                                    onCancel={() => setShowProjectForm(false)}
                                    saving={saving}
                                />
                            </div>
                        )}

                        <ProjectList
                            projects={projects}
                            onEdit={handleEditProject}
                            onDelete={handleDeleteProject}
                            saving={saving}
                        />
                    </div>
                )}

                {/* Skills Tab */}
                {activeTab === 'skills' && (
                    <div>
                        <div style={{ marginBottom: 'clamp(20px, 4vw, 28px)', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'clamp(8px, 2vw, 12px)', maxWidth: '320px' }}>
                            <label style={{ display: 'block', fontWeight: 600, fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', color: 'var(--c-muted)' }}>
                                📂 Add Skill to Group
                            </label>
                            <select
                                value={selectedGroup}
                                onChange={(e) => setSelectedGroup(Number(e.target.value))}
                                style={{
                                    padding: 'clamp(10px, 2vw, 12px)',
                                    background: 'var(--c-surface)',
                                    border: '1.5px solid var(--c-border)',
                                    borderRadius: 8,
                                    color: 'var(--c-text)',
                                    fontFamily: 'Syne',
                                    fontWeight: 600,
                                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {skills.map((group, index) => (
                                    <option key={index} value={index}>
                                        {group.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={handleAddSkill}
                            disabled={saving}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 'clamp(6px, 1vw, 12px)',
                                padding: 'clamp(11px, 2vw, 14px) clamp(18px, 3vw, 28px)',
                                background: saving ? '#888' : '#c8ff00',
                                color: '#0e0e0e',
                                fontFamily: 'Syne',
                                fontWeight: 700,
                                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                                border: 'none',
                                borderRadius: 10,
                                cursor: saving ? 'not-allowed' : 'pointer',
                                marginBottom: 'clamp(20px, 4vw, 28px)',
                                transition: 'all 0.3s',
                                opacity: saving ? 0.6 : 1
                            }}
                            onMouseEnter={e => !saving && (e.currentTarget.style.transform = 'translateY(-2px)')}
                            onMouseLeave={e => !saving && (e.currentTarget.style.transform = 'translateY(0)')}
                        >
                            <Plus size={20} /> Add Skill
                        </button>

                        {showSkillForm && (
                            <SkillForm
                                form={skillForm}
                                setForm={setSkillForm}
                                onSave={handleSaveSkill}
                                onCancel={() => setShowSkillForm(false)}
                                saving={saving}
                            />
                        )}

                        <SkillsList
                            skills={skills}
                            onEdit={handleEditSkill}
                            onDelete={handleDeleteSkill}
                            saving={saving}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
export default MySpace;
