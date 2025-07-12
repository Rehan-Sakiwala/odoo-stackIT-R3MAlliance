import React, { useState } from 'react';
import Vote from '../components/common/Vote';
import RichTextEditor from '../components/common/RichTextEditor';
import Breadcrumb from '../components/common/Breadcrumb';
import { CheckIcon } from '../components/icons/Icons';

const QuestionDetailPage = ({ question, onVote, onAnswer, onAcceptAnswer, user, onAuthRequired, onNavigateHome }) => {
    const [newAnswer, setNewAnswer] = useState('');
    
    const handleSubmitAnswer = (e) => {
        e.preventDefault();
        if (!user) {
            onAuthRequired();
            return;
        }
        if (newAnswer.trim()) {
            onAnswer(question.id, newAnswer);
            setNewAnswer('');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb onNavigateHome={onNavigateHome} title={question.title} />
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">{question.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Asked {question.createdAt}</span>
                    <div className="flex items-center gap-2">
                        <img src={question.avatar} alt={question.author} className="w-6 h-6 rounded-full" />
                        <span>{question.author}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-8">
                <div className="w-full">
                    <div className="flex gap-4 pb-6 border-b border-gray-700">
                        <Vote 
                            votes={question.votes} 
                            onVote={(change) => onVote(question.id, change, null)} 
                            user={user}
                            onAuthRequired={onAuthRequired}
                        />
                        <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: question.description }}></div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        {question.tags.map(tag => <span key={tag} className="px-2 py-0.5 text-xs bg-gray-700 rounded-full">{tag}</span>)}
                    </div>

                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">{question.answers.length} Answers</h2>
                    
                    <div className="space-y-6">
                        {question.answers.map(answer => (
                             <div key={answer.id} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <Vote 
                                        votes={answer.votes} 
                                        onVote={(change) => onVote(question.id, change, answer.id)} 
                                        user={user}
                                        onAuthRequired={onAuthRequired}
                                    />
                                    {answer.accepted && (
                                        <div className="mt-2 text-green-500" title="Accepted Answer">
                                            <CheckIcon />
                                        </div>
                                    )}
                                    {user && !answer.accepted && (
                                        <button onClick={() => onAcceptAnswer(question.id, answer.id)} className="mt-2 text-gray-500 hover:text-green-500" title="Accept this answer">
                                            <CheckIcon />
                                        </button>
                                    )}
                                </div>
                                <div className="flex-1 pb-6 border-b border-gray-700">
                                    <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: answer.content }}></div>
                                    <div className="flex justify-end items-center gap-2 text-sm text-gray-500 mt-4">
                                        <img src={answer.avatar} alt={answer.author} className="w-6 h-6 rounded-full" />
                                        <span>{answer.author} answered {answer.createdAt}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-2xl font-bold text-white mt-12 mb-4">Your Answer</h3>
                    <form onSubmit={handleSubmitAnswer}>
                        <RichTextEditor value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} />
                        <button type="submit" className="mt-4 px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                            Post Your Answer
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default QuestionDetailPage;