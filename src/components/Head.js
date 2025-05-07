import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../utils/appslice';
import { Suggestion_URL, API_Key } from '../utils/constant';
import { cachedResults } from '../utils/searchslice';
import { Link, useNavigate } from 'react-router-dom';
import SuggestionBox from './SuggestionBox';
import { openSuggestions, closeSuggestions } from '../utils/querysuggestionslice';

const Head = () => {
    const isSuggestionOpen = useSelector((store) => store.query.isSuggestionOpen);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wrapperRef = useRef(null);

    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    };

    const openSuggestionBox = () => {
        dispatch(openSuggestions());
    };

    const closeSuggestionBox = () => {
        dispatch(closeSuggestions());
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setSuggestions([]); // Clear suggestions
        closeSuggestionBox();
        navigate(`/results?search_query=${suggestion}`);
    };

    // Event handler for input change
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const getSuggestions = useCallback(async () => {
        try {
            const response = await fetch(`${Suggestion_URL}${searchQuery}&key=${API_Key}`);
            const jsonSuggestions = await response.json();
            const suggestions = jsonSuggestions.items?.map(item => item.snippet.title) || [];
            setSuggestions(suggestions);
            dispatch(cachedResults({ [searchQuery]: suggestions }));
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    }, [searchQuery, dispatch]);

    const searchCache = useSelector((store) => store.search);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
            } else {
                getSuggestions();
            }
        }, 200);

        return () => {
            clearTimeout(timer);
        };
    }, [searchQuery, searchCache, getSuggestions]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                closeSuggestionBox();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeSuggestionBox]);

    return (
        <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-sm z-50">
            <div className="flex justify-between items-center px-4 h-14 max-w-screen-xl mx-auto">
                <div className="flex items-center gap-4">
                    <button
                        className="p-2 hover:bg-gray-100 rounded-full"
                        onClick={toggleMenuHandler}
                    >
                        <i className="fa-solid fa-bars text-xl"></i>
                    </button>
                    <Link to="/" className="flex items-center">
                        <img
                            className="h-5 hidden sm:block"
                            src="https://www.youtube.com/s/desktop/12d6b690/img/favicon_144x144.png"
                            alt="youtube logo"
                        />
                        <span className="text-xl font-medium ml-1 hidden sm:block">YouTube</span>
                    </Link>
                </div>

                <div className="flex items-center flex-1 max-w-2xl mx-4" ref={wrapperRef}>
                    <div className="flex flex-1 items-center">
                        <input
                            onChange={handleInputChange}
                            type="text"
                            value={searchQuery}
                            onFocus={openSuggestionBox}
                            className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
                            placeholder="Search"
                        />
                        <Link
                            to={`/results?search_query=${searchQuery}`}
                            className="px-6 py-2 border border-l-0 border-gray-300 rounded-r-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center"
                            onClick={closeSuggestionBox}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Link>
                    </div>
                    <button className="ml-4 p-2 hover:bg-gray-100 rounded-full">
                        <i className="fa-solid fa-microphone text-xl"></i>
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <i className="fa-solid fa-video text-xl"></i>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <i className="fa-solid fa-bell text-xl"></i>
                    </button>
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                        <i className="fa-solid fa-user text-gray-600"></i>
                    </div>
                </div>
            </div>
            {isSuggestionOpen && suggestions.length > 0 && (
                <div className="absolute top-14 left-0 right-0 max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg shadow-lg">
                    <SuggestionBox
                        suggestions={suggestions}
                        isOpen={isSuggestionOpen}
                        handleSuggestionClick={handleSuggestionClick}
                        wrapperRef={wrapperRef}
                    />
                </div>
            )}
        </header>
    );
};

export default Head;
