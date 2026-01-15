"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mouse HUD Tracker & Trail
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      setIsHovering(target.closest('a') || target.closest('button') || target.closest('.cursor-pointer'));

      // Create a "Targeting" trail - extended to 30 points for better streak effect
      const newPoint = { x: e.clientX, y: e.clientY, id: `${Date.now()}-${Math.random()}` };
      setTrail(prev => [...prev.slice(-30), newPoint]);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  // Trail Auto-Prune (Decays naturally when stationary)
  useEffect(() => {
    if (trail.length === 0) return;
    const timer = setTimeout(() => {
      setTrail(prev => prev.slice(1));
    }, 50);
    return () => clearTimeout(timer);
  }, [trail]);

  // Active Section Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "experience", "projects"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Calculate Scroll Progress
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="group/spotlight relative bg-slate-950 min-h-screen text-slate-300 font-mono overflow-x-hidden cursor-none">

      {/* SLEEK HUD PRECISION DOT CURSOR */}
      <div
        className={`pointer-events-none fixed z-50 flex items-center justify-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) translate(-50%, -50%)`,
          willChange: 'transform'
        }}
      >
        {/* Subtle Outer Frame (Glow Only) */}
        <div className="absolute w-10 h-10 border border-white/10 scale-90"></div>

        {/* The Primary Dot - Sleek & Precision (Scaled for 27" Monitor) */}
        <div className="relative w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1),_0_0_8px_rgba(255,255,255,0.8)]">
        </div>

        {/* Coordinates Display - Discrete White */}
        <div className={`absolute top-8 left-8 whitespace-nowrap text-[8px] font-bold text-white/40 tabular-nums tracking-widest uppercase transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {mousePos.x}::{mousePos.y}
        </div>
      </div>

      {/* High-Visibility Digital Trail (White) */}
      {trail.map((point, i) => (
        <div
          key={point.id}
          className="pointer-events-none fixed z-40 w-1.5 h-1.5 bg-white"
          style={{
            left: point.x,
            top: point.y,
            opacity: isVisible ? (i / trail.length) * 0.4 : 0,
            transform: `scale(${0.6 + (i / trail.length) * 0.4})`
          }}
        />
      ))}

      <div className="mx-auto max-w-screen-2xl px-6 font-sans md:px-12 lg:px-24">
        <div className="lg:flex lg:justify-between lg:gap-12">

          {/* LEFT COLUMN: FIXED */}
          <header className="lg:fixed lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:py-32 overflow-hidden pr-8">
            <div className="relative border-2 border-teal-500/20 bg-slate-900/40 p-8 md:p-10 rounded-lg shadow-[0_0_40px_rgba(45,212,191,0.05)] overflow-hidden max-w-xl">
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-teal-400/40"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-teal-400/40"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-teal-400/40"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-teal-400/40"></div>

              <div className="relative z-10">
                <h1 className="text-5xl font-bold tracking-tighter text-white sm:text-6xl uppercase italic">
                  <a href="/">Julija Filipović</a>
                </h1>
                <div className="mt-4 flex items-center gap-4">
                  <div className="w-3.5 h-3.5 bg-teal-400 rounded-full shadow-[0_0_15px_rgba(45,212,191,0.6)]"></div>
                  <h2 className="text-xl font-bold tracking-widest text-teal-300 sm:text-2xl uppercase">
                    Game Dev // Playables
                  </h2>
                </div>

                <p className="mt-6 text-slate-400 text-sm leading-relaxed max-w-sm lowercase">
                  [status: building interactive worlds] <br />
                  [hobby: cat enthusiast & plant guardian]
                </p>

                {/* Boxed Skills Grid */}
                <div className="mt-8 grid grid-cols-3 gap-2 max-w-sm">
                  {["C#", "Next.js", "HTML", "CSS", "Git", "PostgreSQL"].map((skill) => (
                    <div
                      key={skill}
                      className="relative border border-teal-500/30 bg-teal-500/5 px-2 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-teal-400 hover:bg-teal-500/20 hover:text-white transition-all group/skill cursor-default"
                    >
                      {skill}
                      <span className="absolute top-0 right-0 w-1 h-1 bg-teal-400/50"></span>
                      <span className="absolute bottom-0 left-0 w-1 h-1 bg-teal-400/50"></span>
                    </div>
                  ))}
                </div>

                <nav className="nav hidden lg:block" aria-label="In-page jump links">
                  <ul className="mt-16 w-max">
                    {["About", "Experience", "Projects"].map((item) => (
                      <li key={item} className="mb-4">
                        <a
                          className={`group flex items-center py-2 px-4 transition-all relative ${activeSection === item.toLowerCase()
                            ? "text-teal-300"
                            : "text-slate-500 hover:text-slate-200"
                            }`}
                          href={`#${item.toLowerCase()}`}
                        >
                          {activeSection === item.toLowerCase() && (
                            <span className="absolute inset-0 bg-teal-500/10 border-l-2 border-teal-400 box-content -left-px"></span>
                          )}
                          <span className="text-xs font-bold uppercase tracking-[0.2em] relative z-10">
                            {activeSection === item.toLowerCase() ? `// ${item}` : item}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* HUD SYSTEM SYNC */}
                <div className="mt-16 max-w-sm">
                  <div className="flex justify-between text-[10px] uppercase font-black text-teal-500/60 mb-2 tracking-[0.2em]">
                    <span>SYSTEM_SYNC</span>
                    <span>{Math.round(scrollProgress)}%</span>
                  </div>
                  <div className="h-2 w-full bg-teal-950/50 border border-teal-500/10 relative overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-teal-500 shadow-[0_0_15px_rgba(45,212,191,0.5)] transition-all duration-300"
                      style={{ width: `${scrollProgress}%` }}
                    ></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Social Icons with HUD style */}
            <div className="mt-12 flex gap-6 px-4">
              <a href="https://github.com/JulijaF02" target="_blank" className="text-slate-500 hover:text-teal-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-6 w-6" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
              </a>
              <a href="https://www.linkedin.com/in/julija-filipovi%C4%87-658703249/" target="_blank" className="text-slate-500 hover:text-teal-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path></svg>
              </a>
            </div>
          </header>

          {/* RIGHT COLUMN: CONTENT */}
          <main className="pt-24 lg:ml-[42%] lg:w-[58%] lg:py-32 lg:pl-16">

            {/* ABOUT */}
            <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24 group">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-950/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-teal-300 lg:sr-only flex items-center gap-2 italic">
                  <span className="w-4 h-[1px] bg-teal-500"></span>
                  System.Info
                </h2>
              </div>
              <div className="relative border-l border-teal-500/20 pl-6 py-2">
                <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-teal-500/40 -translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-teal-500/40 -translate-x-1/2"></div>

                <p className="mb-4 text-slate-400 lowercase">
                  [!] initialize: builder of interactive worlds.
                </p>
                <p className="mb-4 text-slate-400 leading-relaxed">
                  I&apos;ve always been drawn to how things work – from tree houses as a kid to tearing apart old phones just to see the circuitry inside. My dad introduced me to tech early, and I quickly found that <span className="text-teal-300 font-bold uppercase">games</span> were the ultimate engineering challenge.
                </p>
                <p className="mb-4 text-slate-400 leading-relaxed">
                  When I&apos;m not architecting game systems in <span className="text-slate-200 uppercase font-bold text-xs">Unity</span>, you&apos;ll usually find me tending to my growing <span className="text-green-500/60 font-bold uppercase text-xs">plant ecosystem</span> or negotiating with my <span className="text-orange-400/60 font-bold uppercase text-xs">cat</span> to stop knocking my mouse off the desk.
                </p>
                <p className="mb-4 text-slate-400 leading-relaxed">
                  Currently bridging the gap between high-performance game engines and the web. specialized in <span className="text-teal-300 underline underline-offset-4 decoration-teal-500/30 font-bold uppercase text-xs tracking-wider">Playable Ads</span> and webgl optimization.
                </p>
              </div>
            </section>

            {/* EXPERIENCE */}
            <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-950/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-teal-300 lg:sr-only flex items-center gap-2 italic">
                  <span className="w-4 h-[1px] bg-teal-500"></span>
                  Quest.Log
                </h2>
              </div>
              <div>
                <ol className="group/list border-l border-teal-500/10 ml-1">
                  {[
                    {
                      date: "2024 — 2025",
                      title: "LEAD UNITY DEVELOPER @ REPLAI",
                      desc: "Architected 3 production-ready games. Implemented Match 3 algorithms and physics simulations. scaled team from 4 to 20+.",
                      tech: ["Unity", "C#", "Team Lead", "Optimization"]
                    },
                    {
                      date: "2023 — 2024",
                      title: "EXECUTION COORDINATOR @ REPLAI",
                      desc: "Directed development cycles. Automated workflows with custom Unity Editor scripts, boosting velocity by 35%.",
                      tech: ["UI/UX", "Editor Scripting", "Automation"]
                    }
                  ].map((job, i) => (
                    <li key={i} className="mb-12 relative pl-8">
                      <div className="absolute left-0 top-1.5 w-3 h-3 border border-teal-500/40 bg-slate-950 -translate-x-1/2 rotate-45"></div>
                      <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        <header className="z-10 mb-2 mt-1 text-[10px] font-bold uppercase tracking-widest text-teal-500/60 sm:col-span-2">
                          {job.date}
                        </header>
                        <div className="z-10 sm:col-span-6">
                          <h3 className="font-bold leading-tight text-white group-hover:text-teal-300 focus-visible:text-teal-300 uppercase tracking-tighter text-xl">
                            {job.title}
                          </h3>
                          <p className="mt-3 text-base leading-relaxed text-slate-300 lowercase italic">
                            {job.desc}
                          </p>
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {job.tech.map(t => (
                              <li key={t} className="px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase border border-teal-500/20 text-teal-400 bg-teal-500/5">
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* PROJECTS */}
            <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24 min-h-[60vh]">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-950/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-teal-300 lg:sr-only flex items-center gap-2 italic">
                  <span className="w-4 h-[1px] bg-teal-500"></span>
                  Playables.Bin
                </h2>
              </div>

              <div className="space-y-12">
                <div className="border border-teal-500/20 bg-teal-500/5 p-6 rounded-lg relative overflow-hidden group/box">
                  <div className="absolute top-0 right-0 p-2 text-[8px] text-teal-500/30 uppercase font-black">
                    id: farm_rush_01
                  </div>

                  <div className="relative z-10 sm:flex gap-6">
                    <div className="relative w-24 h-24 shrink-0 border border-teal-500/30 overflow-hidden bg-slate-900 group-hover/box:border-teal-400 transition-colors">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-500/20"></div>
                      <img src="/demos/farmrush_thumb.png" alt="preview" className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover/box:grayscale-0 group-hover/box:opacity-100 transition-all scale-110 group-hover/box:scale-100" />
                    </div>
                    <div>
                      <h3 className="font-black text-white uppercase italic text-xl tracking-tighter">
                        <a href="/demos/playable_demo.html" target="_blank" className="hover:text-teal-400 transition-colors flex items-center gap-2">
                          Farm Rush 3D
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path></svg>
                        </a>
                      </h3>
                      <p className="mt-2 text-base text-slate-400 leading-snug lowercase">
                        lightweight 3D ad built with Three.js. click-to-move, webgl texture optimization, low-memory footprints.
                      </p>
                      <div className="mt-4 flex gap-2">
                        {["Three.js", "WebGL", "JS"].map(t => <span key={t} className="text-[10px] text-teal-500 font-bold border-b border-teal-500/30">{t}</span>)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-teal-500/20 bg-teal-500/5 p-6 rounded-lg relative overflow-hidden group/box hover:border-teal-400/40 transition-all">
                  <div className="absolute top-0 right-0 p-2 text-[8px] text-teal-500/30 uppercase font-black">
                    id: match3_core_02
                  </div>

                  <div className="relative z-10 sm:flex gap-6">
                    <div className="relative w-24 h-24 shrink-0 border border-teal-500/20 overflow-hidden bg-slate-900 flex items-center justify-center group-hover/box:border-teal-400/50 transition-colors">
                      <span className="text-teal-500/40 text-[10px] uppercase font-black tracking-tighter animate-pulse">[loading]</span>
                    </div>
                    <div>
                      <h3 className="font-black text-white uppercase italic text-xl tracking-tighter">
                        Match 3 Engine Core
                      </h3>
                      <p className="mt-2 text-base text-slate-400 leading-snug lowercase">
                        Custom pattern-matching algorithms for playable ads. Built to handle 60fps on low-end mobile browsers.
                      </p>
                      <div className="mt-4 flex gap-2">
                        {["C#", "Algorithm", "Optimization"].map(t => <span key={t} className="text-[10px] text-teal-500 font-bold border-b border-teal-500/30">{t}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center pb-32">
                <a href="https://www.dropbox.com/scl/fi/tfjgivup6aaawom324orl/Julija_Filipovic_CV.pdf?rlkey=yajtyi4e05utv42hfnrbteyts&st=e1hdu23e&dl=0" className="inline-block py-3 px-8 border-2 border-teal-400/50 text-teal-300 font-black uppercase text-xs tracking-widest hover:bg-teal-400 hover:text-slate-950 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(45,212,191,0.1)]">
                  Load Full Résumé
                </a>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* Footer Text */}
      <footer className="text-center text-slate-600 pb-12 text-[10px] uppercase tracking-[0.4em] opacity-30">
        <p>Built with Next.js // fueled by cat logic & plant photosynthesis</p>
      </footer>
    </div >
  );
}
