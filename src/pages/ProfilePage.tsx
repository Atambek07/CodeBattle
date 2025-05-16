import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Code, CheckCircle, XCircle, Clock } from 'lucide-react';
import { User, Duel } from '../types';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { Card, CardContent } from '../components/ui/Card';
import { DuelCard } from '../components/duels/DuelCard';

// Mock data
const MOCK_USER: User = {
  id: '1',
  username: 'codemaster',
  email: 'codemaster@example.com',
  avatarUrl: 'https://i.pravatar.cc/150?u=codemaster',
  joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days ago
  rating: 1875,
  wins: 32,
  losses: 18,
  totalDuels: 50
};

// Mock duel history
const MOCK_DUELS: Duel[] = [
  // Mock duel data would go here, similar to what we used in DuelsPage
];

export const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentDuels, setRecentDuels] = useState<Duel[]>([]);

  useEffect(() => {
    // Simulate API call to fetch user profile
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would fetch from the API
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network request
        
        // For demonstration, modify the mock user to match the requested username
        const mockUser = {
          ...MOCK_USER,
          username: username || MOCK_USER.username,
          avatarUrl: `https://i.pravatar.cc/150?u=${username || MOCK_USER.username}`
        };
        
        setUser(mockUser);
        // In a real app, we would also fetch recent duels
        setRecentDuels(MOCK_DUELS);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  // Statistics to display
  const stats = [
    {
      label: 'Total Duels',
      value: user?.totalDuels || 0,
      icon: <Code className="text-blue-600" />
    },
    {
      label: 'Victories',
      value: user?.wins || 0,
      icon: <CheckCircle className="text-green-600" />
    },
    {
      label: 'Defeats',
      value: user?.losses || 0,
      icon: <XCircle className="text-red-600" />
    },
    {
      label: 'Win Rate',
      value: user ? `${Math.round((user.wins / user.totalDuels) * 100)}%` : '0%',
      icon: <Calendar className="text-purple-600" />
    },
    {
      label: 'Average Time',
      value: '8m 45s', // This would be calculated from actual duel data
      icon: <Clock className="text-yellow-600" />
    }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">User not found</h1>
        <p className="text-gray-600">The user you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <ProfileHeader user={user} />
      
      {/* Statistics */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Statistics</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} variant="bordered" className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        
        {recentDuels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentDuels.map(duel => (
              <DuelCard key={duel.id} duel={duel} />
            ))}
          </div>
        ) : (
          <Card variant="bordered" className="bg-white">
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No recent activity to display.</p>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Achievements */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Achievements</h2>
        
        <Card variant="bordered" className="bg-white">
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Achievements coming soon!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};