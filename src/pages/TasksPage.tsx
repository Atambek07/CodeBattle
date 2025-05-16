import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Task, TaskDifficulty } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { TaskCard } from '../components/tasks/TaskCard';
import { useAuth } from '../contexts/AuthContext';

// Mock data
const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
    difficulty: TaskDifficulty.EASY,
    timeLimit: 1000,
    memoryLimit: 128,
    sampleTestCases: [
      {
        id: '101',
        input: '[2,7,11,15]\n9',
        expectedOutput: '[0,1]',
        isPublic: true
      }
    ],
    createdAt: new Date().toISOString(),
    upvotes: 120,
    downvotes: 5
  },
  {
    id: '2',
    title: 'Valid Parentheses',
    description: 'Given a string s containing just the characters (, ), {, }, [, ], determine if the input string is valid.\n\nAn input string is valid if:\n\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.',
    difficulty: TaskDifficulty.MEDIUM,
    timeLimit: 1500,
    memoryLimit: 256,
    sampleTestCases: [
      {
        id: '201',
        input: '()',
        expectedOutput: 'true',
        isPublic: true
      }
    ],
    createdAt: new Date().toISOString(),
    upvotes: 85,
    downvotes: 12
  },
  {
    id: '3',
    title: 'Maximum Subarray',
    description: 'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.\n\nA subarray is a contiguous part of an array.',
    difficulty: TaskDifficulty.MEDIUM,
    timeLimit: 2000,
    memoryLimit: 512,
    sampleTestCases: [
      {
        id: '301',
        input: '[-2,1,-3,4,-1,2,1,-5,4]',
        expectedOutput: '6',
        isPublic: true
      }
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    upvotes: 230,
    downvotes: 18
  },
  {
    id: '4',
    title: 'Binary Tree Maximum Path Sum',
    description: 'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.\n\nThe path sum of a path is the sum of the node\'s values in the path.\n\nGiven the root of a binary tree, return the maximum path sum of any path.',
    difficulty: TaskDifficulty.HARD,
    timeLimit: 3000,
    memoryLimit: 1024,
    sampleTestCases: [
      {
        id: '401',
        input: '[1,2,3]',
        expectedOutput: '6',
        isPublic: true
      }
    ],
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
    upvotes: 320,
    downvotes: 45
  }
];

export const TasksPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<TaskDifficulty | 'all'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');

  useEffect(() => {
    // Simulate API call
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would fetch from the API
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network request
        setTasks(MOCK_TASKS);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    // Apply filters and sorting
    let result = [...tasks];
    
    if (searchQuery) {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (difficultyFilter !== 'all') {
      result = result.filter(task => task.difficulty === difficultyFilter);
    }
    
    // Apply sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'popular') {
      result.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
    }
    
    setFilteredTasks(result);
  }, [tasks, searchQuery, difficultyFilter, sortBy]);

  const handleStartDuel = (taskId: string) => {
    if (!isAuthenticated) {
      // Show auth modal or redirect to login
      alert('Please sign in to start a duel');
      return;
    }

    // Create a new duel with this task
    // In a real app, we would make an API call
    
    // For now, just navigate to a mock duel page
    navigate(`/duel/new?taskId=${taskId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Coding Challenges</h1>
        <p className="text-gray-600 max-w-3xl">
          Browse our collection of coding challenges. Find a problem that interests you, solve it, and challenge others to a duel.
        </p>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center mb-6 space-y-4 lg:space-y-0">
        <div className="flex-grow max-w-md">
          <Input
            placeholder="Search challenges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search size={18} className="text-gray-400" />}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-500" />
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as TaskDifficulty | 'all')}
              className="border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            >
              <option value="all">All Difficulties</option>
              <option value={TaskDifficulty.EASY}>Easy</option>
              <option value={TaskDifficulty.MEDIUM}>Medium</option>
              <option value={TaskDifficulty.HARD}>Hard</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <ChevronDown size={18} className="text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular')}
              className="border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Tasks Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onStartDuel={handleStartDuel}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No challenges found matching your criteria.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery('');
              setDifficultyFilter('all');
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};