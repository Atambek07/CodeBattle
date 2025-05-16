import React from 'react';
import { User, Trophy, Clock, XCircle } from 'lucide-react';
import { Duel, DuelStatus } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

interface DuelInfoProps {
  duel: Duel;
}

export const DuelInfo: React.FC<DuelInfoProps> = ({ duel }) => {
  const formatTime = (timeString?: string) => {
    if (!timeString) return '';
    return new Date(timeString).toLocaleTimeString();
  };

  const getDurationInSeconds = () => {
    if (!duel.startTime || !duel.endTime) return 0;
    const start = new Date(duel.startTime).getTime();
    const end = new Date(duel.endTime).getTime();
    return Math.floor((end - start) / 1000);
  };

  const formatDuration = () => {
    const durationInSeconds = getDurationInSeconds();
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const getPlayerStatus = (playerId: string) => {
    if (duel.status === DuelStatus.FINISHED && duel.winnerId === playerId) {
      return (
        <div className="text-green-600 font-medium flex items-center">
          <Trophy size={18} className="mr-1" />
          Winner
        </div>
      );
    }
    
    if (duel.player1.userId === playerId && duel.player1.hasSubmitted) {
      return <div className="text-blue-600 font-medium">Completed</div>;
    }
    
    if (duel.player2 && duel.player2.userId === playerId && duel.player2.hasSubmitted) {
      return <div className="text-blue-600 font-medium">Completed</div>;
    }
    
    if (duel.status === DuelStatus.CANCELLED) {
      return (
        <div className="text-red-600 font-medium flex items-center">
          <XCircle size={18} className="mr-1" />
          Cancelled
        </div>
      );
    }
    
    return <div className="text-gray-600">In Progress</div>;
  };

  return (
    <Card variant="elevated" className="mb-4">
      <CardHeader>
        <CardTitle>Duel Status</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <User size={18} className="mr-2 text-blue-600" />
                <span className="font-medium">{duel.player1.username}</span>
              </div>
              {getPlayerStatus(duel.player1.userId)}
            </div>
            
            {duel.player1.submissionTime && (
              <div className="text-sm text-gray-600 ml-6">
                Submitted at {formatTime(duel.player1.submissionTime)}
              </div>
            )}
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <User size={18} className="mr-2 text-red-600" />
                <span className="font-medium">
                  {duel.player2 ? duel.player2.username : 'Waiting for opponent...'}
                </span>
              </div>
              {duel.player2 && getPlayerStatus(duel.player2.userId)}
            </div>
            
            {duel.player2 && duel.player2.submissionTime && (
              <div className="text-sm text-gray-600 ml-6">
                Submitted at {formatTime(duel.player2.submissionTime)}
              </div>
            )}
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <Clock size={16} className="mr-2" />
              <span>Started: {formatTime(duel.startTime)}</span>
            </div>
            
            {duel.endTime && (
              <>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <Clock size={16} className="mr-2" />
                  <span>Ended: {formatTime(duel.endTime)}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={16} className="mr-2" />
                  <span>Duration: {formatDuration()}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};