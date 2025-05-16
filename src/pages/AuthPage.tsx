import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Code } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';

type AuthView = 'login' | 'register';

export const AuthPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState<AuthView>('login');

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/duels" replace />;
  }

  const handleSuccess = () => {
    navigate('/duels');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Code size={40} className="text-indigo-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {view === 'login' ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {view === 'login'
              ? 'Sign in to access your duels and progress'
              : 'Join CodeBattle to start competing in coding duels'}
          </p>
        </div>
        
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {view === 'login' ? (
            <LoginForm
              onSuccess={handleSuccess}
              onRegisterClick={() => setView('register')}
            />
          ) : (
            <RegisterForm
              onSuccess={handleSuccess}
              onLoginClick={() => setView('login')}
            />
          )}
        </div>
      </div>
    </div>
  );
};