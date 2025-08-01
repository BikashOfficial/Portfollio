import React from 'react';
import { Code, Database, Server, Globe } from 'lucide-react';
import {
  SiReact, SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiBootstrap,
  SiNodedotjs, SiExpress, SiSocketdotio,
  SiMongodb, SiMysql,
  SiGit, SiGithub
} from 'react-icons/si';

const Skills = ({ skillsRef }) => {
  const skills = [
    {
      category: "Frontend",
      items: [
        { name: "React.js", icon: <SiReact className="w-4 h-4 text-blue-500" /> },
        { name: "JavaScript", icon: <SiJavascript className="w-4 h-4 text-yellow-500" /> },
        { name: "HTML5", icon: <SiHtml5 className="w-4 h-4 text-orange-500" /> },
        { name: "CSS3", icon: <SiCss3 className="w-4 h-4 text-blue-600" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="w-4 h-4 text-cyan-500" /> },
        { name: "Bootstrap", icon: <SiBootstrap className="w-4 h-4 text-purple-600" /> }
      ],
      icon: <Globe className="w-6 h-6" />
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", icon: <SiNodedotjs className="w-4 h-4 text-green-600" /> },
        { name: "Express.js", icon: <SiExpress className="w-4 h-4 text-gray-600" /> },
        { name: "Socket.io", icon: <SiSocketdotio className="w-4 h-4 text-black dark:text-white" /> },
        { name: "RESTful APIs", icon: <Code className="w-4 h-4 text-blue-500" /> }
      ],
      icon: <Server className="w-6 h-6" />
    },
    {
      category: "Database",
      items: [
        { name: "MongoDB", icon: <SiMongodb className="w-4 h-4 text-green-500" /> },
        { name: "SQL", icon: <SiMysql className="w-4 h-4 text-blue-700" /> }
      ],
      icon: <Database className="w-6 h-6" />
    },
    {
      category: "Tools & Others",
      items: [
        { name: "Git", icon: <SiGit className="w-4 h-4 text-orange-600" /> },
        { name: "GitHub", icon: <SiGithub className="w-4 h-4 text-gray-800 dark:text-white" /> },
        { name: "OOPs", icon: <Code className="w-4 h-4 text-purple-500" /> }
      ],
      icon: <Code className="w-6 h-6" />
    }
  ];

  return (
    <section id="skills" ref={skillsRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillCategory, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
                  {skillCategory.icon}
                </div>
                <h3 className="text-lg font-bold">{skillCategory.category}</h3>
              </div>
              <div className="space-y-2">
                {skillCategory.items.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    {skill.icon}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;