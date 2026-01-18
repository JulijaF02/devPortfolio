import React from 'react';

const Cursor = ({ mousePos, isVisible, trail, isHovering }) => {
    return (
        <>
            <div
                className={`pointer-events-none fixed z-[20000] flex items-center justify-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    left: 0,
                    top: 0,
                    transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) translate(-50%, -50%)`,
                    willChange: 'transform'
                }}
            >
                <div className={`relative w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1),_0_0_8px_rgba(255,255,255,0.8)] transition-transform duration-300 ${isHovering ? 'scale-150' : 'scale-100'}`}>
                </div>
            </div>

            {isVisible && trail.map((point, i) => (
                <div
                    key={point.id}
                    className="pointer-events-none fixed z-[19999] w-1.5 h-1.5 bg-white"
                    style={{
                        left: point.x,
                        top: point.y,
                        opacity: (i / trail.length) * 0.4,
                        transform: `scale(${0.6 + (i / trail.length) * 0.4})`
                    }}
                />
            ))}
        </>
    );
};

export default Cursor;
