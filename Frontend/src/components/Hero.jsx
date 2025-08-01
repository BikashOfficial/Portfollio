import React from 'react';
import { Download } from 'lucide-react';

const Hero = ({ heroRef, scrollToSection, projectsRef }) => {
  return (
    <section id="home" ref={heroRef} className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="hero-content opacity-0 transform translate-y-8 transition-all duration-1000 delay-300" style={{ opacity: 1, transform: 'translateY(0)' }}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Bikash Meher
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
                Full Stack MERN Developer
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
                Building responsive, scalable web applications with modern technologies.
                Passionate about creating seamless user experiences and robust backend solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection(projectsRef)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  View Projects
                </button>
                <a
                  href="https://drive.google.com/file/d/1ivze85Y__zKz7bA2m4MOtzdI21EH7ePT/view?usp=drivesdk"
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative ">
              <div className="shadow-2xl shadow-black w-85 h-85 md:w-110 md:h-110 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 transform hover:scale-105 transition-transform duration-300">
                <img
                  src="h.jpg"
                  alt="Bikash Meher"
                  className="w-full h-full object-cover "
                />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;