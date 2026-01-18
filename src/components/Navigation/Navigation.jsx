import React from 'react';

const Navigation = ({ activeSection }) => {
    const navItems = ["About", "Experience", "Projects"];

    return (
        <nav className="nav hidden lg:block" aria-label="In-page jump links">
            <ul className="mt-10 w-max font-mono">
                {navItems.map((item) => (
                    <li key={item} className="mb-3">
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
    );
};

export default Navigation;
