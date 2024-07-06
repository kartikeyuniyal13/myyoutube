import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../utils/appslice';
import { API_Key, Suggestion_URL } from '../utils/constant';
import { cachedResults } from '../utils/searchslice';
import { Link, useNavigate } from 'react-router-dom';
import SuggestionBox from './SuggestionBox';
import { toggleSuggestions, openSuggestions, closeSuggestions } from '../utils/querysuggestionslice';

const Head = () => {
    const isSuggestionOpen = useSelector((store) => store.query.isSuggestionOpen);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wrapperRef = useRef(null);

    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    };

    const suggestionBoxHandler = () => {
        dispatch(toggleSuggestions());
    };

    const openSuggestionBox = () => {
        dispatch(openSuggestions());
    };

    const closeSuggestionBox = () => {
        dispatch(closeSuggestions());
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [dummySuggestions, setDummySuggestions] = useState([]);

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

    const getSuggestions = async () => {
        const dataSuggestions = await fetch(Suggestion_URL + searchQuery);
        const jsonSuggestions = await dataSuggestions.json();
        setSuggestions(jsonSuggestions[1]);
        setDummySuggestions(jsonSuggestions[1]);

        dispatch(cachedResults({
            [searchQuery]: jsonSuggestions[1]
        }));
    };

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
    }, [searchQuery]);

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            closeSuggestionBox();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex justify-between border border-solid border-black">
            <div className="flex justify-between">
                <button className='px-3 py-2 cursor-pointer rounded-full hover:bg-gray-100' onClick={toggleMenuHandler}>
                    <i className="fa-solid fa-bars fa-lg"></i>
                </button>
                <img className='w-28 ml-4 hidden sm:block' srcSet="https://i1.wp.com/gethsemanebaptistchurch.org/wp-content/uploads/2019/05/youtube-logo-png-transparent-image-5.png?ssl=1" alt="youtube logo" />
                <img className='w-10 ml-2 sm:hidden block' srcSet="https://www.pngkit.com/png/full/2-21145_youtube-logo-transparent-png-pictures-transparent-background-youtube.png" alt="youtube logo" />
            </div>
            <div className="flex" ref={wrapperRef}>
                <div>
                    <input
                        onChange={handleInputChange}
                        type="text"
                        value={searchQuery}
                        onFocus={openSuggestionBox}
                        className='px-5 py-2 w-full sm:block border border-gray-400 rounded-full rounded-e-none focus:border-blue-400 outline-none broder'
                    />
                    {isSuggestionOpen && suggestions && suggestions.length > 0 && (
                        <div className="w-72 fixed bg-white py-2 px-5 z-10">
                        <SuggestionBox
                suggestions={suggestions} 
                isOpen={isSuggestionOpen} 
                handleSuggestionClick={handleSuggestionClick}
                wrapperRef={wrapperRef} 
            />
                        </div>
                    )}
                </div>
                <Link
                    to={`/results?search_query=${searchQuery}`}
                    className='border py-2 px-3 sm:px-6 border-gray-400 rounded-full rounded-s-none border-s-0 bg-gray-50 hover:drop-shadow-sm hover:bg-gray-100'
                    onClick={closeSuggestionBox}
                >
                    <i className="fa-solid fa-magnifying-glass fa-regular"></i>
                </Link>
                <button className='px-3 py-1 ml-4 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200'>
                    <i className="fa-solid fa-microphone fa-lg"></i>
                </button>
            </div>
            <div>me</div>
        </div>
    );
};

export default Head;