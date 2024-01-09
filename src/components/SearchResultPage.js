import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { API_Key } from '../utils/constant';
import SearchResultCard from './SearchResultCard';
import { useDispatch, useSelector } from 'react-redux';
import { closeSuggestions } from '../utils/querysuggestionslice';

const SearchResultPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("search_query");
    const [searchData, setSearchData] = useState([]);

    const dispatch=useDispatch;



    const datafetch = async () => {
        try {
            const data = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${query}&maxResults=20&key=${API_Key}`);
            const jsond = await data.json();
            setSearchData(jsond.items || []);  // Set the fetched data to state or an empty array
           
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        datafetch();
      
    }, [query]);  // Run the effect when the query parameter changes
    
    console.log(searchData);
    return (
        <div>
            {searchData.length > 0 && (
                <ul>
                    {searchData.map((item) => (
                        <li key={item.id.videoId}><SearchResultCard id={item.id.videoId}/></li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchResultPage;
