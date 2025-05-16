import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Twitter, Github as GitHub, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <Code size={24} className="text-indigo-400 mr-2" />
              <span className="text-lg font-bold">CodeBattle</span>
            </Link>
            <p className="mt-2 text-sm text-gray-400 max-w-xs">
              Compete in real-time coding challenges, improve your skills, and climb the leaderboard.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
                Platform
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/duels" className="text-gray-400 hover:text-white">
                    Code Duels
                  </Link>
                </li>
                <li>
                  <Link to="/tasks" className="text-gray-400 hover:text-white">
                    Challenges
                  </Link>
                </li>
                <li>
                  <Link to="/leaderboard" className="text-gray-400 hover:text-white">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/help" className="text-gray-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} CodeBattle. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <GitHub size={20} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};