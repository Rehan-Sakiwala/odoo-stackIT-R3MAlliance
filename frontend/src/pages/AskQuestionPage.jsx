import React, { useState } from 'react';
import RichTextEditor from '../components/common/RichTextEditor';
import TagInput from '../components/common/TagInput';

const AskQuestionPage = ({ onAsk, user, onAuthRequired }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!user) {
            onAuthRequired();
            return;
        }
        if (title && description && tags.length > 0) {
            onAsk({ title, description, tags });
            setTitle('');
            setDescription('');
            setTags([]);
        } else {
            console.error('Please fill out all fields and add at least one tag.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-6">Ask a Public Question</h1>
            <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 p-6 rounded-lg space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                    <p className="text-xs text-gray-500 mb-2">Be specific and imagine you’re asking a question to another person.</p>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 text-white bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Is there a JavaScript function to reverse a string?"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                     <p className="text-xs text-gray-500 mb-2">Include all the information someone would need to answer your question.</p>
                    <RichTextEditor value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                     <p className="text-xs text-gray-500 mb-2">Add up to 5 tags to describe what your question is about. Press Enter or comma to add a tag.</p>
                    <TagInput tags={tags} setTags={setTags} />
                </div>
                <div>
                    <button type="submit" className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                        Submit Your Question
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AskQuestionPage;