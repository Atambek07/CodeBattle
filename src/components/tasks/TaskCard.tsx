import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Task, TaskDifficulty } from '../../types';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';

interface TaskCardProps {
  task: Task;
  onStartDuel: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onStartDuel }) => {
  const difficultyColors = {
    [TaskDifficulty.EASY]: 'bg-green-100 text-green-800',
    [TaskDifficulty.MEDIUM]: 'bg-yellow-100 text-yellow-800',
    [TaskDifficulty.HARD]: 'bg-red-100 text-red-800'
  };

  return (
    <Card variant="bordered" className="h-full transition-all duration-200 hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{task.title}</CardTitle>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${difficultyColors[task.difficulty]}`}>
            {task.difficulty}
          </span>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 line-clamp-3">
          {task.description.substring(0, 120)}
          {task.description.length > 120 ? '...' : ''}
        </p>
        
        <div className="flex items-center mt-4 text-sm text-gray-500">
          <div className="mr-4">
            <span className="font-medium">Time Limit:</span> {task.timeLimit}ms
          </div>
          <div>
            <span className="font-medium">Memory:</span> {task.memoryLimit}MB
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-green-600">+{task.upvotes}</span>
          <span className="text-red-600">-{task.downvotes}</span>
        </div>
        
        <Button
          variant="primary"
          size="sm"
          rightIcon={<ArrowRight size={16} />}
          onClick={() => onStartDuel(task.id)}
        >
          Start Duel
        </Button>
      </CardFooter>
    </Card>
  );
};