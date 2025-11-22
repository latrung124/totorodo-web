import React from 'react';

interface MonsterIconProps {
  active: boolean;
}

export const MonsterIcon: React.FC<MonsterIconProps> = ({ active }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`${active ? 'text-indigo-600' : 'text-gray-300'} transition-colors`}
  >
    <path 
      d="M12 2C8 2 6 4 6 8C6 11 4 12 3 14C2 16 4 18 6 19C6 20.5 7 22 9 22C11 22 12 20 13 20C14 20 15 22 17 22C19 22 20 20.5 20 19C22 18 24 16 23 14C22 12 20 11 20 8C20 4 18 2 12 2Z" 
      fill="currentColor"
    />
    <circle cx="9" cy="9" r="1.5" fill="white"/>
    <circle cx="15" cy="9" r="1.5" fill="white"/>
    <path 
      d="M10 14C11 15 13 15 14 14" 
      stroke="white" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
  </svg>
);
