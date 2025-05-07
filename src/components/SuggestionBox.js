import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const SuggestionBox = ({ suggestions, isOpen, handleSuggestionClick, wrapperRef }) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                handleSuggestionClick(''); // Close suggestion box on click outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleSuggestionClick, isOpen, wrapperRef]);

    if (!isOpen) return null;

    return (
        <div className="w-full bg-white py-2 z-10" ref={wrapperRef}>
            <ul className="divide-y divide-gray-100">
                {suggestions && suggestions.length > 0 && suggestions.map((suggestion) => (
                    <li key={suggestion} className="hover:bg-gray-50">
                        <Link 
                            to={`/results?search_query=${suggestion}`} 
                            className="flex items-center px-4 py-2 cursor-pointer"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            <i className="fa-solid fa-magnifying-glass text-gray-500 mr-3"></i>
                            <span className="text-gray-700">{suggestion}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SuggestionBox;