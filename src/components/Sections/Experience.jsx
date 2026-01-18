import React from 'react';

const Experience = () => {
    const jobs = [
        {
            date: "FEB 2025 — SEPT 2025",
            title: "Execution Coordinator @ Replai",
            desc: "Coordinated development cycles and delivery across multiple projects, while building Unity editor tools and automation to improve iteration speed and team productivity.",
            tech: ["Unity", "Editor Tooling", "Automation", "Workflow Optimization", "Coordination"]
        },
        {
            date: "FEB 2024 — FEB 2025",
            title: "Lead Unity Developer @ Replai",
            desc: "Architected and shipped multiple production-ready interactive games, focusing on gameplay systems, performance optimization, and fast iteration. Built internal tooling and supported team scaling in a fast-paced startup environment.",
            tech: ["Unity", "Gameplay Systems", "Core Architecture", "Performance", "Team Scaling"]
        },
        {
            date: "FEB 2023 — FEB 2024",
            title: "L2 Onsite Engineer @ Network & Plant",
            desc: "Provided hands-on technical support for hardware, software, and network issues, focusing on fast resolution and minimal downtime in a production environment.",
            tech: ["Technical Support", "Hardware", "Networking", "Downtime Optimization"]
        }
    ];

    return (
        <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-32 lg:scroll-mt-24 font-mono">
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-950/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 text-sm font-bold uppercase tracking-widest text-teal-300 flex items-center gap-2 italic">
                <span className="w-4 h-[1px] bg-teal-500"></span>
                Quest.Log
            </div>
            <ol className="group/list border-l border-teal-500/10 ml-1">
                {jobs.map((job, i) => (
                    <li key={i} className="mb-12 relative pl-8">
                        <div className="absolute left-0 top-1.5 w-3 h-3 border border-teal-500/40 bg-slate-950 -translate-x-1/2 rotate-45"></div>
                        <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                            <header className="z-10 mb-2 mt-1 text-[10px] font-bold uppercase tracking-widest text-teal-500/60 sm:col-span-2">{job.date}</header>
                            <div className="z-10 sm:col-span-6">
                                <h3 className="font-bold leading-tight text-white group-hover:text-teal-300 focus-visible:text-teal-300 uppercase tracking-tighter text-xl font-sans">{job.title}</h3>
                                <p className="mt-3 text-base leading-relaxed text-slate-300 italic">{job.desc}</p>
                                <ul className="mt-4 flex flex-wrap gap-2">
                                    {job.tech.map(t => <li key={t} className="px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase border border-teal-500/20 text-teal-400 bg-teal-500/5">{t}</li>)}
                                </ul>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
            <div className="mt-8 mb-16">
                <a href="https://www.dropbox.com/scl/fi/tfjgivup6aaawom324orl/Julija_Filipovic_CV.pdf?rlkey=yajtyi4e05utv42hfnrbteyts&st=e1hdu23e&dl=0" target="_blank" rel="noopener noreferrer" className="inline-block py-3 px-8 border border-teal-400/30 text-teal-300 font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-teal-400 hover:text-slate-950 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(45,212,191,0.1)]">
                    Load Full Resume
                </a>
            </div>
        </section>
    );
};

export default Experience;
