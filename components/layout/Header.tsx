
import React from 'react';
import { View } from '../../types';
import { ICONS } from '../../constants';

interface HeaderProps {
  currentView: View;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, toggleSidebar }) => {
  return (
    <header className="sticky top-0 bg-white dark:bg-gray-800/80 backdrop-blur-sm shadow-sm z-20 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="md:hidden mr-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">{ICONS.MENU}</svg>
        </button>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{currentView}</h2>
      </div>
      <div className="flex items-center">
        {/* Placeholder for user profile or actions */}
        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </header>
  );
};

export default Header;
