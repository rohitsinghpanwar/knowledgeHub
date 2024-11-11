// KnowledgeHubHomePage.js
import React from 'react';
import { motion } from 'framer-motion';

import coding from '../assets/coding.png'
import logo from '../assets/logo.png'
import promo from '../assets/promo.png'

function KnowledgeHubHomePage() {
  return (
    <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-gray-200 font-sans">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10"
        >
          <h1 className="text-6xl font-bold mb-4">
            Welcome to <span className="text-yellow-400">KnowledgeHub</span>
          </h1>
          <p className="text-2xl font-light mb-8 max-w-lg mx-auto">
            Unlock your coding potential with  roadmaps and in-depth courses.Let's Kickstart Your Coding Journey!
          </p>
          <a href="/roadmaps" className="text-lg px-6 py-3 bg-yellow-400 text-indigo-900 font-semibold rounded-full hover:bg-yellow-300 transition duration-300">
            Get Started
          </a>
        </motion.div>
        
        {/* Floating Background Icons */}
        <div className="absolute inset-0 flex justify-around opacity-30 pointer-events-none">
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
            <img src={coding} alt="Rocket Icon" className="h-24 w-24" />
          </motion.div>
          <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
            <img src={promo} alt="Book Icon" className="h-24 w-24" />
          </motion.div>
        </div>
        <div className=" flex justify-around opacity-30 pointer-events-none w-full">
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
            <img src={coding} alt="Rocket Icon" className="h-24 w-24" />
          </motion.div>
          <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
            <img src={promo} alt="Book Icon" className="h-24 w-24" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-5 bg-indigo-800 ">
        <h1 className='font-bold text-3xl text-yellow-400 text-center'>About KnowledgeHub</h1>
        <h1 className='text-center text-lg'>KnowledgeHub is a college project designed to make coding education accessible and structured for students. Our platform offers curated roadmaps and courses, guiding learners through key tech domains like web development and Software Development. With KnowledgeHub, students can follow personalized paths and connect with a community, making it easier to achieve their coding goals.</h1>
        <p className=" text-gray-300 text-center text-lg"> © 2024 KnowledgeHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default KnowledgeHubHomePage;
