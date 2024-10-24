import React from 'react';

const ComingSoon = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 text-white bg-dark-blue">
      <div className="flex flex-col items-center justify-center max-w-md mx-auto text-center">
        <svg
          className="w-24 h-24 mb-4 animate-pulse"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-1h1v1zm0-3h-1V7h1v6zm-2-7h2v1h-2V6zm-6 6H2v6h2v-4h2v4h2v-6zm14 2h2v-6h-2v6z"
          />
        </svg>
        <h1 className="mb-4 text-3xl font-bold animate-bounce">Coming Soon</h1>
        <p className="mb-6 text-lg">
          We are working hard to bring you a fantastic new feature. Stay tuned!
        </p>
        <div className="px-4 py-2 mb-4 transition-colors border-2 rounded-full bg-slate-blue text-dark-blue border-slate-blue hover:bg-dark-blue hover:text-white">
          <a href="/dashboard" className="flex items-center text-lg font-semibold">
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </a>
        </div>
        <div className="px-4 py-2 transition-colors border-2 rounded-full bg-slate-blue text-dark-blue border-slate-blue hover:bg-dark-blue hover:text-white">
          <button className="text-lg font-semibold">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
