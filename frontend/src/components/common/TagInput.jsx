import React, { useState } from 'react';
import { XIcon } from '../icons/Icons';

const TagInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = inputValue.trim().toLowerCase();
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
            }
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2 p-2 bg-gray-800 border border-gray-600 rounded-lg">
                {tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 px-2 py-1 text-sm bg-blue-600 rounded-full">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="text-blue-200 hover:text-white">
                            <XIcon width={16} height={16} />
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add tags..."
                    className="flex-grow p-1 bg-transparent focus:outline-none"
                />
            </div>
        </div>
    );
};

export default TagInput;