import React, { useState } from 'react';
import { Play, Clock } from 'lucide-react';
import { ProgrammingLanguage, SubmissionStatus } from '../../types';
import { Button } from '../ui/Button';

// Note: In a real implementation, you would import Monaco Editor
// For this mockup, we'll create a simplified version

interface CodeEditorProps {
  initialCode: string;
  language: ProgrammingLanguage;
  onLanguageChange: (language: ProgrammingLanguage) => void;
  onSubmit: (code: string, language: ProgrammingLanguage) => void;
  isSubmitting: boolean;
  submissionStatus: SubmissionStatus | null;
  timeLeft?: number; // in seconds
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  language,
  onLanguageChange,
  onSubmit,
  isSubmitting,
  submissionStatus,
  timeLeft
}) => {
  const [code, setCode] = useState(initialCode);
  
  const handleSubmit = () => {
    onSubmit(code, language);
  };

  const getFormattedTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const getStatusColor = (): string => {
    if (!submissionStatus) return '';
    
    switch (submissionStatus) {
      case SubmissionStatus.ACCEPTED:
        return 'text-green-600';
      case SubmissionStatus.WRONG_ANSWER:
      case SubmissionStatus.RUNTIME_ERROR:
      case SubmissionStatus.COMPILATION_ERROR:
        return 'text-red-600';
      case SubmissionStatus.TIME_LIMIT_EXCEEDED:
      case SubmissionStatus.MEMORY_LIMIT_EXCEEDED:
        return 'text-yellow-600';
      case SubmissionStatus.PENDING:
      case SubmissionStatus.RUNNING:
        return 'text-blue-600';
      default:
        return '';
    }
  };

  const getStatusText = (): string => {
    if (!submissionStatus) return '';
    
    switch (submissionStatus) {
      case SubmissionStatus.ACCEPTED:
        return 'Accepted';
      case SubmissionStatus.WRONG_ANSWER:
        return 'Wrong Answer';
      case SubmissionStatus.TIME_LIMIT_EXCEEDED:
        return 'Time Limit Exceeded';
      case SubmissionStatus.MEMORY_LIMIT_EXCEEDED:
        return 'Memory Limit Exceeded';
      case SubmissionStatus.RUNTIME_ERROR:
        return 'Runtime Error';
      case SubmissionStatus.COMPILATION_ERROR:
        return 'Compilation Error';
      case SubmissionStatus.PENDING:
        return 'Pending';
      case SubmissionStatus.RUNNING:
        return 'Running Tests...';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between items-center bg-gray-800 text-white p-3">
        <div className="flex items-center space-x-2">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as ProgrammingLanguage)}
            className="bg-gray-700 text-white border-none rounded px-2 py-1 text-sm"
            disabled={isSubmitting}
          >
            <option value={ProgrammingLanguage.JAVASCRIPT}>JavaScript</option>
            <option value={ProgrammingLanguage.PYTHON}>Python</option>
            <option value={ProgrammingLanguage.JAVA}>Java</option>
            <option value={ProgrammingLanguage.CPP}>C++</option>
            <option value={ProgrammingLanguage.CSHARP}>C#</option>
          </select>
          
          {submissionStatus && (
            <div className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {timeLeft !== undefined && (
            <div className="flex items-center text-sm">
              <Clock size={16} className="mr-1" />
              <span>{getFormattedTime(timeLeft)}</span>
            </div>
          )}
          
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Play size={16} />}
            isLoading={isSubmitting}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </div>
      
      <div className="flex-grow relative">
        {/* In a real implementation, this would be Monaco Editor */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full p-4 font-mono text-sm bg-gray-900 text-white resize-none focus:outline-none"
          spellCheck={false}
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
};