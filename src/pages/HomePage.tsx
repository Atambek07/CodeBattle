import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Swords, Trophy, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

export const HomePage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Swords size={32} className="text-indigo-600" />,
      title: 'Real-time Coding Duels',
      description: 'Challenge other developers to code duels, compete in real-time, and see who can solve problems faster.'
    },
    {
      icon: <Code size={32} className="text-indigo-600" />,
      title: 'Diverse Challenges',
      description: 'Practice with a variety of coding challenges across different difficulty levels and topics.'
    },
    {
      icon: <Trophy size={32} className="text-indigo-600" />,
      title: 'Competitive Leaderboard',
      description: 'Climb the ranks, gain rating points, and establish yourself as a top coder in the community.'
    },
    {
      icon: <Users size={32} className="text-indigo-600" />,
      title: 'Global Community',
      description: 'Connect with developers from around the world, learn from others, and improve together.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-800 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg')] bg-cover bg-center opacity-20"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fadeIn">
            Prove Your Coding Skills in Real-time Duels
          </h1>
          
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-gray-200">
            Challenge other developers, solve algorithmic problems faster, and climb the leaderboard. 
            Improve your coding skills through competitive programming.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {isAuthenticated ? (
              <Link to="/duels">
                <Button variant="primary" size="lg">
                  Start Dueling
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="primary" size="lg">
                  Sign Up Now
                </Button>
              </Link>
            )}
            <Link to="/tasks">
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 hover:bg-white/20">
                Browse Challenges
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How CodeBattle Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform provides everything you need to test your skills, challenge others,
              and improve your coding abilities through competition.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} variant="elevated" className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Ready to challenge your coding skills?
                </h2>
                <p className="mt-2 text-lg text-indigo-100 max-w-3xl">
                  Join our community of developers, compete in real-time duels, and prove your worth.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8">
                <div className="sm:flex">
                  {isAuthenticated ? (
                    <Link to="/duels">
                      <Button
                        variant="success"
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        Find a Duel
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/auth">
                      <Button
                        variant="success"
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        Get Started
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};