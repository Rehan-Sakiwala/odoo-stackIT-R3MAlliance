import React, { useState } from 'react';
import { BellIcon } from '../icons/Icons';

const NotificationDropdown = ({ notifications, setNotifications }) => {
    const [isOpen, setIsOpen] = useState(false);
    const unreadCount = notifications.filter(n => !n.read).length;

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if(!isOpen) {
            setTimeout(() => {
                 setNotifications(notifications.map(n => ({...n, read: true})));
            }, 2000);
        }
    };

    return (
        <div className="relative">
            <button onClick={handleToggle} className="relative text-gray-400 hover:text-white">
                <BellIcon />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                        {unreadCount}
                    </span>
                )}
            </button>
            {isOpen && (
                <div className="absolute right-0 z-20 w-80 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                    <div className="p-3 font-bold border-b border-gray-700">Notifications</div>
                    <ul>
                        {notifications.map(n => (
                            <li key={n.id} className={`p-3 border-b border-gray-700 last:border-b-0 ${!n.read ? 'bg-gray-700/50' : ''}`}>
                                <p className="text-sm">{n.text}</p>
                                <p className="text-xs text-gray-400">{n.time}</p>
                            </li>
                        ))}
                         {notifications.length === 0 && <li className="p-4 text-center text-gray-400">No new notifications</li>}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;