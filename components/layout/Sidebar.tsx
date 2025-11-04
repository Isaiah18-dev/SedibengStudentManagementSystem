import React from 'react';
import { View } from '../../types';
import { NAVIGATION_ITEMS, ICONS } from '../../constants';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const NavLink: React.FC<{
    item: { view: View; icon: React.ReactElement };
    isActive: boolean;
    onClick: () => void;
}> = ({ item, isActive, onClick }) => (
    <li>
        <button
            onClick={onClick}
            className={`flex items-center p-3 my-1 rounded-lg w-full text-left transition-colors duration-200 ${
                isActive
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {item.icon}
            </svg>
            <span className="ml-3 font-medium">{item.view}</span>
        </button>
    </li>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isSidebarOpen, setSidebarOpen }) => {
    
    const handleNavigation = (view: View) => {
        setCurrentView(view);
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

    return (
        <>
            <aside className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 h-16">
                    <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Sedibeng</h1>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">{ICONS.CLOSE}</svg>
                    </button>
                </div>
                <div className="h-full px-3 py-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {NAVIGATION_ITEMS.map((item) => (
                            <NavLink 
                                key={item.view}
                                item={item}
                                isActive={currentView === item.view}
                                onClick={() => handleNavigation(item.view)}
                            />
                        ))}
                    </ul>
                </div>
            </aside>
            {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>}
        </>
    );
};

export default Sidebar;