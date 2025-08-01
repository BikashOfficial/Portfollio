import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects = ({ projectsRef }) => {
  const projects = [
    {
      title: "Uber Clone",
      description: "A mobile-friendly ride-hailing application with real-time booking, driver-passenger authentication, and geolocation tracking using Google Maps API.",
      tech: ["React.js", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS", "Google Maps API"],
      demo: "https://uber-clone-wn6z.onrender.com",
      github: "https://github.com/BikashOfficial/UBER-clone",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop"
    },
    {
      title: "Tomato - Food Ordering App",
      description: "A comprehensive food ordering platform with cart management, authentication, order tracking, and admin panel for restaurant management.",
      tech: ["React.js", "Node.js", "MongoDB", "Socket.io", "Stripe", "Tailwind CSS"],
      demo: "https://tomato-food-ordering-app.onrender.com",
      github: "https://github.com/BikashOfficial/Tomato-Food-Ordering-APP",
      image: "https://img.youtube.com/vi/9jRTo7ILxQc/maxresdefault.jpg"
    },
    {
      title: "WonderHub - Hotel Review System",
      description: "A platform for users to review and rate hotels with CRUD operations, user authentication, and interactive search functionality.",
      tech: ["Node.js", "Express.js", "MongoDB", "Bootstrap", "JavaScript"],
      demo: "#",
      github: "https://github.com/BikashOfficial/Wonder-Hub",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop"
    },
    {
      title: "PDF - Assistant",
      description: "A web app that lets users upload PDF files and ask AI-powered questions to extract answers directly from the document’s content.",
      tech: ["React.js", "Node.js", "MongoDB", "Express", "Gemini API", "Tailwind CSS"],
      demo: "https://pdf-qna-sigma.vercel.app/",
      github: "https://github.com/BikashOfficial/PDF_QNA",
      image: "https://iili.io/Fg7fjEl.md.png"
    },
    {
      title: "Quick Chat",
      description: "A full-stack real-time chat application featuring socket-based messaging, user authentication, and a modern chat UI with support for active user status.",
      tech: ["React.js", "Node.js", "Express.js", "Socket.io", "MongoDB", "Tailwind CSS"],
      demo: "https://quick-chat-two.vercel.app",
      github: "https://github.com/BikashOfficial/chatty",
      image: "https://img.youtube.com/vi/tTCam8KGVRE/maxresdefault.jpg"
    },
    {
      title: "EasyComplaint",
      description: "A full-stack web app for users to submit and track complaints, while admins manage and resolve them with secure authentication and email notifications..",
      tech: ["React", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT", "Nodemailer"],
      demo: "https://easy-complaint-delta.vercel.app/",
      github: "https://github.com/BikashOfficial/easyComplaint",
      image: "https://knowmax-ai-website.s3.amazonaws.com/wp-content/uploads/2020/12/21171716/Best-way-to-handle-customer-complaints.jpg"
    }

  ];

  return (
    <section id="projects" ref={projectsRef} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Here are some of my recent projects showcasing my full-stack development skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {/* {project.tech.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))} */}
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {/* {project.tech.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                      +{project.tech.length - 3} more
                    </span>
                  )} */}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;