import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../utils/appslice';
import { Suggestion_URL } from '../utils/constant';
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
            const response = await fetch(`${Suggestion_URL}${searchQuery}`);
            const jsonSuggestions = await response.json();
            setSuggestions(jsonSuggestions[1]);
            dispatch(cachedResults({ [searchQuery]: jsonSuggestions[1] }));
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
        <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-300 shadow-md z-50">
            <div className="flex justify-between items-center p-2 max-w-screen-xl mx-auto">
                <div className="flex items-center">
                    <button
                        className="px-3 py-2 cursor-pointer rounded-full hover:bg-gray-100"
                        onClick={toggleMenuHandler}
                    >
                        <i className="fa-solid fa-bars fa-lg"></i>
                    </button>
                    <img
                        className="w-28 ml-4 hidden sm:block"
                        srcSet="https://i1.wp.com/gethsemanebaptistchurch.org/wp-content/uploads/2019/05/youtube-logo-png-transparent-image-5.png?ssl=1"
                        alt="youtube logo"
                    />
                    <img
                        className="w-10 ml-2 sm:hidden block"
                        srcSet="https://www.pngkit.com/png/full/2-21145_youtube-logo-transparent-png-pictures-transparent-background-youtube.png"
                        alt="youtube logo"
                    />
                </div>
                <div className="flex items-center relative w-full max-w-lg" ref={wrapperRef}>
                    <input
                        onChange={handleInputChange}
                        type="text"
                        value={searchQuery}
                        onFocus={openSuggestionBox}
                        className="px-5 py-2 w-full border border-gray-400 rounded-full focus:border-blue-400 outline-none"
                        placeholder="Search..."
                    />
                    {isSuggestionOpen && suggestions.length > 0 && (
                        <div className="absolute top-full mt-1 w-full bg-white py-2 px-4 border border-gray-400 rounded-lg shadow-lg">
                            <SuggestionBox
                                suggestions={suggestions}
                                isOpen={isSuggestionOpen}
                                handleSuggestionClick={handleSuggestionClick}
                                wrapperRef={wrapperRef}
                            />
                        </div>
                    )}
                    <Link
                        to={`/results?search_query=${searchQuery}`}
                        className="border py-2 px-3 sm:px-6 border-gray-400 rounded-r-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center"
                        onClick={closeSuggestionBox}
                    >
                        <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                    </Link>
                    <button className="px-3 py-1 ml-4 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                        <i className="fa-solid fa-microphone fa-lg"></i>
                    </button>
                </div>
                <div className="hidden md:block">me</div>
            </div>
        </header>
    );
};

export default Head;
