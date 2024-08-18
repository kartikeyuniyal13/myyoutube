import React, { useState, useEffect, useRef, useCallback } from 'react';
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

      setVideos((prevVideos) => [...prevVideos, ...data.items]);
      setNextPageToken(data.nextPageToken);
      setLoading(false);
    } catch (e) {
      setError(true);
    }
  };

  useEffect( () => {
   fetchData();
  }, [nextPageToken]);

  const observer = useRef();
  const lastVideoElementRef = useCallback((node) => {
    if (loading || !node) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting && nextPageToken) {
        await fetchData();
      }
    });

    observer.current.observe(node);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, nextPageToken]);

  return (
    <div className='container mx-auto px-4 py-6'>
      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {videos.map((item, index) => (
          <div
            key={item.id}
            ref={index === videos.length - 1 ? lastVideoElementRef : null}
            className='bg-white shadow-md rounded-lg p-3 transition-transform transform hover:scale-105'
          >
            <Link to={`/watch?v=${item.id}`}>
              <VideoCard item={item} />
            </Link>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-6">
          <p className='text-gray-600'>Loading...</p>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center mt-6">
          <p className='text-red-600'>Error loading videos</p>
        </div>
      )}
    </div>
  );
};

export default VideoContainer;
