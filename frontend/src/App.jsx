import React, { useState } from 'react';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import AskQuestionPage from './pages/AskQuestionPage';
import LoginModal from './components/common/LoginModal';

// --- MOCK DATA ---
const mockUser = {
    name: 'Alex Doe',
    avatar: 'https://i.pravatar.cc/150?u=alexdoe',
};

const initialQuestions = [
    {
        id: 1,
        title: 'How to join 2 columns in a data set to make a separate column in SQL?',
        description: `<p>I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 which consists of First name, and column 2 consists of Last name. I want a column 3 to combine both.</p><p>I've tried using <code>CONCAT()</code> but I'm getting syntax errors. What's the right way to do this across different SQL dialects like MySQL and PostgreSQL?</p>`,
        author: 'John Carter',
        avatar: 'https://i.pravatar.cc/150?u=johncarter',
        createdAt: '2 days ago',
        votes: 12,
        answersCount: 2,
        tags: ['sql', 'database', 'query'],
        answers: [
            { id: 1, author: 'Sarah Jones', avatar: 'https://i.pravatar.cc/150?u=sarahjones', createdAt: '2 days ago', votes: 25, accepted: true, content: `<p>You're on the right track! The standard SQL way is using the concatenation operator <code>||</code>.</p><pre><code>SELECT first_name || ' ' || last_name AS full_name FROM your_table;</code></pre><p>For MySQL, you would use the <code>CONCAT()</code> function:</p><pre><code>SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM your_table;</code></pre><p>Both achieve the same result. The double pipe operator is more standard, but <code>CONCAT()</code> is very common too.</p>` },
            { id: 2, author: 'Mike Ross', avatar: 'https://i.pravatar.cc/150?u=mikeross', createdAt: '1 day ago', votes: 8, accepted: false, content: `<p>Just to add to the previous answer, if you're using SQL Server, you can also use the <code>+</code> operator for string concatenation:</p><pre><code>SELECT first_name + ' ' + last_name AS full_name FROM your_table;</code></pre><p>However, be careful with this, as it can lead to unexpected behavior if you're also working with numeric types. <code>CONCAT()</code> is generally safer.</p>` },
        ]
    },
    // ... other questions
];

const initialNotifications = [
    { id: 1, read: false, text: 'Sarah Jones answered your question "How to join 2 columns..."', time: '1h ago' },
    { id: 2, read: false, text: '@alexdoe mentioned you in a comment on "What is the difference..."', time: '3h ago' },
];


export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);
    const [questions, setQuestions] = useState(initialQuestions);
    const [notifications, setNotifications] = useState(initialNotifications);
    const [user, setUser] = useState(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleLogin = () => {
        setUser(mockUser);
        setIsLoginModalOpen(false);
    };

    const handleLogout = () => {
        setUser(null);
    };

    const handleAuthRequired = () => {
        setIsLoginModalOpen(true);
    };

    const handleAskRedirect = () => {
        if (!user) {
            handleAuthRequired();
        } else {
            setCurrentPage('ask');
        }
    };

    const handleNavigateHome = () => {
        setCurrentPage('home');
    };

    const handleSelectQuestion = (id) => {
        setSelectedQuestionId(id);
        setCurrentPage('question');
    };

    const handleAskQuestion = (newQuestionData) => {
        const newQuestion = {
            id: Date.now(),
            ...newQuestionData,
            author: user.name,
            avatar: user.avatar,
            createdAt: 'just now',
            votes: 0,
            answersCount: 0,
            answers: []
        };
        setQuestions([newQuestion, ...questions]);
        setCurrentPage('home');
    };

    const handleVote = (questionId, voteChange, answerId = null) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                if (answerId) {
                    const updatedAnswers = q.answers.map(a =>
                        a.id === answerId ? { ...a, votes: a.votes + voteChange } : a
                    );
                    return { ...q, answers: updatedAnswers };
                } else {
                    return { ...q, votes: q.votes + voteChange };
                }
            }
            return q;
        }));
    };
    
    const handlePostAnswer = (questionId, answerContent) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                const newAnswer = {
                    id: Date.now(),
                    author: user.name,
                    avatar: user.avatar,
                    createdAt: 'just now',
                    votes: 0,
                    accepted: false,
                    content: answerContent,
                };
                const updatedAnswers = [...q.answers, newAnswer];
                if (q.author !== user.name) {
                    setNotifications([
                        {id: Date.now(), read: false, text: `${user.name} answered your question "${q.title}"`, time: 'just now'},
                        ...notifications
                    ]);
                }
                return { ...q, answers: updatedAnswers, answersCount: updatedAnswers.length };
            }
            return q;
        }));
    };

    const handleAcceptAnswer = (questionId, answerId) => {
        setQuestions(questions.map(q => {
            if(q.id === questionId) {
                if (user && user.name === q.author) {
                    const updatedAnswers = q.answers.map(a => ({
                        ...a,
                        accepted: a.id === answerId
                    }));
                    return {...q, answers: updatedAnswers};
                }
            }
            return q;
        }))
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'question':
                const question = questions.find(q => q.id === selectedQuestionId);
                return <QuestionDetailPage
                            question={question}
                            onVote={handleVote}
                            onAnswer={handlePostAnswer}
                            onAcceptAnswer={handleAcceptAnswer}
                            user={user}
                            onAuthRequired={handleAuthRequired}
                            onNavigateHome={handleNavigateHome}
                        />;
            case 'ask':
                return <AskQuestionPage
                            onAsk={handleAskQuestion}
                            user={user}
                            onAuthRequired={handleAuthRequired}
                        />;
            case 'home':
            default:
                return <HomePage
                            questions={questions}
                            onQuestionSelect={handleSelectQuestion}
                            setQuestions={setQuestions}
                            user={user}
                            onAuthRequired={handleAuthRequired}
                        />;
        }
    };

    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen font-sans">
            <Header
                onAskQuestion={handleAskRedirect}
                onHome={handleNavigateHome}
                notifications={notifications}
                setNotifications={setNotifications}
                user={user}
                onLogin={() => setIsLoginModalOpen(true)}
                onLogout={handleLogout}
            />
            <main>
                {renderPage()}
            </main>
            <footer className="bg-gray-800 border-t border-gray-700 mt-12">
                <div className="container mx-auto px-4 py-6 text-center text-gray-500">
                    <p>&copy; 2025 StackIt. A minimal Q&A platform.</p>
                </div>
            </footer>
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLogin={handleLogin}
            />
        </div>
    );
}