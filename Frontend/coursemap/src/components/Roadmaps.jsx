import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Roadmap = () => {
  // Define all roadmaps
  const roadmaps = {
    frontend: ['HTML', 'CSS', 'JavaScript', 'CSS Frameworks', 'Frontend Frameworks', 'Git and Github'],
    backend: ['Databases', 'Node.js', 'Express.js', 'API Development', 'Authentication', 'Testing', 'Deployment'],
    fullstack: ['Frontend Basics', 'Backend Basics', 'Databases', 'APIs', 'Version Control', 'Testing', 'Deployment'],
    android: ['Java', 'Android SDK', 'UI Design', 'Networking', 'Data Persistence', 'Testing', 'Deployment'],
    ios: ['Swift', 'iOS SDK', 'UI Design', 'Networking', 'Data Persistence', 'Testing', 'Deployment'],
    devops: ['Linux', 'Networking', 'Cloud Computing', 'Containers', 'CI/CD', 'Monitoring', 'Deployment'],
    software: ['Algorithms', 'Data Structures', 'System Design', 'Version Control', 'Testing', 'Deployment']
  };

  const roles = {
    frontend: 'Focuses on the user interface (UI) and user experience (UX) of a website or application. They work with languages like HTML, CSS, and JavaScript to build the visual elements and interactions users see and interact with.',
    backend: 'Works on the server-side of applications. They handle databases, server logic, and APIs to ensure the frontend gets the necessary data and functionalities. They use languages like Python, Java, Ruby, or Node.js.',
    fullstack: 'A combination of both frontend and backend developer. They have the skills to build both the user interface and the server-side functionalities of a web application.',
    android: 'Specializes in building applications for the Android operating system, using languages like Java or Kotlin, and tools like Android Studio to create mobile apps.',
    ios: 'Specializes in building applications for Apple’s iOS devices (iPhone, iPad). They use languages like Swift or Objective-C and tools like Xcode to develop mobile apps.',
    devops: 'Focuses on the integration and deployment of software. They work to automate processes between development and IT teams to streamline software delivery and infrastructure management. Tools like Docker, Kubernetes, and Jenkins are often used.',
    software: 'A broad term for developers who write code to create software applications. They work on both frontend and backend aspects depending on their specialization and may focus on desktop, web, or mobile apps.'
  };

  // State to track the current roadmap and current goal
  const [currentRoadmap, setCurrentRoadmap] = useState('frontend');
  const [currentGoal, setCurrentGoal] = useState(0);
  const [completedGoals, setCompletedGoals] = useState([]);

  // Move to the next goal
  const handleNextGoal = () => {
    if (currentGoal < roadmaps[currentRoadmap].length - 1) {
      setCurrentGoal(currentGoal + 1);
    }
  };

  // Move to the previous goal
  const handlePreviousGoal = () => {
    if (currentGoal > 0) {
      setCurrentGoal(currentGoal - 1);
    }
  };

  // Mark the current goal as completed
  const handleCompleteGoal = (index) => {
    if (!completedGoals.includes(index)) {
      setCompletedGoals([...completedGoals, index]);
      toast.success(`${roadmaps[currentRoadmap][index]} completed!`);
    }
  };

  // Change the current roadmap
  const handleRoadmapChange = (roadmap) => {
    setCurrentRoadmap(roadmap);
    setCurrentGoal(0); // Reset to the first goal
    setCompletedGoals([]); // Reset completed goals
  };

  return (
    <div className='bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 rounded-lg'>
      <div className="roadmap-container flex flex-col items-center space-y-8  p-3   rounded-lg ">
        {/* Roadmap Selection */}
        <div className="roadmap-selector flex space-x-4 text-lg">
          <button
            onClick={() => handleRoadmapChange('frontend')}
            className={`px-4 py-2 rounded-lg ${currentRoadmap === 'frontend' ? 'bg-blue-500' : 'bg-gray-400'}`}
          >
            Frontend Developer
          </button>
          <button
            onClick={() => handleRoadmapChange('backend')}
            className={`px-4 py-2 rounded-lg ${currentRoadmap === 'backend' ? 'bg-blue-500' : 'bg-gray-400'}`}
          >
            Backend Developer
          </button>
          <button
            onClick={() => handleRoadmapChange('fullstack')}
            className={`px-4 py-2 rounded-lg ${currentRoadmap === 'fullstack' ? 'bg-blue-500' : 'bg-gray-400'}`}
          >
            Full Stack Developer
          </button>
          <button
            onClick={() => handleRoadmapChange('android')}
            className={`px-4 py-2 rounded-lg ${currentRoadmap === 'android' ? 'bg-blue-500' : 'bg-gray-400'}`}
          >
            Android Developer
          </button>
          <button
            onClick={() => handleRoadmapChange('ios')}
            className={`px-4 py-2 rounded-lg ${currentRoadmap === 'ios' ? 'bg-blue-500' : 'bg-gray-400'}`}
          >
            iOS Developer
          </button>
          <button
            onClick={() => handleRoadmapChange('devops')}
            className={`px-4 py-2 rounded-lg ${currentRoadmap === 'devops' ? 'bg-blue-500' : 'bg-gray-400'}`}
          >
            DevOps Engineer
          </button>
          <button
            onClick={() => handleRoadmapChange('software')}
            className={`px-4 py-2 rounded-lg ${currentRoadmap === 'software' ? 'bg-blue-500' : 'bg-gray-400'}`}
          >
            Software Developer
          </button>
        </div>



        {/* Roadmap Description */}
        <div className="roadmap-description mt-4 text-lg p-4 bg-gradient-to-br from-yellow-400 to-red-500 rounded-lg shadow-md">
          {currentRoadmap !== 'devops' && (
            <h2 className="font-bold text-3xl text-center">Q.What does a {currentRoadmap.charAt(0).toUpperCase() + currentRoadmap.slice(1)} developer do ?</h2>
          )}

          {currentRoadmap === 'devops' && (
            <h2 className="font-bold text-3xl text-center ">Q.What does a {currentRoadmap.charAt(0).toUpperCase() + currentRoadmap.slice(1)} Engineer  do ?</h2>
          )}
          <code className='text-xl text-center'>{roles[currentRoadmap]}</code>
        </div>
        <div>
          {currentRoadmap === 'devops' && (
              <h1 className="font-bold text-3xl ">Roadmap for {currentRoadmap.charAt(0).toUpperCase() + currentRoadmap.slice(1)} Engineer</h1>
          )}
           {currentRoadmap !== 'devops' && (
            <h1 className="font-bold text-3xl ">Roadmap for {currentRoadmap.charAt(0).toUpperCase() + currentRoadmap.slice(1)} Developer</h1>
          )}
          
        </div>
        {/* Curved Road Background */}
        <div className="relative w-full h-52 bg-transparent flex items-center justify-center rounded-lg shadow-xl bg-gradient-to-br from-yellow-400 to-red-500 ">
          <div className="road absolute top-[3.8rem] left-0 w-full h-1 bg-white transform -translate-y-1/2 rounded-full">
            <div
              className="progress absolute h-1 bg-gray-600 transition-all duration-500 rounded-full"
              style={{ width: `${(100 / (roadmaps[currentRoadmap].length - 1)) * currentGoal}%` }}
            ></div>
          </div>

          {/* Goals */}
          <div className="goals flex justify-between w-full items-center px-8 relative ">
            {roadmaps[currentRoadmap].map((goal, index) => (
              <div
                key={index}
                className={`goal-item flex flex-col items-center transition-transform duration-500 ease-in-out
                  ${index === currentGoal ? 'transform scale-110 border-4 border-blue-500 shadow-lg p-3 bg-blue-50' : 'transform scale-95 opacity-80  '}`}
              >
                <div className={`w-10 h-10 mb-2 rounded-full flex items-center justify-center text-lg font-bold 
                  ${completedGoals.includes(index) ? 'bg-green-500 text-white' : 'bg-gray-400 text-black'}`}>
                  {index + 1}
                </div>
                <p className={`text-xl font-semibold mb-4 ${index === currentGoal ? 'text-blue-600' : 'text-black'}`}>
                  {goal}
                </p>
                <button
                  className={`tick-button mt-2 px-3 py-1 text-white rounded-full shadow-lg transition-all
                    ${completedGoals.includes(index) ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                  onClick={() => handleCompleteGoal(index)}
                  disabled={completedGoals.includes(index)}
                >
                  {completedGoals.includes(index) ? '✓' : 'Mark Complete'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="navigation-buttons flex space-x-4">
          <button
            onClick={handlePreviousGoal}
            disabled={currentGoal === 0}
            className="prev-button px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md disabled:opacity-50 hover:bg-blue-600"
          >
            ←
          </button>

          <button
            onClick={handleNextGoal}
            disabled={currentGoal >= roadmaps[currentRoadmap].length - 1}
            className="next-button px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md disabled:opacity-50 hover:bg-blue-600"
          >
            →
          </button>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Roadmap;
