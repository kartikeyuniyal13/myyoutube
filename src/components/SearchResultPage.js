import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import { API_Key } from '../utils/constant';
import SearchResultCard from './SearchResultCard';
import { useDispatch } from 'react-redux';

const SearchResultPage = () => {
    const [searchData, setSearchData] = useState([]);
    const dispatch = useDispatch();
    const location = useLocation(); // Use useLocation hook to get location object

    // Extract and parse query parameter from location.search
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("search_query");

    // Function to fetch data from API
    const fetchData = async () => {
        try {
            const data = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${query}&maxResults=20&key=${API_Key}`);
            const jsond = await data.json();
            setSearchData(jsond.items || []);  // Set the fetched data to state or an empty array
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Fetch data on initial load and when query parameter changes
    useEffect(() => {
        if (query) {
            fetchData();
        }
    }, [query]);

    console.log(searchData);

    return (
        <div>
            {searchData.length > 0 && (
                <ul>
                    {searchData.map((item) => (
                        <li key={item.id.videoId}>
                            <SearchResultCard id={item.id.videoId} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchResultPage;