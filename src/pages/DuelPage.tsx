import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProgrammingLanguage } from '../types';
import { CodeEditor } from '../components/duels/CodeEditor';
import { TaskDescription } from '../components/duels/TaskDescription';
import { DuelInfo } from '../components/duels/DuelInfo';
import { useWebSocket } from '../contexts/WebSocketContext';

// Default starter code templates
const starterCode = {
  [ProgrammingLanguage.JAVASCRIPT]: `
function solution(nums, target) {
  // Your code here
  
  return [];
}

// Example usage:
// console.log(solution([2, 7, 11, 15], 9)); // [0, 1]
`,
  [ProgrammingLanguage.PYTHON]: `
def solution(nums, target):
    # Your code here
    
    return []

# Example usage:
# print(solution([2, 7, 11, 15], 9))  # [0, 1]
`,
  [ProgrammingLanguage.JAVA]: `
import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        
        return new int[]{0, 0};
    }
    
    // Example usage:
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] result = sol.twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println(Arrays.toString(result));  // [0, 1]
    }
}
`,
  [ProgrammingLanguage.CPP]: `
#include <vector>
#include <iostream>

using namespace std;

vector<int> solution(vector<int>& nums, int target) {
    // Your code here
    
    return {0, 0};
}

// Example usage:
// int main() {
//     vector<int> nums = {2, 7, 11, 15};
//     vector<int> result = solution(nums, 9);
//     cout << "[" << result[0] << ", " << result[1] << "]" << endl;  // [0, 1]
//     return 0;
// }
`,
  [ProgrammingLanguage.CSHARP]: `
using System;
using System.Collections.Generic;

public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        // Your code here
        
        return new int[]{0, 0};
    }
    
    // Example usage:
    // public static void Main() {
    //     Solution sol = new Solution();
    //     int[] result = sol.TwoSum(new int[]{2, 7, 11, 15}, 9);
    //     Console.WriteLine($"[{result[0]}, {result[1]}]");  // [0, 1]
    // }
}
`
};

export const DuelPage = () => {
  const { duelId } = useParams<{ duelId: string }>();
  const { currentDuel, submissionStatus, sendMessage, isConnected } = useWebSocket();
  
  const [language, setLanguage] = useState<ProgrammingLanguage>(ProgrammingLanguage.JAVASCRIPT);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined);
  
  // Initialize with starter code
  const initialCode = starterCode[language];
  
  // In a real app, we would fetch the duel details and set up WebSocket connection
  useEffect(() => {
    if (isConnected && duelId) {
      sendMessage('JOIN_DUEL', { duelId });
    }
  }, [isConnected, duelId, sendMessage]);
  
  // Setup countdown timer
  useEffect(() => {
    if (currentDuel?.startTime && currentDuel?.status === 'in_progress') {
      const startTime = new Date(currentDuel.startTime).getTime();
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      
      // Assuming a 30-minute time limit for duels
      const totalSeconds = 30 * 60;
      const remaining = Math.max(0, totalSeconds - elapsed);
      
      setTimeLeft(remaining);
      
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === undefined || prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [currentDuel]);

  const handleLanguageChange = (newLanguage: ProgrammingLanguage) => {
    setLanguage(newLanguage);
  };

  const handleSubmit = (code: string, language: ProgrammingLanguage) => {
    if (!duelId) return;
    
    setIsSubmitting(true);
    
    // Send the submission via WebSocket
    sendMessage('SUBMIT_SOLUTION', {
      duelId,
      code,
      language
    });
    
    // In a real app, we would wait for the WebSocket to update the submission status
    // For now, we'll use the simulated feedback from the WebSocketContext
  };

  // Handle loading state
  if (!currentDuel) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {currentDuel.task.title}
          </h1>
        </div>
        
        <div className="lg:col-span-1 flex justify-end">
          {/* This space intentionally left for future UI elements */}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[calc(100vh-300px)]">
        {/* Task Description - Left Side */}
        <div className="lg:col-span-1 flex flex-col">
          <TaskDescription task={currentDuel.task} />
          
          {/* Duel Info */}
          <div className="mt-6">
            <DuelInfo duel={currentDuel} />
          </div>
        </div>
        
        {/* Code Editor - Right Side */}
        <div className="lg:col-span-2 flex flex-col h-full bg-white rounded-lg shadow-sm">
          <CodeEditor
            initialCode={initialCode}
            language={language}
            onLanguageChange={handleLanguageChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submissionStatus={submissionStatus}
            timeLeft={timeLeft}
          />
        </div>
      </div>
    </div>
  );
};