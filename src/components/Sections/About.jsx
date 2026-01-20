import React from 'react';

const About = () => {
    return (
        <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-32 lg:scroll-mt-24 group">
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-950/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 text-sm font-bold uppercase tracking-widest text-teal-300 flex items-center gap-2 italic font-mono">
                <span className="w-4 h-[1px] bg-teal-500"></span>
                About
            </div>
            <div className="relative border-l border-teal-500/20 pl-6 py-2">
                <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-teal-500/40 -translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-teal-500/40 -translate-x-1/2"></div>
                <div className="space-y-4 text-slate-400 leading-relaxed md:text-lg">
                    <p>
                        I’m a <span className="text-teal-300 font-bold uppercase">software engineer</span> with a background in game development. Most of my professional experience comes from building and shipping production-ready games, where performance, clear systems, and fast iteration really matter.
                    </p>
                    <p>
                        Along the way, I spent a lot of time working on internal tools and automation, which pushed me to care deeply about code structure, maintainability, and long-term clarity.
                    </p>
                    <p>
                        Over time, my interests have shifted more toward <span className="text-slate-200">backend and full-stack development</span>. I enjoy working on APIs, data models, and system architecture, and applying the same problem-solving mindset I developed in games to more general software systems.
                    </p>
                    <p>
                        Outside of work, you can usually find me climbing, playing video games, spending time with my cats, or tending to a growing collection of plants.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
