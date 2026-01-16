"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import * as THREE from "three";

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);

  // Mouse HUD Tracker & Trail
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      setIsHovering(target.closest('a') || target.closest('button') || target.closest('.cursor-pointer'));

      const newPoint = { x: e.clientX, y: e.clientY, id: `${Date.now()}-${Math.random()}` };
      setTrail(prev => [...prev.slice(-30), newPoint]);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrail([]);
    };
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

  // Trail Auto-Prune
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
      const sections = ["about", "experience", "projects", "labs"];
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

      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`group/spotlight relative bg-slate-950 min-h-screen text-slate-300 font-mono overflow-x-hidden ${isGameActive ? '' : 'cursor-none'}`}>

      {/* SLEEK HUD PRECISION DOT CURSOR */}
      {!isGameActive && (
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
      )}

      <div className="mx-auto max-w-screen-2xl px-6 font-sans md:px-12 lg:px-24">
        <div className="lg:flex lg:justify-between lg:gap-12">

          {/* LEFT COLUMN: FIXED */}
          <header className={`pt-20 lg:fixed lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:py-32 overflow-hidden pr-8 transition-all duration-700 ${isGameActive ? 'blur-2xl scale-90 opacity-0 pointer-events-none' : 'blur-0 scale-100 opacity-100'}`}>
            <div className="relative border-2 border-teal-500/20 bg-slate-900/40 p-8 md:p-10 rounded-lg shadow-[0_0_40px_rgba(45,212,191,0.05)] overflow-hidden max-w-xl">
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-teal-400/40"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-teal-400/40"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-teal-400/40"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-teal-400/40"></div>

              <div className="relative z-10">
                <div className="mb-8 relative w-24 h-24 sm:w-32 sm:h-32 group/avatar">
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

                <h1 className="text-5xl font-bold tracking-tighter text-white sm:text-6xl uppercase italic">
                  <a href="/">Julija Filipović</a>
                </h1>
                <div className="mt-4 flex items-center gap-4">
                  <div className="w-3.5 h-3.5 bg-teal-400 rounded-full shadow-[0_0_15px_rgba(45,212,191,0.6)]"></div>
                  <h2 className="text-xl font-bold tracking-widest text-teal-300 sm:text-2xl uppercase">
                    Game Dev // Playables
                  </h2>
                </div>

                <p className="mt-6 text-slate-400 text-sm leading-relaxed max-w-sm lowercase font-mono">
                  [status: building interactive worlds] <br />
                  [hobby: cat enthusiast & plant guardian]
                </p>

                <div className="mt-8 grid grid-cols-3 gap-2 max-w-sm font-mono">
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
                  <ul className="mt-16 w-max font-mono">
                    {["About", "Experience", "Projects", "Labs"].map((item) => (
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
              </div>
            </div>

            <div className="mt-12 flex gap-6 px-4">
              <a href="https://github.com/JulijaF02" target="_blank" className="text-slate-500 hover:text-teal-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-6 w-6"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
              </a>
              <a href="https://www.linkedin.com/in/julija-filipovi%C4%87-658703249/" target="_blank" className="text-slate-500 hover:text-teal-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path></svg>
              </a>
            </div>
          </header>

          <main className={`pt-24 lg:ml-[42%] lg:w-[58%] lg:py-32 lg:pl-16 transition-all duration-700 ${isGameActive ? 'blur-2xl scale-90 opacity-0 pointer-events-none' : 'blur-0 scale-100 opacity-100'}`}>
            <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-32 lg:scroll-mt-24 group">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-950/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 text-sm font-bold uppercase tracking-widest text-teal-300 flex items-center gap-2 italic font-mono">
                <span className="w-4 h-[1px] bg-teal-500"></span>
                System.Info
              </div>
              <div className="relative border-l border-teal-500/20 pl-6 py-2">
                <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-teal-500/40 -translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-teal-500/40 -translate-x-1/2"></div>
                <div className="space-y-4 text-slate-400 leading-relaxed md:text-lg">
                  <p>
                    I am a dedicated <span className="text-teal-300 font-bold uppercase">Game Developer</span> focused on creating immersive, high-performance interactive experiences. My work bridges the gap between traditional game design and modern web technologies.
                  </p>
                  <p className="font-mono text-sm opacity-80">
                    With a background in <span className="text-slate-200 uppercase font-bold text-xs font-sans">Unity</span> and <span className="text-slate-200 uppercase font-bold text-xs font-sans">Three.js</span>, I specialize in building scalable systems and optimizing graphic pipelines for various platforms.
                  </p>
                  <p>
                    Currently exploring the intersection of real-time 3D rendering and web interactivity, specifically focusing on <span className="text-teal-300 underline underline-offset-4 decoration-teal-500/30 font-bold uppercase text-xs tracking-wider">Playable Ads</span> and custom engine architecture.
                  </p>
                </div>
              </div>
            </section>

            <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-32 lg:scroll-mt-24 font-mono">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-950/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 text-sm font-bold uppercase tracking-widest text-teal-300 flex items-center gap-2 italic">
                <span className="w-4 h-[1px] bg-teal-500"></span>
                Quest.Log
              </div>
              <ol className="group/list border-l border-teal-500/10 ml-1">
                {[
                  { date: "2024 — 2025", title: "LEAD UNITY DEVELOPER @ REPLAI", desc: "Architected 3 production-ready games. Implemented Match 3 algorithms and physics simulations. scaled team from 4 to 20+.", tech: ["Unity", "C#", "Team Lead", "Optimization"] },
                  { date: "2023 — 2024", title: "EXECUTION COORDINATOR @ REPLAI", desc: "Directed development cycles. Automated workflows with custom Unity Editor scripts, boosting velocity by 35%.", tech: ["UI/UX", "Editor Scripting", "Automation"] }
                ].map((job, i) => (
                  <li key={i} className="mb-12 relative pl-8">
                    <div className="absolute left-0 top-1.5 w-3 h-3 border border-teal-500/40 bg-slate-950 -translate-x-1/2 rotate-45"></div>
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <header className="z-10 mb-2 mt-1 text-[10px] font-bold uppercase tracking-widest text-teal-500/60 sm:col-span-2">{job.date}</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-bold leading-tight text-white group-hover:text-teal-300 focus-visible:text-teal-300 uppercase tracking-tighter text-xl font-sans">{job.title}</h3>
                        <p className="mt-3 text-base leading-relaxed text-slate-300 lowercase italic">{job.desc}</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {job.tech.map(t => <li key={t} className="px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase border border-teal-500/20 text-teal-400 bg-teal-500/5">{t}</li>)}
                        </ul>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <div className="mt-8 mb-16">
              <a href="https://www.dropbox.com/scl/fi/tfjgivup6aaawom324orl/Julija_Filipovic_CV.pdf?rlkey=yajtyi4e05utv42hfnrbteyts&st=e1hdu23e&dl=0" className="inline-block py-3 px-8 border border-teal-400/30 text-teal-300 font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-teal-400 hover:text-slate-950 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(45,212,191,0.1)]">
                Load Full Resume
              </a>
            </div>

            <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-32 lg:scroll-mt-24 font-mono">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-950/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 text-sm font-bold uppercase tracking-widest text-teal-300 flex items-center gap-2 italic">
                <span className="w-4 h-[1px] bg-teal-500"></span>
                Playables.Bin
              </div>
              <div className="space-y-12">
                {[
                  { id: "farm_rush_01", title: "Farm Rush 3D", desc: "lightweight 3D ad built with Three.js. click-to-move, webgl texture optimization, low-memory footprints.", tech: ["Three.js", "WebGL", "JS"], href: "/demos/playable_demo.html" },
                  { id: "match3_core_02", title: "Match 3 Engine Core", desc: "Custom pattern-matching algorithms for playable ads. Built to handle 60fps on low-end mobile browsers.", tech: ["C#", "Algorithm", "Optimization"] }
                ].map((proj) => (
                  <div key={proj.id} className="border border-teal-500/20 bg-teal-500/5 p-6 rounded-lg relative overflow-hidden group/box hover:border-teal-500/40 transition-all">
                    <div className="absolute top-0 right-0 p-2 text-[8px] text-teal-500/30 uppercase font-black">id: {proj.id}</div>
                    <div className="relative z-10 sm:flex gap-6">
                      <div className="relative w-24 h-24 shrink-0 border border-teal-500/30 overflow-hidden bg-slate-900 group-hover/box:border-teal-400 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-500/20 opacity-40"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-40 uppercase text-[10px] font-black">[preview]</div>
                      </div>
                      <div className="font-sans">
                        <h3 className="font-black text-white uppercase italic text-xl tracking-tighter">
                          {proj.href ? <a href={proj.href} target="_blank" className="hover:text-teal-400 transition-colors flex items-center gap-2">{proj.title}<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path></svg></a> : proj.title}
                        </h3>
                        <p className="mt-2 text-base text-slate-400 leading-snug lowercase tracking-tight">{proj.desc}</p>
                        <div className="mt-4 flex gap-2 font-mono">
                          {proj.tech.map(t => <span key={t} className="text-[10px] text-teal-500 font-bold border-b border-teal-500/30">{t}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="labs" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-32 lg:scroll-mt-24 min-h-[50vh] font-mono">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-950/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 text-sm font-bold uppercase tracking-widest text-teal-300 flex items-center gap-2 italic">
                <span className="w-4 h-[1px] bg-teal-500"></span>
                Shooting Range
              </div>
              <p className="mb-8 text-slate-500 text-xs italic lowercase">
                no more projects... except this shooting range that i use because my cs2 stats are getting embarrassingly low.
              </p>
              <div className="relative">
                <AimTrainer onGameToggle={setIsGameActive} />
              </div>
            </section>

          </main>
        </div>
      </div>

      <footer className="text-center text-slate-600 pb-12 text-[10px] uppercase tracking-[0.4em] opacity-30 font-mono">
        <p>Built with Next.js // fueled by cat logic & plant photosynthesis</p>
      </footer>
    </div>
  );
}

function AimTrainer({ onGameToggle }) {
  const mountRef = useRef(null);
  const [gameState, setGameState] = useState('idle');
  const [sensitivity, setSensitivity] = useState(0.002);
  const [gameStarted, setGameStarted] = useState(false);
  const [stats, setStats] = useState({ hits: 0, headshots: 0, misses: 0, time: 30, streak: 0, maxStreak: 0 });
  const [mounted, setMounted] = useState(false);

  const gameStartedRef = useRef(false);
  const sensitivityRef = useRef(0.002);

  const gameRef = useRef({
    scene: null, camera: null, renderer: null,
    targets: [], lobbyTargets: [], particles: [], tracers: [],
    lastSpawn: 0, clock: new THREE.Clock(),
    pitch: 0, yaw: 0, shake: 0,
    locked: false, frameId: null
  });

  const statsRef = useRef({ hits: 0, headshots: 0, misses: 0, timeLeft: 30, streak: 0, maxStreak: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);
    scene.fog = new THREE.FogExp2(0x020617, 0.05);
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 1.6, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    const grid = new THREE.GridHelper(50, 50, 0x2dd4bf, 0x1e293b);
    scene.add(grid);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(5, 10, 5);
    scene.add(directional);

    gameRef.current = { ...gameRef.current, scene, camera, renderer, targets: [], lobbyTargets: [], lastSpawn: 0 };
    statsRef.current = { hits: 0, headshots: 0, misses: 0, timeLeft: 30.0, streak: 0, maxStreak: 0 };
    setStats({ hits: 0, headshots: 0, misses: 0, time: 30.0, streak: 0, maxStreak: 0 });

    const handleMouseMove = (e) => {
      if (document.pointerLockElement !== mountRef.current) return;
      const sens = sensitivityRef.current;
      gameRef.current.yaw -= e.movementX * sens;
      gameRef.current.pitch -= e.movementY * sens;
      gameRef.current.pitch = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, gameRef.current.pitch));
      camera.rotation.order = 'YXZ';
      camera.rotation.y = gameRef.current.yaw;
      camera.rotation.x = gameRef.current.pitch;
    };

    // Force rigid reset of stats on entry
    statsRef.current = { hits: 0, headshots: 0, misses: 0, timeLeft: 30.0, streak: 0, maxStreak: 0 };
    setStats({ hits: 0, headshots: 0, misses: 0, time: 30.0, streak: 0, maxStreak: 0 });
    gameStartedRef.current = false;
    setGameStarted(false);

    const clock = new THREE.Clock(false); // Don't start until game begins

    const spawnLobbyUI = () => {
      // Create a "START" button
      const startBtn = new THREE.Mesh(
        new THREE.BoxGeometry(2, 1, 0.2),
        new THREE.MeshStandardMaterial({ color: 0x2dd4bf, emissive: 0x2dd4bf, emissiveIntensity: 0.5 })
      );
      startBtn.position.set(0, 1.5, -10);
      startBtn.userData = { type: 'START' };
      scene.add(startBtn);
      gameRef.current.lobbyTargets.push(startBtn);

      // Create "+" button
      const plusBtn = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.8, 0.2),
        new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x22c55e, emissiveIntensity: 0.5 })
      );
      plusBtn.position.set(2, 1.5, -10);
      plusBtn.userData = { type: 'SENS_UP' };
      scene.add(plusBtn);
      gameRef.current.lobbyTargets.push(plusBtn);

      // Create "-" button
      const minusBtn = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.8, 0.2),
        new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.5 })
      );
      minusBtn.position.set(-2, 1.5, -10);
      minusBtn.userData = { type: 'SENS_DOWN' };
      scene.add(minusBtn);
      gameRef.current.lobbyTargets.push(minusBtn);
    };

    spawnLobbyUI();

    const spawnTarget = () => {
      const group = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.2, 0.8, 8), new THREE.MeshStandardMaterial({ color: 0x1e293b, emissive: 0x2dd4bf, emissiveIntensity: 0.1 }));
      body.position.y = 0.4;
      group.add(body);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), new THREE.MeshStandardMaterial({ color: 0xf43f5e, emissive: 0xf43f5e, emissiveIntensity: 0.5 }));
      head.position.y = 0.95;
      head.userData.isHead = true;
      group.add(head);
      const angle = (Math.random() - 0.5) * Math.PI * 0.3;
      const dist = 12 + Math.random() * 8;
      group.position.x = Math.sin(angle) * dist;
      group.position.z = -Math.cos(angle) * dist;
      group.position.y = 0;
      group.lookAt(0, 0.8, 0);
      group.userData = { spawnTime: Date.now(), lifespan: 1200 };
      scene.add(group);
      gameRef.current.targets.push(group);
    };

    const handleShoot = () => {
      if (document.pointerLockElement !== mountRef.current) return;

      // Recoil / Shake
      gameRef.current.shake = 0.04;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);

      // Bullet Tracer
      const tracerPoints = [
        new THREE.Vector3(0.1, -0.1, -0.2).applyMatrix4(camera.matrixWorld),
        raycaster.ray.at(40, new THREE.Vector3())
      ];
      const tracerGeo = new THREE.BufferGeometry().setFromPoints(tracerPoints);
      const tracerMat = new THREE.LineBasicMaterial({ color: 0x2dd4bf, transparent: true, opacity: 0.7 });
      const tracer = new THREE.Line(tracerGeo, tracerMat);
      scene.add(tracer);
      gameRef.current.tracers.push({ mesh: tracer, age: 0 });

      const intersectsLobby = raycaster.intersectObjects(gameRef.current.lobbyTargets, true);
      if (intersectsLobby.length > 0) {
        const type = intersectsLobby[0].object.userData.type;
        if (type === 'START') {
          gameStartedRef.current = true;
          setGameStarted(true);
          clock.start();
          gameRef.current.lobbyTargets.forEach(t => scene.remove(t));
          gameRef.current.lobbyTargets = [];
          spawnTarget();
        } else if (type === 'SENS_UP') {
          const newSens = Math.min(0.01, sensitivityRef.current + 0.0002);
          sensitivityRef.current = newSens;
          setSensitivity(newSens);
        } else if (type === 'SENS_DOWN') {
          const newSens = Math.max(0.0002, sensitivityRef.current - 0.0002);
          sensitivityRef.current = newSens;
          setSensitivity(newSens);
        }
        return;
      }

      if (!gameStartedRef.current) return;

      const intersects = raycaster.intersectObjects(gameRef.current.targets, true);
      if (intersects.length > 0) {
        let hitObject = intersects[0].object;
        let isHeadshot = !!hitObject.userData.isHead;
        let targetGroup = hitObject;
        while (targetGroup.parent !== scene) targetGroup = targetGroup.parent;

        // Particle Shatter
        const color = isHeadshot ? 0xf43f5e : 0x2dd4bf;
        for (let i = 0; i < 15; i++) {
          const p = new THREE.Mesh(
            new THREE.BoxGeometry(0.06, 0.06, 0.06),
            new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 2 })
          );
          p.position.copy(intersects[0].point);
          const vel = new THREE.Vector3((Math.random() - 0.5) * 0.15, (Math.random()) * 0.15, (Math.random() - 0.5) * 0.15);
          gameRef.current.particles.push({ mesh: p, velocity: vel, age: 0 });
          scene.add(p);
        }

        scene.remove(targetGroup);
        gameRef.current.targets = gameRef.current.targets.filter(t => t !== targetGroup);

        statsRef.current.hits++;
        statsRef.current.streak++;
        if (statsRef.current.streak > statsRef.current.maxStreak) statsRef.current.maxStreak = statsRef.current.streak;
        if (isHeadshot) statsRef.current.headshots++;

        setStats(prev => ({
          ...prev,
          hits: statsRef.current.hits,
          headshots: statsRef.current.headshots,
          streak: statsRef.current.streak,
          maxStreak: statsRef.current.maxStreak
        }));
        spawnTarget();
      } else {
        statsRef.current.misses++;
        statsRef.current.streak = 0;
        setStats(prev => ({ ...prev, misses: statsRef.current.misses, streak: 0 }));
      }
    };

    const handlePointerLockChange = () => {
      if (document.pointerLockElement !== mountRef.current) {
        if (statsRef.current.timeLeft > 0) {
          setGameState('finished');
          onGameToggle(false);
        }
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (document.pointerLockElement === mountRef.current) {
          document.exitPointerLock();
        }
        setGameState('finished');
        onGameToggle(false);
      }
    };

    document.addEventListener('pointerlockchange', handlePointerLockChange);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleShoot);

    const animate = () => {
      if (gameState !== 'playing') return;
      gameRef.current.frameId = requestAnimationFrame(animate);
      const now = Date.now();

      if (gameStartedRef.current) {
        gameRef.current.targets.forEach((t, i) => {
          if (now - t.userData.spawnTime > t.userData.lifespan) {
            scene.remove(t);
            gameRef.current.targets.splice(i, 1);
            spawnTarget();
          }
        });
        if (gameRef.current.targets.length < 1 && statsRef.current.timeLeft > 0) spawnTarget();

        const dt = clock.getDelta();
        statsRef.current.timeLeft = Math.max(0, statsRef.current.timeLeft - dt);

        if (statsRef.current.timeLeft <= 0) {
          setGameState('finished');
          onGameToggle(false);
          if (document.pointerLockElement === mountRef.current) {
            document.exitPointerLock();
          }
        } else {
          setStats(prev => ({ ...prev, time: Math.max(0, statsRef.current.timeLeft) }));
        }
      }

      // Physics: Particles
      const frameDelta = clock.getDelta(); // Separate delta for physics if needed, but using fixed or shared is fine
      gameRef.current.particles.forEach((p, i) => {
        p.mesh.position.add(p.velocity);
        p.velocity.y -= 0.005; // Gravity
        p.mesh.scale.multiplyScalar(0.96);
        p.age += 0.016; // Approx 60fps
        if (p.age > 0.8) {
          scene.remove(p.mesh);
          gameRef.current.particles.splice(i, 1);
        }
      });

      // Physics: Tracers
      gameRef.current.tracers.forEach((t, i) => {
        t.age += 0.016;
        t.mesh.material.opacity *= 0.85;
        if (t.age > 0.15) {
          scene.remove(t.mesh);
          gameRef.current.tracers.splice(i, 1);
        }
      });

      // Camera Shake
      if (gameRef.current.shake > 0) {
        camera.position.x += (Math.random() - 0.5) * gameRef.current.shake;
        camera.position.y += (Math.random() - 0.5) * gameRef.current.shake;
        gameRef.current.shake *= 0.8;
      } else {
        camera.position.set(0, 1.6, 0);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(gameRef.current.frameId);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleShoot);
      if (renderer.domElement && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [gameState]);

  const [isLocking, setIsLocking] = useState(false);

  const startRange = () => {
    if (isLocking) return;
    setIsLocking(true);

    // Immediate state reset
    const cleanStats = { hits: 0, headshots: 0, misses: 0, time: 30.0, streak: 0, maxStreak: 0 };
    setStats(cleanStats);
    statsRef.current = { ...cleanStats, timeLeft: 30.0 };

    // Clear any existing animation frame if it somehow survived
    if (gameRef.current.frameId) {
      cancelAnimationFrame(gameRef.current.frameId);
    }

    onGameToggle(true);
    setGameState('playing');

    // Give browser more time to handle previous unlock sequence
    setTimeout(() => {
      if (mountRef.current) {
        mountRef.current.requestPointerLock();
      }
      // Keep guard active for a bit longer to prevent spam
      setTimeout(() => setIsLocking(false), 500);
    }, 300);
  };

  if (!mounted) return null;
  const efficiency = Math.round((stats.hits / (stats.hits + stats.misses)) * 100) || 0;

  return (
    <>
      <div className="h-[400px] border border-teal-500/20 bg-slate-900/40 rounded-lg overflow-hidden relative group/lab font-mono">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-sm p-6 text-center">
          <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Shooting Range</h3>
          <p className="mt-4 text-xs text-slate-400 max-w-xs lowercase">Fullscreen immersion. Low-poly targets. 30s flick challenge. Hit ESC to exit simulation.</p>
          <button onClick={startRange} className="mt-8 px-12 py-4 bg-teal-400 text-slate-950 font-black uppercase text-sm tracking-widest hover:bg-white transition-all shadow-[0_0_30px_rgba(45,212,191,0.2)] active:scale-95 text-xs">Initialize Range</button>
        </div>
      </div>
      {(gameState === 'playing' || gameState === 'finished') && createPortal(
        <div className={`fixed inset-0 z-[10000] bg-slate-950 animate-in fade-in zoom-in duration-500 overflow-hidden select-none font-mono ${gameState === 'playing' ? 'cursor-none' : 'cursor-auto'}`}>
          {gameState === 'playing' && (
            <>
              <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[110] flex gap-12 text-white font-black uppercase text-xl tracking-widest bg-slate-950/60 backdrop-blur-md px-12 py-4 rounded-full border border-teal-500/30">
                <div className="flex flex-col items-center"><span className="text-[10px] text-teal-400">Time</span><span>{stats.time.toFixed(1)}s</span></div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-teal-400 font-bold uppercase">Streak</span>
                  <span className={`transition-all duration-300 ${stats.streak >= 5 ? 'text-orange-500 scale-125 [text-shadow:_0_0_15px_rgba(249,115,22,0.8)]' : 'text-white'}`}>
                    {stats.streak}
                  </span>
                </div>
                <div className="flex flex-col items-center"><span className="text-[10px] text-teal-400">Hits</span><span>{stats.hits}</span></div>
                <div className="flex flex-col items-center"><span className="text-[10px] text-rose-500 font-bold uppercase">HS</span><span>{stats.headshots}</span></div>
              </div>

              {/* DYNAMIC CROSSHAIR */}
              <div className="absolute inset-0 z-[105] pointer-events-none flex items-center justify-center">
                <div className="w-8 h-8 relative flex items-center justify-center">
                  <div className={`absolute w-full h-[1.5px] transition-all duration-150 ${stats.streak > 0 ? 'bg-teal-400' : 'bg-rose-500/50 scale-75'}`}></div>
                  <div className={`absolute h-full w-[1.5px] transition-all duration-150 ${stats.streak > 0 ? 'bg-teal-400' : 'bg-rose-500/50 scale-75'}`}></div>
                  <div className={`w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,1)] transition-transform ${stats.streak > 0 ? 'scale-125' : 'scale-90 opacity-40'}`}></div>

                  {/* Fire / Pulse Effect for High Streak */}
                  {stats.streak >= 5 && (
                    <div className="absolute inset-[-12px] rounded-full border-2 border-orange-500/30 animate-pulse scale-150 opacity-20"></div>
                  )}
                </div>
              </div>

              {/* COMBO ANNOUNCER */}
              {stats.streak >= 3 && (
                <div key={stats.streak} className="absolute bottom-32 left-1/2 -translate-x-1/2 text-6xl font-black italic text-teal-400 uppercase tracking-tighter animate-in zoom-in slide-in-from-bottom duration-300 flex flex-col items-center">
                  <span className="text-[10px] tracking-[0.6em] text-white/50 mb-2 font-mono">STREAK_ACTIVE</span>
                  <div className="relative">
                    {stats.streak}x
                    {stats.streak >= 5 && <span className="absolute -top-4 -right-8 text-xs text-orange-500 animate-bounce">FIRE!!</span>}
                  </div>
                </div>
              )}

              {/* LOBBY INSTRUCTIONS */}
              {!gameStarted && (
                <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-32 pointer-events-none">
                  <div className="bg-slate-950/80 p-8 border border-teal-500/30 rounded backdrop-blur-md text-center max-w-lg">
                    <p className="text-teal-400 text-[10px] font-black tracking-[0.4em] uppercase mb-4">Calibration Mode</p>
                    <h2 className="text-3xl font-black text-white italic uppercase mb-2">Configure & Shoot</h2>
                    <p className="text-slate-400 text-sm mb-6 uppercase">Adjust sensitivity by shooting [+] [-] and hit START to begin</p>
                    <div className="text-6xl font-black text-white font-mono">{sensitivity.toFixed(4)}</div>
                    <p className="text-slate-500 text-[10px] uppercase mt-2">Current Sensitivity</p>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={mountRef} className="w-full h-full" />
          {gameState === 'finished' && (
            <div className="absolute inset-0 z-[120] flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl px-10">
              <div className="text-center space-y-12 max-w-4xl w-full">
                <div><p className="text-teal-400 text-[10px] font-black tracking-[0.8em] uppercase mb-4 opacity-50">Simulation_Complete</p><h3 className="text-7xl font-black text-white italic tracking-tighter uppercase leading-none">Range Results</h3></div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
                  <div className="space-y-1"><div className="text-[10px] text-slate-500 uppercase font-black">Hits</div><div className="text-6xl font-black text-white">{stats.hits}</div></div>
                  <div className="space-y-1"><div className="text-[10px] text-slate-500 uppercase font-black">Headshots</div><div className="text-6xl font-black text-rose-500">{stats.headshots}</div></div>
                  <div className="space-y-1"><div className="text-[10px] text-slate-500 uppercase font-black">Max Streak</div><div className="text-6xl font-black text-orange-400">{stats.maxStreak}</div></div>
                  <div className="space-y-1"><div className="text-[10px] text-slate-500 uppercase font-black">Accuracy</div><div className="text-6xl font-black text-teal-400">{efficiency}%</div></div>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button onClick={startRange} className="px-16 py-5 bg-teal-400 text-slate-950 font-black uppercase text-xs tracking-widest hover:bg-white transition-all">Restart Range</button>
                  <button onClick={() => { setGameState('idle'); onGameToggle(false); }} className="px-16 py-5 border-2 border-slate-700 text-slate-500 font-black uppercase text-xs tracking-widest hover:border-white hover:text-white transition-all">Exit Simulation</button>
                </div>
              </div>
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
}
