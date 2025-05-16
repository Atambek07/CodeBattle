// User related types
export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  joinedAt: string;
  rating: number;
  wins: number;
  losses: number;
  totalDuels: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Task related types
export enum TaskDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isPublic: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: TaskDifficulty;
  timeLimit: number; // in seconds
  memoryLimit: number; // in MB
  sampleTestCases: TestCase[];
  createdAt: string;
  upvotes: number;
  downvotes: number;
}

// Programming languages
export enum ProgrammingLanguage {
  JAVASCRIPT = 'javascript',
  PYTHON = 'python',
  JAVA = 'java',
  CPP = 'cpp',
  CSHARP = 'csharp',
}

// Duel related types
export enum DuelStatus {
  WAITING = 'waiting',
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished',
  CANCELLED = 'cancelled',
}

export interface DuelPlayer {
  userId: string;
  username: string;
  avatarUrl?: string;
  isReady: boolean;
  hasSubmitted: boolean;
  hasCompleted: boolean;
  submissionTime?: string;
}

export interface Duel {
  id: string;
  status: DuelStatus;
  task: Task;
  player1: DuelPlayer;
  player2?: DuelPlayer;
  startTime?: string;
  endTime?: string;
  winnerId?: string;
  isPrivate: boolean;
  inviteCode?: string;
}

// Submission related types
export enum SubmissionStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  ACCEPTED = 'accepted',
  WRONG_ANSWER = 'wrong_answer',
  TIME_LIMIT_EXCEEDED = 'time_limit_exceeded',
  MEMORY_LIMIT_EXCEEDED = 'memory_limit_exceeded',
  RUNTIME_ERROR = 'runtime_error',
  COMPILATION_ERROR = 'compilation_error',
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  actualOutput?: string;
  timeUsed?: number; // in ms
  memoryUsed?: number; // in KB
  error?: string;
}

export interface Submission {
  id: string;
  userId: string;
  duelId: string;
  taskId: string;
  code: string;
  language: ProgrammingLanguage;
  status: SubmissionStatus;
  submittedAt: string;
  executionTime?: number; // in ms
  memoryUsed?: number; // in KB
  testResults?: TestResult[];
}

// Leaderboard related types
export interface LeaderboardEntry {
  position: number;
  userId: string;
  username: string;
  avatarUrl?: string;
  rating: number;
  wins: number;
  losses: number;
}