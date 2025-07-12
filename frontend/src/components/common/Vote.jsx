import React, { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '../icons/Icons';

const Vote = ({ votes, onVote, user, onAuthRequired }) => {
    const [currentVote, setCurrentVote] = useState(0);

    const handleVote = (direction) => {
        if (!user) {
            onAuthRequired();
            return;
        }

        let newVote;
        if (direction === 'up') {
            newVote = currentVote === 1 ? 0 : 1;
        } else {
            newVote = currentVote === -1 ? 0 : -1;
        }
        
        const voteChange = newVote - currentVote;
        setCurrentVote(newVote);
        onVote(voteChange);
    };

    return (
        <div className="flex flex-col items-center">
            <button 
                onClick={() => handleVote('up')} 
                className={`p-1 rounded-md transition-colors duration-200 ease-in-out active:scale-110 ${
                    currentVote === 1 
                    ? 'text-green-500 bg-green-500/20' 
                    : 'text-gray-400 hover:bg-gray-700'
                }`}
            >
                <ChevronUpIcon />
            </button>
            <span className="py-1 text-lg font-bold">{votes}</span>
            <button 
                onClick={() => handleVote('down')} 
                className={`p-1 rounded-md transition-colors duration-200 ease-in-out active:scale-110 ${
                    currentVote === -1 
                    ? 'text-red-500 bg-red-500/20' 
                    : 'text-gray-400 hover:bg-gray-700'
                }`}
            >
                <ChevronDownIcon />
            </button>
        </div>
    );
};

export default Vote;