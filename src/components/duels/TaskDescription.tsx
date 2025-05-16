import React from 'react';
import { Task, TestCase } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

interface TaskDescriptionProps {
  task: Task;
}

export const TaskDescription: React.FC<TaskDescriptionProps> = ({ task }) => {
  // Function to handle markdown-like content (simplified version)
  const formatDescription = (text: string): JSX.Element => {
    const paragraphs = text.split('\n\n');
    
    return (
      <>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </>
    );
  };

  const difficultyColors = {
    'easy': 'bg-green-100 text-green-800',
    'medium': 'bg-yellow-100 text-yellow-800', 
    'hard': 'bg-red-100 text-red-800'
  };

  return (
    <Card variant="default" className="h-full overflow-y-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{task.title}</CardTitle>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full 
            ${difficultyColors[task.difficulty as keyof typeof difficultyColors]}`}
          >
            {task.difficulty}
          </span>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6 text-gray-700">
          {formatDescription(task.description)}
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Example Test Cases:</h3>
          {task.sampleTestCases.map((testCase: TestCase) => (
            <div key={testCase.id} className="mb-4 p-3 bg-gray-50 rounded-md">
              <div className="mb-2">
                <span className="font-medium">Input:</span>
                <pre className="mt-1 p-2 bg-gray-100 rounded text-sm overflow-x-auto whitespace-pre">
                  {testCase.input}
                </pre>
              </div>
              <div>
                <span className="font-medium">Expected Output:</span>
                <pre className="mt-1 p-2 bg-gray-100 rounded text-sm overflow-x-auto whitespace-pre">
                  {testCase.expectedOutput}
                </pre>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-sm text-gray-600">
          <div className="mb-2">
            <span className="font-medium">Time Limit:</span> {task.timeLimit}ms
          </div>
          <div>
            <span className="font-medium">Memory Limit:</span> {task.memoryLimit}MB
          </div>
        </div>
      </CardContent>
    </Card>
  );
};