import React, { useState } from 'react';
import { BellIcon, SearchIcon } from '../icons/Icons';
import NotificationDropdown from './NotificationDropdown';

const Header = ({ onAskQuestion, onHome, notifications, setNotifications, user, onLogin, onLogout }) => {
    return (
        <header className="bg-gray-800/80 backdrop-blur-sm sticky top-0 z-30 border-b border-gray-700">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                        <button onClick={onHome} className="text-2xl font-bold text-white">
                           Stack<span className="text-blue-500">It</span>
                        </button>
                    </div>
                    <div className="flex-1 max-w-xl mx-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search questions..."
                                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <SearchIcon className="text-gray-400"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={onAskQuestion} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                            Ask Question
                        </button>
                        <NotificationDropdown notifications={notifications} setNotifications={setNotifications} />
                        <div className="w-px h-8 bg-gray-600"></div>
                        {user ? (
                            <div className="flex items-center gap-3">
                                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                                <div className="text-sm">
                                    <span className="font-medium text-white">{user.name}</span>
                                    <button onClick={onLogout} className="block text-blue-400 hover:text-blue-300">Logout</button>
                                </div>
                            </div>
                        ) : (
                             <button onClick={onLogin} className="px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;