import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, Calendar, Lock, Unlock } from 'lucide-react';
import { Duel, DuelStatus } from '../../types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';

interface DuelCardProps {
  duel: Duel;
  onJoin?: (duelId: string) => void;
}

export const DuelCard: React.FC<DuelCardProps> = ({ duel, onJoin }) => {
  const isJoinable = duel.status === DuelStatus.WAITING && duel.player2 === undefined;
  
  const getStatusClass = () => {
    switch (duel.status) {
      case DuelStatus.WAITING:
        return 'bg-yellow-100 text-yellow-800';
      case DuelStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-800';
      case DuelStatus.FINISHED:
        return 'bg-green-100 text-green-800';
      case DuelStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not started';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Card variant="bordered" className="h-full transition-all duration-200 hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="truncate">{duel.task.title}</CardTitle>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusClass()}`}>
            {duel.status}
          </span>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Users size={16} className="mr-2" />
            <div>
              <div>{duel.player1.username}</div>
              {duel.player2 && <div>{duel.player2.username}</div>}
              {!duel.player2 && <div className="text-gray-400">Waiting for opponent...</div>}
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-2" />
            <div>
              <div>Started: {formatDate(duel.startTime)}</div>
              {duel.endTime && <div>Ended: {formatDate(duel.endTime)}</div>}
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Calendar size={16} className="mr-2" />
          <span>Created: {new Date(duel.task.createdAt).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          {duel.isPrivate ? (
            <>
              <Lock size={16} className="mr-2 text-amber-500" />
              <span>Private duel</span>
            </>
          ) : (
            <>
              <Unlock size={16} className="mr-2" />
              <span>Public duel</span>
            </>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end">
        {isJoinable && onJoin ? (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onJoin(duel.id)}
          >
            Join Duel
          </Button>
        ) : (
          <Link to={`/duel/${duel.id}`}>
            <Button
              variant={duel.status === DuelStatus.FINISHED ? 'secondary' : 'primary'}
              size="sm"
            >
              {duel.status === DuelStatus.FINISHED ? 'View Results' : 'View Duel'}
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};