import React from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

const Navbar = ({
    activeSection,
    mobileMenuOpen,
    setMobileMenuOpen,
    scrollToSection,
    heroRef,
    aboutRef,
    projectsRef,
    skillsRef,
    contactRef
}) => {
    return (
        <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <span className="text-2xl font-bold text-white">
                            Bikash.
                        </span>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(
                                        item === 'Home' ? heroRef :
                                            item === 'About' ? aboutRef :
                                                item === 'Projects' ? projectsRef :
                                                    item === 'Skills' ? skillsRef : contactRef
                                    )}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === item.toLowerCase()
                                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-700'
                                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-md text-gray-700 dark:text-gray-300"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>

                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(
                                    item === 'Home' ? heroRef :
                                        item === 'About' ? aboutRef :
                                            item === 'Projects' ? projectsRef :
                                                item === 'Skills' ? skillsRef : contactRef
                                )}
                                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;