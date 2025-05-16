import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LoginForm } from './auth/LoginForm';
import { RegisterForm } from './auth/RegisterForm';

type AuthView = 'login' | 'register';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<AuthView>('login');

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        ></div>
        
        {/* Modal */}
        <div className="transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-md">
          <div className="relative p-6">
            {/* Close button */}
            <button
              type="button"
              className="absolute top-4 right-4 rounded-full p-1 hover:bg-gray-100"
              onClick={onClose}
            >
              <X size={20} className="text-gray-500" />
            </button>
            
            {/* Title */}
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
              {view === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </h2>
            
            {/* Form */}
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
    </div>
  );
};