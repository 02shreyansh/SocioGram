import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <div className="mb-6 relative">
          <CircularProgress
            size={80}
            thickness={2}
            className="text-blue-500"
          />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl animate-spin">
            🤔
          </span>
        </div>
        <Typography variant="h4" component="h1" className="mb-4 text-gray-800">
          Page Not Found
        </Typography>
        <Typography variant="body1" className="mb-6 text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;