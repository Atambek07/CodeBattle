import React from 'react';
import { User, Trophy, Calendar, Code, Activity } from 'lucide-react';
import { User as UserType } from '../../types';
import { Card, CardContent } from '../ui/Card';

interface ProfileHeaderProps {
  user: UserType;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateWinRate = () => {
    if (user.totalDuels === 0) return 0;
    return Math.round((user.wins / user.totalDuels) * 100);
  };

  return (
    <Card variant="elevated" className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={40} className="text-indigo-600" />
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center md:text-left">
              {user.username}
            </h1>
            
            <div className="flex items-center justify-center md:justify-start mb-4 text-gray-500">
              <Calendar size={16} className="mr-1" />
              <span className="text-sm">
                Joined {formatDate(user.joinedAt)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-3 bg-indigo-50 rounded-lg">
                <Trophy size={24} className="mx-auto mb-2 text-indigo-600" />
                <p className="text-2xl font-bold text-gray-900">{user.rating}</p>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
              
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <Activity size={24} className="mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold text-gray-900">{calculateWinRate()}%</p>
                <p className="text-sm text-gray-600">Win Rate</p>
              </div>
              
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Code size={24} className="mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold text-gray-900">{user.totalDuels}</p>
                <p className="text-sm text-gray-600">Total Duels</p>
              </div>
              
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <Trophy size={24} className="mx-auto mb-2 text-yellow-600" />
                <p className="text-2xl font-bold text-gray-900">{user.wins}</p>
                <p className="text-sm text-gray-600">Victories</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};