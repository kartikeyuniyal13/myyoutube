import React, { useEffect, useState, useRef, useCallback } from 'react';
import useVideoSearch from '../utils/useVideoSearch';
import { URL, API_Key } from '../utils/constant';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';

const VideoContainer = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("CDIQAA");

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}?pageToken=${nextPageToken}&key=${API_Key}`);
      const data = await response.json();
      console.log("data",data)

      setVideos((prevVideos) => [...prevVideos, ...data.items]);
      setNextPageToken(data.nextPageToken);
      console.log("next page token fetchdata:",nextPageToken)
      setLoading(false);
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      // Cleanup logic if needed
    };
  }, [nextPageToken]);

  const observer = useRef();
  const lastBookElementRef = useCallback((node) => {
    if (loading || !node) return;
  
    if (observer.current) observer.current.disconnect();
  
    observer.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting && nextPageToken !== null) {
        try {
          // Fetch the next page when intersection occurs
          await fetchData();
  
          // nextPageToken has been updated by fetchData, use it directly
          // Set the next page token here
          // Assuming nextPageToken is a state variable
          // setNextPageToken(data.nextPageToken); // Remove this line
        } catch (error) {
          console.error("Error fetching next page:", error);
        }
      }
    });
  
    observer.current.observe(node);
  
    // Cleanup observer when the component unmounts
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, nextPageToken]);
    return (
    <div className='flex flex-wrap'>
      {videos.map((item, index) => (
        <div key={item.id} ref={index === videos.length - 1 ? lastBookElementRef : null} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2'>
          <Link to={"/watch?v=" + item.id}>
            <VideoCard item={item} />
          </Link>
        </div>
      ))}

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default VideoContainer;
