import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Duel, DuelStatus, SubmissionStatus } from '../types';

interface WebSocketContextType {
  isConnected: boolean;
  sendMessage: (type: string, payload: any) => void;
  currentDuel: Duel | null;
  submissionStatus: SubmissionStatus | null;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentDuel, setCurrentDuel] = useState<Duel | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus | null>(null);

  // Setup WebSocket connection
  useEffect(() => {
    if (!isAuthenticated || !user) {
      return;
    }

    // In a real app, this would be your WebSocket server URL
    const webSocketUrl = 'wss://api.codebattle.example.com/ws/'; // Replace with your actual WebSocket URL
    
    // For the mock setup, we'll simulate WebSocket behavior
    console.log('WebSocket would connect to:', webSocketUrl);
    
    // Set a timeout to simulate connection
    const connectionTimeout = setTimeout(() => {
      setIsConnected(true);
      console.log('WebSocket connected');
    }, 1000);

    // Cleanup function
    return () => {
      clearTimeout(connectionTimeout);
      setIsConnected(false);
      console.log('WebSocket disconnected');
    };
  }, [isAuthenticated, user]);

  // Function to send messages through WebSocket
  const sendMessage = (type: string, payload: any) => {
    if (!isConnected) {
      console.error('WebSocket not connected');
      return;
    }

    // In a real app, we would send the message through the WebSocket
    console.log('Sending WebSocket message:', { type, payload });
    
    // Simulate message handling for specific types
    if (type === 'JOIN_DUEL') {
      simulateJoinDuel(payload.duelId);
    } else if (type === 'SUBMIT_SOLUTION') {
      simulateSubmitSolution(payload.duelId, payload.code, payload.language);
    }
  };

  // Simulate joining a duel
  const simulateJoinDuel = (duelId: string) => {
    // Mock duel data
    const mockDuel: Duel = {
      id: duelId,
      status: DuelStatus.WAITING,
      task: {
        id: '123',
        title: 'Two Sum',
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
        difficulty: 'medium',
        timeLimit: 2000,
        memoryLimit: 256,
        sampleTestCases: [
          {
            id: '1',
            input: '[2,7,11,15]\n9',
            expectedOutput: '[0,1]',
            isPublic: true
          },
          {
            id: '2',
            input: '[3,2,4]\n6',
            expectedOutput: '[1,2]',
            isPublic: true
          }
        ],
        createdAt: new Date().toISOString(),
        upvotes: 234,
        downvotes: 12
      },
      player1: {
        userId: user?.id || '1',
        username: user?.username || 'codemaster',
        avatarUrl: user?.avatarUrl,
        isReady: true,
        hasSubmitted: false,
        hasCompleted: false
      },
      player2: {
        userId: '2',
        username: 'challenger',
        avatarUrl: 'https://i.pravatar.cc/150?u=challenger',
        isReady: false,
        hasSubmitted: false,
        hasCompleted: false
      },
      isPrivate: false
    };

    // Update state
    setCurrentDuel(mockDuel);
    
    // Simulate opponent getting ready after 2 seconds
    setTimeout(() => {
      setCurrentDuel(prev => {
        if (!prev) return null;
        return {
          ...prev,
          status: DuelStatus.IN_PROGRESS,
          startTime: new Date().toISOString(),
          player2: {
            ...prev.player2!,
            isReady: true
          }
        };
      });
    }, 2000);
  };

  // Simulate submitting a solution
  const simulateSubmitSolution = (duelId: string, code: string, language: string) => {
    // Update submission status
    setSubmissionStatus(SubmissionStatus.PENDING);
    
    // Simulate running tests
    setTimeout(() => {
      setSubmissionStatus(SubmissionStatus.RUNNING);
    }, 1000);
    
    // Simulate completed tests
    setTimeout(() => {
      setSubmissionStatus(SubmissionStatus.ACCEPTED);
      
      // Update duel state
      setCurrentDuel(prev => {
        if (!prev) return null;
        return {
          ...prev,
          player1: {
            ...prev.player1,
            hasSubmitted: true,
            hasCompleted: true,
            submissionTime: new Date().toISOString()
          }
        };
      });
      
      // Simulate opponent completing after another 3 seconds
      setTimeout(() => {
        setCurrentDuel(prev => {
          if (!prev) return null;
          return {
            ...prev,
            status: DuelStatus.FINISHED,
            endTime: new Date().toISOString(),
            winnerId: prev.player1.userId,
            player2: {
              ...prev.player2!,
              hasSubmitted: true,
              hasCompleted: false
            }
          };
        });
      }, 3000);
    }, 3000);
  };

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        sendMessage,
        currentDuel,
        submissionStatus
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};