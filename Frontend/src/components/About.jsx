import React from 'react';

const About = ({ aboutRef }) => {
    return (
        <section id="about" ref={aboutRef} className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">About Me</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Recent B.Tech CSE graduate specializing in MERN-stack development with a passion for creating innovative web solutions.
                    </p>
                </div>

                <div className="items-center">
                    <div>
                        <h3 className="text-2xl font-bold mb-6">Qualification</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            I'm a recent Computer Science Engineering graduate from Einstein Academy of Technology and Management, Odisha.
                            My journey in web development began with a curiosity for creating digital solutions that make a difference.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            I specialize in the MERN stack and have hands-on experience building full-stack applications with features like
                            real-time communication, payment integration, and responsive user interfaces. I'm passionate about writing clean,
                            efficient code and staying updated with the latest web technologies.
                        </p>

                        <div className=" mt-8">
                            {/* grid grid-cols-2  gap-6 */}
                            <div>
                                <h4 className="font-semibold text-lg mb-2">Education</h4>
                                <p className="text-gray-700 dark:text-gray-400 font-medium">B.Tech CSE, 2025</p>
                                <p className="text-gray-600 dark:text-gray-500 font-medium">Einstein Academy of Technology and Management, Khurda, Odisha</p>
                            </div>
                            {/* <div>
                                <h4 className="font-semibold text-lg mb-2">Current Location</h4>
                                <p className="text-gray-600 dark:text-gray-400">Belpara, Balangir</p>
                                <p className="text-gray-500 dark:text-gray-500 text-sm">Odisha, India</p>
                            </div> */}
                        </div>
                    </div>


                </div>
            </div>
        </section>
    );
};

export default About;