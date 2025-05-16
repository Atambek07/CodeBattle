import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <AlertCircle size={64} className="mx-auto text-indigo-600" />
        <h1 className="mt-6 text-4xl font-extrabold text-gray-900">Page not found</h1>
        <p className="mt-3 text-xl text-gray-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link to="/">
            <Button variant="primary" size="lg">
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};