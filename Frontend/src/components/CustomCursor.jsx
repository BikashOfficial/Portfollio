import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [trailPositions, setTrailPositions] = useState([]);
    const positionRef = useRef({ x: 0, y: 0 });
    const timeoutRef = useRef(null);
    const hideTimeoutRef = useRef(null);

    useEffect(() => {
        // Hide default cursor on desktop only
        if (window.innerWidth >= 768) {
            document.body.style.cursor = 'none';
        }

        const handleMouseMove = (e) => {
            positionRef.current = { x: e.clientX, y: e.clientY };
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);

            // Create trail effect
            setTrailPositions((prev) => {
                const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() + Math.random() }];
                return newTrail.slice(-8); // Keep last 8 positions for trail
            });

            // Clear existing timeouts
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

            // Clear trail after 1 second of no movement
            timeoutRef.current = setTimeout(() => {
                setTrailPositions([]);
            }, 1000);

            // Hide cursor after 3 seconds of no movement
            hideTimeoutRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 1000);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
            setTrailPositions([]);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.body.style.cursor = 'auto';
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        };
    }, []);

    const handleResize = () => {
        if (window.innerWidth < 768) {
            document.body.style.cursor = 'auto';
            setIsVisible(false);
        } else {
            document.body.style.cursor = 'none';
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!isVisible || window.innerWidth < 768) return null;

    return (
        <>
            {/* Trail bubbles */}
            {trailPositions.map((trail, index) => {
                const opacity = (index + 1) / trailPositions.length * 0.4;
                const size = 8 + ((index + 1) / trailPositions.length) * 6;
                return (
                    <div
                        key={trail.id}
                        style={{
                            position: 'fixed',
                            left: `${trail.x}px`,
                            top: `${trail.y}px`,
                            width: `${size}px`,
                            height: `${size}px`,
                            background: `radial-gradient(circle at 30% 30%, rgba(200, 255, 0, 0.8), rgba(200, 255, 0, 0.2))`,
                            borderRadius: '50%',
                            pointerEvents: 'none',
                            zIndex: 9999,
                            transform: 'translate(-50%, -50%)',
                            boxShadow: `0 0 ${size}px rgba(200, 255, 0, ${opacity * 1.5})`,
                            opacity: opacity,
                        }}
                    />
                );
            })}

            {/* Main cursor bubble */}
            <div
                ref={cursorRef}
                style={{
                    position: 'fixed',
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    width: '24px',
                    height: '24px',
                    background: `radial-gradient(circle at 30% 30%, rgba(200, 255, 0, 1), rgba(200, 255, 0, 0.6))`,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 10000,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: `
            0 0 20px rgba(200, 255, 0, 0.9),
            0 0 40px rgba(200, 255, 0, 0.5),
            inset -2px -2px 4px rgba(0, 0, 0, 0.3)
          `,
                }}
            />
        </>
    );
};

export default CustomCursor;
