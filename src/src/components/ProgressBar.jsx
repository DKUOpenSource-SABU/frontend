import React from 'react';
import LeaderboardTicker from './LeaderboardTicker';

const ProgressBar = ({ progress = 90 }) => {

  return (
    <div className="mt-12 flex flex-col justify-center opacity-0 animate-[fadeIn_0.4s_ease-out_forwards]">
      <div className="w-10 h-10 mx-auto border-4 border-[#00324D] border-t-transparent rounded-full animate-spin"></div>
      <div className='flex items-center justify-center'>
        <div className="w-1/2 bg-white p-4 rounded-lg relative">
          <div
            className="absolute bg-gray-200 h-4 rounded-full transition-all duration-500"
            style={{ width: `${100}%` }}
          ></div>
          <div
            className="absolute bg-[#1C8598] h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
          <p className="mt-6 text-center text-sm text-gray-600">{`Loading... ${progress}%`}</p>

        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
