"use client";
import { useState, useEffect } from "react";
import Cursor from "../src/components/HUD/Cursor";
import IdentityBox from "../src/components/Identity/IdentityBox";
import Navigation from "../src/components/Navigation/Navigation";
import About from "../src/components/Sections/About";
import Experience from "../src/components/Sections/Experience";
import Projects from "../src/components/Sections/Projects";
import Footer from "../src/components/Sections/Footer";
import AimTrainer from "../src/components/AimTrainer/AimTrainer";

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`group/spotlight relative bg-slate-950 min-h-screen text-slate-300 font-mono overflow-x-hidden ${isGameActive ? '' : 'cursor-none'}`}>

      {!isGameActive && !isMobile && (
        <Cursor mousePos={mousePos} isVisible={isVisible} trail={trail} isHovering={isHovering} />
      )}

      <div className="mx-auto max-w-screen-2xl px-6 font-sans md:px-12 lg:px-24">
        <div className="lg:flex lg:justify-between lg:gap-12">

          <header className={`pt-12 lg:pt-32 lg:fixed lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:flex-col lg:justify-start lg:pr-20 transition-all duration-700 ${isGameActive ? 'blur-2xl scale-90 opacity-0 pointer-events-none' : 'blur-0 scale-100 opacity-100'}`}>
            <IdentityBox isGameActive={isGameActive}>
              <Navigation activeSection={activeSection} />
            </IdentityBox>
          </header>

          <main className={`pt-24 lg:ml-[42%] lg:w-[58%] lg:py-32 lg:pl-24 transition-all duration-700 ${isGameActive ? 'blur-2xl scale-90 opacity-0 pointer-events-none' : 'blur-0 scale-100 opacity-100'}`}>
            <About />
            <Experience />
            <Projects />


            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}
