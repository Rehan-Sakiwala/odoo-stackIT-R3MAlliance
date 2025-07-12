import React from 'react';
import { ChevronRightIcon } from '../icons/Icons';

const Breadcrumb = ({ onNavigateHome, title }) => {
    const truncatedTitle = title.length > 50 ? `${title.substring(0, 50)}...` : title;
    return (
        <nav className="flex items-center text-sm text-gray-400 mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <button onClick={onNavigateHome} className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-blue-500">
                        Questions
                    </button>
                </li>
                <li>
                    <div className="flex items-center">
                        <ChevronRightIcon />
                        <span className="ms-1 text-sm font-medium text-gray-200 md:ms-2">{truncatedTitle}</span>
                    </div>
                </li>
            </ol>
        </nav>
    );
};

export default Breadcrumb;