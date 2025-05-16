import React, { useState, useEffect } from 'react';
import { Trophy, Filter, Calendar } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { LeaderboardTable } from '../components/leaderboard/LeaderboardTable';

// Mock data
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    position: 1,
    userId: '1',
    username: 'codemaster',
    avatarUrl: 'https://i.pravatar.cc/150?u=codemaster',
    rating: 2150,
    wins: 48,
    losses: 12
  },
  {
    position: 2,
    userId: '2',
    username: 'algopro',
    avatarUrl: 'https://i.pravatar.cc/150?u=algopro',
    rating: 1980,
    wins: 41,
    losses: 15
  },
  {
    position: 3,
    userId: '3',
    username: 'hackathoner',
    avatarUrl: 'https://i.pravatar.cc/150?u=hackathoner',
    rating: 1945,
    wins: 35,
    losses: 10
  },
  {
    position: 4,
    userId: '4',
    username: 'devguru',
    avatarUrl: 'https://i.pravatar.cc/150?u=devguru',
    rating: 1875,
    wins: 32,
    losses: 18
  },
  {
    position: 5,
    userId: '5',
    username: 'bugslayer',
    avatarUrl: 'https://i.pravatar.cc/150?u=bugslayer',
    rating: 1798,
    wins: 29,
    losses: 21
  },
  {
    position: 6,
    userId: '6',
    username: 'pythonista',
    avatarUrl: 'https://i.pravatar.cc/150?u=pythonista',
    rating: 1734,
    wins: 25,
    losses: 19
  },
  {
    position: 7,
    userId: '7',
    username: 'javascripter',
    avatarUrl: 'https://i.pravatar.cc/150?u=javascripter',
    rating: 1689,
    wins: 23,
    losses: 17
  },
  {
    position: 8,
    userId: '8',
    username: 'coder123',
    avatarUrl: 'https://i.pravatar.cc/150?u=coder123',
    rating: 1645,
    wins: 21,
    losses: 15
  },
  {
    position: 9,
    userId: '9',
    username: 'bitmaster',
    avatarUrl: 'https://i.pravatar.cc/150?u=bitmaster',
    rating: 1590,
    wins: 18,
    losses: 12
  },
  {
    position: 10,
    userId: '10',
    username: 'debugqueen',
    avatarUrl: 'https://i.pravatar.cc/150?u=debugqueen',
    rating: 1542,
    wins: 17,
    losses: 13
  }
];

type TimeFrame = 'all_time' | 'monthly' | 'weekly';

export const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('all_time');

  useEffect(() => {
    // Simulate API call
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would fetch from the API with the correct time frame
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network request
        
        // For demonstration, we'll slightly modify the mock data based on time frame
        if (timeFrame === 'monthly') {
          // Shuffle the positions a bit for monthly data
          setLeaderboard(MOCK_LEADERBOARD.map((entry, index) => ({
            ...entry,
            position: index + 1,
            rating: Math.max(1200, entry.rating - Math.floor(Math.random() * 200)),
            wins: Math.floor(entry.wins * 0.5),
            losses: Math.floor(entry.losses * 0.5)
          })));
        } else if (timeFrame === 'weekly') {
          // More changes for weekly data
          setLeaderboard(MOCK_LEADERBOARD.map((entry, index) => ({
            ...entry,
            position: index + 1,
            rating: Math.max(1000, entry.rating - Math.floor(Math.random() * 400)),
            wins: Math.floor(entry.wins * 0.2),
            losses: Math.floor(entry.losses * 0.2)
          })));
        } else {
          setLeaderboard(MOCK_LEADERBOARD);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [timeFrame]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Trophy size={28} className="text-yellow-500 mr-2" />
            Leaderboard
          </h1>
          <p className="text-gray-600 max-w-3xl">
            The top performers in coding duels. Compete against the best and climb the ranks.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center">
          <Calendar size={18} className="text-gray-500 mr-2" />
          <select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value as TimeFrame)}
            className="border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
          >
            <option value="all_time">All Time</option>
            <option value="monthly">This Month</option>
            <option value="weekly">This Week</option>
          </select>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <LeaderboardTable entries={leaderboard} isLoading={isLoading} />
      </div>
    </div>
  );
};