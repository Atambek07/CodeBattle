import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, Search } from 'lucide-react';
import { Duel, DuelStatus, TaskDifficulty } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { DuelCard } from '../components/duels/DuelCard';
import { useAuth } from '../contexts/AuthContext';
import { useWebSocket } from '../contexts/WebSocketContext';

// Mock data
const MOCK_DUELS: Duel[] = [
  {
    id: '1',
    status: DuelStatus.WAITING,
    task: {
      id: '101',
      title: 'Two Sum',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      difficulty: 'easy' as TaskDifficulty,
      timeLimit: 1000,
      memoryLimit: 128,
      sampleTestCases: [],
      createdAt: new Date().toISOString(),
      upvotes: 120,
      downvotes: 5
    },
    player1: {
      userId: '201',
      username: 'alice_dev',
      avatarUrl: 'https://i.pravatar.cc/150?u=alice',
      isReady: true,
      hasSubmitted: false,
      hasCompleted: false
    },
    isPrivate: false,
    startTime: undefined,
    endTime: undefined
  },
  {
    id: '2',
    status: DuelStatus.IN_PROGRESS,
    task: {
      id: '102',
      title: 'Valid Parentheses',
      description: 'Given a string s containing just the characters (, ), {, }, [, ], determine if the input string is valid.',
      difficulty: 'medium' as TaskDifficulty,
      timeLimit: 1500,
      memoryLimit: 256,
      sampleTestCases: [],
      createdAt: new Date().toISOString(),
      upvotes: 85,
      downvotes: 12
    },
    player1: {
      userId: '202',
      username: 'bob_coder',
      avatarUrl: 'https://i.pravatar.cc/150?u=bob',
      isReady: true,
      hasSubmitted: true,
      hasCompleted: false
    },
    player2: {
      userId: '203',
      username: 'charlie_hacker',
      avatarUrl: 'https://i.pravatar.cc/150?u=charlie',
      isReady: true,
      hasSubmitted: false,
      hasCompleted: false
    },
    isPrivate: false,
    startTime: new Date().toISOString()
  },
  {
    id: '3',
    status: DuelStatus.FINISHED,
    task: {
      id: '103',
      title: 'Maximum Subarray',
      description: 'Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.',
      difficulty: 'hard' as TaskDifficulty,
      timeLimit: 2000,
      memoryLimit: 512,
      sampleTestCases: [],
      createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      upvotes: 230,
      downvotes: 18
    },
    player1: {
      userId: '204',
      username: 'dave_programmer',
      avatarUrl: 'https://i.pravatar.cc/150?u=dave',
      isReady: true,
      hasSubmitted: true,
      hasCompleted: true
    },
    player2: {
      userId: '205',
      username: 'eve_engineer',
      avatarUrl: 'https://i.pravatar.cc/150?u=eve',
      isReady: true,
      hasSubmitted: true,
      hasCompleted: true
    },
    isPrivate: true,
    startTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    endTime: new Date(Date.now() - 3000000).toISOString(), // 50 minutes ago
    winnerId: '204'
  }
];

export const DuelsPage = () => {
  const { isAuthenticated } = useAuth();
  const { sendMessage } = useWebSocket();
  const navigate = useNavigate();
  
  const [duels, setDuels] = useState<Duel[]>([]);
  const [filteredDuels, setFilteredDuels] = useState<Duel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<DuelStatus | 'all'>('all');

  useEffect(() => {
    // Simulate API call
    const fetchDuels = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would fetch from the API
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network request
        setDuels(MOCK_DUELS);
      } catch (error) {
        console.error('Error fetching duels:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDuels();
  }, []);

  useEffect(() => {
    // Apply filters
    let result = duels;
    
    if (searchQuery) {
      result = result.filter(duel => 
        duel.task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        duel.player1.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (duel.player2 && duel.player2.username.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(duel => duel.status === statusFilter);
    }
    
    setFilteredDuels(result);
  }, [duels, searchQuery, statusFilter]);

  const handleCreateDuel = () => {
    navigate('/tasks');
  };

  const handleJoinDuel = (duelId: string) => {
    if (!isAuthenticated) {
      // Show auth modal or redirect to login
      alert('Please sign in to join a duel');
      return;
    }

    // Join the duel via WebSocket
    sendMessage('JOIN_DUEL', { duelId });
    
    // Navigate to the duel page
    navigate(`/duel/${duelId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Coding Duels</h1>
          <p className="text-gray-600 max-w-3xl">
            Challenge other programmers in real-time coding battles. Join an existing duel or create your own.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button
            variant="primary"
            leftIcon={<Plus size={18} />}
            onClick={handleCreateDuel}
          >
            Create Duel
          </Button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-grow max-w-md">
          <Input
            placeholder="Search duels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search size={18} className="text-gray-400" />}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as DuelStatus | 'all')}
            className="border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
          >
            <option value="all">All Statuses</option>
            <option value={DuelStatus.WAITING}>Waiting</option>
            <option value={DuelStatus.IN_PROGRESS}>In Progress</option>
            <option value={DuelStatus.FINISHED}>Finished</option>
          </select>
        </div>
      </div>
      
      {/* Duels Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : filteredDuels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDuels.map(duel => (
            <DuelCard
              key={duel.id}
              duel={duel}
              onJoin={handleJoinDuel}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No duels found matching your criteria.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={handleCreateDuel}
          >
            Create a new duel
          </Button>
        </div>
      )}
    </div>
  );
};