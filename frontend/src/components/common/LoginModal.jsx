import React from 'react';
import { XIcon } from '../icons/Icons';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
            <div className="bg-gray-800 rounded-lg p-8 shadow-xl max-w-sm w-full text-center relative">
                 <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-white">
                    <XIcon />
                </button>
                <h2 className="text-2xl font-bold mb-4">Login Required</h2>
                <p className="text-gray-400 mb-6">You need to be logged in to perform this action.</p>
                <button 
                    onClick={onLogin} 
                    className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Login Now
                </button>
            </div>
        </div>
    );
};

export default LoginModal;