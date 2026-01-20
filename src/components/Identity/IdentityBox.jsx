import React from 'react';

const IdentityBox = ({ isGameActive, children }) => {
    return (
        <div className="relative mx-auto lg:mx-0 w-full max-w-sm sm:max-w-md border-2 border-teal-500/20 bg-slate-900/40 p-5 md:p-8 rounded-lg shadow-[0_0_40px_rgba(45,212,191,0.05)] overflow-hidden">
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-teal-400/40"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-teal-400/40"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-teal-400/40"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-teal-400/40"></div>

            <div className="relative z-10">
                <div className="mb-6 flex items-start gap-5">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 group/avatar shrink-0">
                        <div className="absolute inset-0 border border-teal-500/30 bg-slate-950 p-1.5">
                            <div className="relative w-full h-full overflow-hidden bg-slate-900 shadow-[inset_0_0_20px_rgba(45,212,191,0.2)]">
                                <img
                                    src="/PFP.jpg"
                                    alt="Julija Filipović"
                                    className="w-full h-full object-cover object-[50%_20%] scale-100 group-hover/avatar:scale-110 transition-transform duration-700 grayscale hover:grayscale-0 will-change-transform transform-gpu"
                                />
                            </div>
                        </div>
                        {/* Avatar HUD Details */}
                        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]"></div>
                        <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]"></div>
                    </div>

                    <div className="flex flex-row gap-4 pt-2 ml-auto">
                        <a href="https://github.com/JulijaF02" target="_blank" rel="noopener noreferrer" className="text-teal-400/60 hover:text-teal-300 transition-colors p-2 hover:bg-teal-500/10 border border-teal-500/20 rounded-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
                        </a>
                        <a href="https://www.linkedin.com/in/julija-filipovi%C4%87-658703249/" target="_blank" rel="noopener noreferrer" className="text-teal-400/60 hover:text-teal-300 transition-colors p-2 hover:bg-teal-500/10 border border-teal-500/20 rounded-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path></svg>
                        </a>
                    </div>
                </div>

                <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl uppercase italic leading-none">
                    <a href="/">Julija Filipović</a>
                </h1>
                <div className="mt-4 flex flex-col gap-2">
                    <h2 className="text-lg font-bold tracking-widest text-teal-300 sm:text-xl uppercase">
                        Software Engineer
                    </h2>
                </div>

                <div className="mt-8 space-y-6 font-mono">
                    {[
                        { label: "Backend & Langs", skills: ["C#", "SQL", ".NET Core", "EF Core"] },
                        { label: "Architecture", skills: ["Clean Arch", "CQRS", "SOLID", "Event Sourcing"] },
                        { label: "Tools", skills: ["Git", "Docker", "xUnit"] },
                        { label: "Web", skills: ["HTML5", "CSS3", "JavaScript"] }
                    ].map((group) => (
                        <div key={group.label} className="space-y-2">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-500/60">{group.label}</h3>
                            <div className="flex flex-wrap gap-2">
                                {group.skills.map((skill) => (
                                    <div
                                        key={skill}
                                        className="relative border border-teal-500/30 bg-teal-500/5 px-3 py-1.5 text-center text-[9px] font-bold uppercase tracking-widest text-teal-400 hover:bg-teal-500/20 hover:text-white transition-all group/skill cursor-default"
                                    >
                                        {skill}
                                        <span className="absolute top-0 right-0 w-1 h-1 bg-teal-400/50"></span>
                                        <span className="absolute bottom-0 left-0 w-1 h-1 bg-teal-400/50"></span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {children}
            </div>
        </div>
    );
};

export default IdentityBox;
