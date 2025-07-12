import React from 'react';
import Vote from '../components/common/Vote';

const HomePage = ({ questions, onQuestionSelect, setQuestions, user, onAuthRequired }) => {
    const handleVote = (questionId, voteChange) => {
        setQuestions(questions.map(q => 
            q.id === questionId ? { ...q, votes: q.votes + voteChange } : q
        ));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">All Questions</h1>
                <div className="flex items-center gap-2">
                    <span className="text-gray-400">Filter by:</span>
                    <select className="bg-gray-700 border border-gray-600 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Newest</option>
                        <option>Unanswered</option>
                        <option>Most Votes</option>
                    </select>
                </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg">
                {questions.map(q => (
                    <div key={q.id} className="flex gap-4 p-4 border-b border-gray-700 last:border-b-0">
                        <Vote 
                            votes={q.votes} 
                            onVote={(change) => handleVote(q.id, change)} 
                            user={user}
                            onAuthRequired={onAuthRequired}
                        />
                        <div className="flex-1">
                            <a href="#" onClick={(e) => { e.preventDefault(); onQuestionSelect(q.id); }} className="text-xl text-blue-400 hover:text-blue-300 font-semibold">{q.title}</a>
                            <div className="text-gray-400 text-sm mt-1 mb-3 line-clamp-2" dangerouslySetInnerHTML={{ __html: q.description }}></div>
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2">
                                    {q.tags.map(tag => <span key={tag} className="px-2 py-0.5 text-xs bg-gray-700 rounded-full">{tag}</span>)}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <img src={q.avatar} alt={q.author} className="w-6 h-6 rounded-full" />
                                    <span>{q.author} asked {q.createdAt}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center w-24">
                           <span className="font-bold text-lg">{q.answersCount}</span>
                           <span className="text-sm text-gray-400">answers</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;