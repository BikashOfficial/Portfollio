import React, { useState, useRef } from 'react';
import { Lock, AlertCircle } from 'lucide-react';
import MySpace from '../pages/MySpace';
import { verifyAccessCode } from '../services/authService';

const AccessCodeGate = () => {
    const [code, setCode] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [error, setError] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [loading, setLoading] = useState(false);
    const audioContextRef = useRef(null);

    const playWarningSound = () => {
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }
            const ctx = audioContextRef.current;
            const now = ctx.currentTime;

            // Create beep sound
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.frequency.setValueAtTime(800, now);
            osc.frequency.setValueAtTime(600, now + 0.1);

            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

            osc.start(now);
            osc.stop(now + 0.2);
        } catch (e) {
            console.log('Audio context not available');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            console.log(code);
            const result = await verifyAccessCode(code);
            console.log("result", result);

            if (result.success) {
                setIsUnlocked(true);
                setCode('');
                setError('');
                setAttempts(0);
            } else {
                setError('❌ ' + (result.message || 'Incorrect access code. Try again.'));
                setCode('');
                setAttempts(attempts + 1);
                playWarningSound();

                setTimeout(() => {
                    setError('');
                }, 3000);
            }
        } catch (err) {
            setError('❌ Error verifying code. Check server connection.');
            setCode('');
            setAttempts(attempts + 1);
            playWarningSound();

            setTimeout(() => {
                setError('');
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    if (isUnlocked) {
        return <MySpace />;
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--c-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated background elements */}
            <div style={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(200, 255, 0, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                top: '-100px',
                left: '-100px',
                pointerEvents: 'none'
            }}></div>
            <div style={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(200, 255, 0, 0.05) 0%, transparent 70%)',
                borderRadius: '50%',
                bottom: '-150px',
                right: '-100px',
                pointerEvents: 'none'
            }}></div>

            {/* Main container */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                maxWidth: '500px',
                width: '100%'
            }}>
                {/* Card */}
                <div style={{
                    background: 'var(--c-surface)',
                    border: '2px solid var(--c-border)',
                    borderRadius: '16px',
                    padding: 'clamp(30px, 5vw, 50px)',
                    boxShadow: '0 20px 60px rgba(200, 255, 0, 0.1), 0 0 30px rgba(200, 255, 0, 0.05)',
                    backdropFilter: 'blur(10px)',
                    animation: 'slideUp 0.6s ease-out'
                }}>
                    {/* Lock Icon */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '30px'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #c8ff00 0%, rgba(200, 255, 0, 0.3) 100%)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 20px rgba(200, 255, 0, 0.3)',
                            animation: 'pulse 2s ease-in-out infinite'
                        }}>
                            <Lock size={40} color="#0e0e0e" strokeWidth={2.5} />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 style={{
                        fontFamily: 'Syne',
                        fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
                        fontWeight: 800,
                        textAlign: 'center',
                        marginBottom: '12px',
                        color: 'var(--c-text)'
                    }}>
                        MySpace Access
                    </h1>

                    {/* Subtitle */}
                    <p style={{
                        textAlign: 'center',
                        color: 'var(--c-muted)',
                        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                        marginBottom: '32px',
                        lineHeight: '1.6'
                    }}>
                        This is a secure admin area. Please enter the access code to continue.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Input */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                color: 'var(--c-muted)',
                                marginBottom: '8px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                Access Code
                            </label>
                            <input
                                type="password"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Enter code..."
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: 'clamp(12px, 2vw, 14px) 14px',
                                    background: 'var(--c-bg)',
                                    border: error ? '2px solid #ff4444' : '2px solid var(--c-border)',
                                    borderRadius: '10px',
                                    color: 'var(--c-text)',
                                    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                                    fontFamily: 'monospace',
                                    letterSpacing: '3px',
                                    transition: 'all 0.3s ease',
                                    boxSizing: 'border-box',
                                    outline: 'none',
                                    opacity: loading ? 0.6 : 1,
                                    cursor: loading ? 'not-allowed' : 'text'
                                }}
                                onFocus={(e) => {
                                    if (!error && !loading) {
                                        e.target.style.borderColor = '#c8ff00';
                                        e.target.style.boxShadow = '0 0 15px rgba(200, 255, 0, 0.3)';
                                    }
                                }}
                                onBlur={(e) => {
                                    if (!error) {
                                        e.target.style.borderColor = 'var(--c-border)';
                                        e.target.style.boxShadow = 'none';
                                    }
                                }}
                                autoFocus
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '12px 14px',
                                background: 'rgba(255, 68, 68, 0.1)',
                                border: '1.5px solid #ff4444',
                                borderRadius: '8px',
                                animation: 'shake 0.4s ease-in-out'
                            }}>
                                <AlertCircle size={18} color="#ff4444" strokeWidth={2.5} />
                                <span style={{
                                    color: '#ff6666',
                                    fontWeight: 600,
                                    fontSize: '0.9rem'
                                }}>
                                    {error}
                                </span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={code.length === 0 || loading}
                            style={{
                                padding: 'clamp(12px, 2vw, 14px)',
                                background: code.length === 0 || loading ? 'rgba(200, 255, 0, 0.3)' : '#c8ff00',
                                color: '#0e0e0e',
                                border: 'none',
                                borderRadius: '10px',
                                fontFamily: 'Syne',
                                fontWeight: 700,
                                fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                                cursor: code.length === 0 || loading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                marginTop: '8px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                boxShadow: code.length > 0 && !loading ? '0 10px 30px rgba(200, 255, 0, 0.3)' : 'none',
                                opacity: loading ? 0.7 : 1
                            }}
                            onMouseEnter={(e) => {
                                if (code.length > 0 && !loading) {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 15px 40px rgba(200, 255, 0, 0.4)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (code.length > 0 && !loading) {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 10px 30px rgba(200, 255, 0, 0.3)';
                                }
                            }}
                        >
                            {loading ? '🔄 Verifying...' : '🔓 Unlock Access'}
                        </button>
                    </form>

                    {/* Attempts counter */}
                    {attempts > 0 && (
                        <p style={{
                            textAlign: 'center',
                            color: 'var(--c-muted)',
                            fontSize: '0.8rem',
                            marginTop: '16px',
                            opacity: 0.7
                        }}>
                            Attempts: {attempts}
                        </p>
                    )}

                    {/* Security indicator */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        marginTop: '24px',
                        padding: '12px',
                        background: 'rgba(200, 255, 0, 0.05)',
                        borderRadius: '8px'
                    }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            background: '#00ff00',
                            borderRadius: '50%',
                            boxShadow: '0 0 8px #00ff00',
                            animation: 'pulse 1.5s ease-in-out infinite'
                        }}></div>
                        <span style={{
                            fontSize: '0.75rem',
                            color: 'var(--c-muted)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            fontWeight: 600
                        }}>
                            Secure Connection
                        </span>
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.6;
                    }
                }

                @keyframes shake {
                    0%, 100% {
                        transform: translateX(0);
                    }
                    25% {
                        transform: translateX(-5px);
                    }
                    75% {
                        transform: translateX(5px);
                    }
                }
            `}</style>
        </div>
    );
};

export default AccessCodeGate;
