import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import AimTrainerEngine from '../../engine/AimTrainerEngine';

const AimTrainer = ({ onGameToggle }) => {
    const mountRef = useRef(null);
    const engineRef = useRef(null);
    const [gameState, setGameState] = useState('idle');
    const [isMobile, setIsMobile] = useState(false);
    const [stats, setStats] = useState({ hits: 0, headshots: 0, misses: 0, time: 30, streak: 0, maxStreak: 0, sensitivity: 0.002 });

    useEffect(() => {
        setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    }, []);

    useEffect(() => {
        if (gameState === 'playing' && mountRef.current) {
            engineRef.current = new AimTrainerEngine(mountRef.current, {
                isMobile,
                setStats,
                onGameEnd: () => {
                    setGameState('finished');
                    onGameToggle(false);
                    if (document.pointerLockElement) document.exitPointerLock();
                }
            });
        }

        return () => {
            if (engineRef.current) {
                engineRef.current.dispose();
            }
        };
    }, [gameState]);

    const startRange = () => {
        setGameState('playing');
        onGameToggle(true);
        setTimeout(() => {
            if (mountRef.current && !isMobile) {
                mountRef.current.requestPointerLock();
            }
        }, 100);
    };

    const efficiency = Math.round((stats.hits / (stats.hits + stats.misses)) * 100) || 0;

    return (
        <>
            <div className="h-[400px] border border-teal-500/20 bg-slate-900/40 rounded-lg overflow-hidden relative group/lab font-mono">
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-sm p-6 text-center">
                    <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Shooting Range</h3>
                    <p className="mt-4 text-xs text-slate-400 max-w-xs italic">Test your flicking skills</p>
                    <button onClick={startRange} className="mt-8 px-12 py-4 bg-teal-400 text-slate-950 font-black uppercase text-sm tracking-widest hover:bg-white transition-all shadow-[0_0_30px_rgba(45,212,191,0.2)] active:scale-95 text-xs">Initialize Range</button>
                </div>
            </div>

            {(gameState === 'playing' || gameState === 'finished') && createPortal(
                <div className={`fixed inset-0 z-[10000] bg-slate-950 animate-in fade-in zoom-in duration-500 overflow-hidden select-none font-mono ${(gameState === 'playing' && !isMobile) ? 'cursor-none' : 'cursor-auto'}`}>
                    {gameState === 'playing' && (
                        <>
                            {/* HUD */}
                            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[110] flex gap-6 sm:gap-12 text-white font-black uppercase text-sm sm:text-xl tracking-widest bg-slate-950/60 backdrop-blur-md px-6 sm:px-12 py-3 sm:py-4 rounded-full border border-teal-500/30">
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

                            {/* EXIT BUTTON */}
                            <button
                                onClick={() => { setGameState('idle'); onGameToggle(false); }}
                                className="absolute top-4 left-4 z-[111] px-6 py-3 bg-rose-600/20 border border-rose-500/40 text-rose-500 text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all backdrop-blur-md"
                            >
                                EXIT
                            </button>

                            {/* CROSSHAIR - NUCLEAR OPTION */}
                            {!isMobile && (
                                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[99999]">
                                    <div className="w-1.5 h-1.5 bg-teal-400 rounded-full shadow-[0_0_10px_#2dd4bf,0_0_20px_white]"></div>
                                </div>
                            )}

                            {/* LOBBY INSTRUCTIONS */}
                            {stats.time >= 30 && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-32 pointer-events-none">
                                    <div className="bg-slate-950/80 p-8 border border-teal-500/30 rounded backdrop-blur-md text-center max-w-lg">
                                        <p className="text-teal-400 text-[10px] font-black tracking-[0.4em] uppercase mb-4">Calibration Mode</p>
                                        <h2 className="text-3xl font-black text-white italic uppercase mb-2">Configure & Shoot</h2>
                                        <p className="text-slate-400 text-sm mb-6 uppercase">Adjust sensitivity by shooting [+] [-] and hit START to begin</p>
                                        <div className="text-6xl font-black text-white font-mono">{stats.sensitivity.toFixed(4)}</div>
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
};

export default AimTrainer;
