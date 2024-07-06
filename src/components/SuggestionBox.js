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
        <div className="w-72 fixed bg-white py-2 px-5 z-10" ref={wrapperRef}>
            <ul>
                {suggestions && suggestions.length > 0 && suggestions.map((suggestion) => (
                    <li key={suggestion}>
                        <Link to={`/results?search_query=${suggestion}`} className='someotherthing'>
                            <p onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SuggestionBox;