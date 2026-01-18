import React from 'react';

const Projects = () => {
    const projects = [
        {
            id: "findit_01",
            title: "Find it",
            desc: "A surveillance horror experience where players monitor security cameras to detect subtle environmental anomalies. Features a randomized event system with 4 distinct anomaly types (Move, Disappear, Color, Swap) and a high-stakes reporting mechanic.",
            tech: ["Unity", "C#", "Randomization Engine", "UI Systems"],
            href: "https://github.com/JulijaF02/FindIt"
        },
        {
            id: "food_order_02",
            title: "Food Order System",
            desc: "A full-featured WinForms management suite for restaurant operations. Implements custom CSV-based persistence, complex CRUD logic for menu hierarchies, and a robust administrative dashboard for real-time inventory and restaurant data.",
            tech: ["C#", ".NET", "WinForms", "CSV Persistence"],
            href: "https://github.com/JulijaF02/Food-order"
        }
    ];

    return (
        <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-32 lg:scroll-mt-24 font-mono">
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-950/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 text-sm font-bold uppercase tracking-widest text-teal-300 flex items-center gap-2 italic">
                <span className="w-4 h-[1px] bg-teal-500"></span>
                Projects
            </div>
            <div className="space-y-12">
                {projects.map((proj) => (
                    <div key={proj.id} className="border border-teal-500/20 bg-teal-500/5 p-6 rounded-lg relative overflow-hidden group/box hover:border-teal-500/40 transition-all">
                        <div className="absolute top-0 right-0 p-2 text-[8px] text-teal-500/30 uppercase font-black">id: {proj.id}</div>
                        <div className="relative z-10 sm:flex gap-6">
                            <div className="relative w-24 h-24 shrink-0 border border-teal-500/30 overflow-hidden bg-slate-900 group-hover/box:border-teal-400 transition-colors">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-500/20 opacity-40"></div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-40 uppercase text-[10px] font-black">[preview]</div>
                            </div>
                            <div className="font-sans">
                                <h3 className="font-black text-white uppercase italic text-xl tracking-tighter">
                                    {proj.href ? (
                                        <a href={proj.href} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors flex items-center gap-2">
                                            {proj.title}
                                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path>
                                            </svg>
                                        </a>
                                    ) : (
                                        proj.title
                                    )}
                                </h3>
                                <p className="mt-2 text-base text-slate-400 leading-snug tracking-tight">{proj.desc}</p>
                                <div className="mt-4 flex gap-2 font-mono">
                                    {proj.tech.map(t => <span key={t} className="text-[10px] text-teal-500 font-bold border-b border-teal-500/30">{t}</span>)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
