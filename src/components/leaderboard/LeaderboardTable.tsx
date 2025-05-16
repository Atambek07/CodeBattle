import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ArrowUp, ArrowDown, Minus, User } from 'lucide-react';
import { LeaderboardEntry } from '../../types';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  isLoading?: boolean;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ entries, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No leaderboard entries found.
      </div>
    );
  }

  const getRankIcon = (position: number) => {
    if (position === 1) {
      return <Trophy className="text-yellow-500" size={20} />;
    }
    if (position === 2) {
      return <Trophy className="text-gray-400" size={20} />;
    }
    if (position === 3) {
      return <Trophy className="text-amber-600" size={20} />;
    }
    return <span className="font-medium">{position}</span>;
  };

  // Mock data for rank change (in a real app, this would come from the API)
  const getRankChange = (userId: string) => {
    // This is just for demonstration - in a real app, we'd have actual data
    const changeMap: Record<string, number> = {
      '1': 0,  // No change
      '2': 2,  // Moved up 2 positions
      '3': -1, // Moved down 1 position
    };
    
    return changeMap[userId] || Math.floor(Math.random() * 5) - 2; // Random for other users
  };

  const getRankChangeIcon = (change: number) => {
    if (change > 0) {
      return <ArrowUp className="text-green-500" size={16} />;
    }
    if (change < 0) {
      return <ArrowDown className="text-red-500" size={16} />;
    }
    return <Minus className="text-gray-400" size={16} />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wins</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Losses</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Win Rate</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-gray-200">
          {entries.map((entry) => {
            const rankChange = getRankChange(entry.userId);
            const winRate = entry.wins + entry.losses > 0 
              ? Math.round((entry.wins / (entry.wins + entry.losses)) * 100) 
              : 0;
              
            return (
              <tr key={entry.userId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(entry.position)}
                    </div>
                    <div className="ml-2 flex items-center text-sm text-gray-500">
                      {getRankChangeIcon(rankChange)}
                      <span className="ml-1">{Math.abs(rankChange) || ''}</span>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/profile/${entry.username}`} className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      {entry.avatarUrl ? (
                        <img
                          src={entry.avatarUrl}
                          alt={entry.username}
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        <User size={20} className="text-indigo-600" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors">
                        {entry.username}
                      </p>
                    </div>
                  </Link>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {entry.rating}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  {entry.wins}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                  {entry.losses}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-indigo-600 h-2.5 rounded-full"
                        style={{ width: `${winRate}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-900">{winRate}%</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};