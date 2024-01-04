import React, { useEffect, useState } from 'react';
import { URL, API_Key } from '../utils/constant';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState('');
  const [loading, setLoading] = useState(false);

  const getVideos = async () => {
    try {
      setLoading(true);
      const data = await fetch(`${URL}?pageToken=${pageToken}&key=${API_Key}`);
      console.log("pagetoe", pageToken);
      const json = await data.json();

      console.log("json:", json);

      if (json.items && Symbol.iterator in Object(json.items)) {
        setVideos((prevVideos) => [...prevVideos, ...json.items]);
      } else {
        console.error("Invalid or non-iterable json.items:", json.items);
      }

      setPageToken(json.nextPageToken);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVideos();
  }, [pageToken]);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const isAtBottom = scrollTop + windowHeight >= documentHeight - 20;

    if (isAtBottom && pageToken && !loading) {
      getVideos();
    }
  };

 

  return (
    <div className='flex flex-wrap'>
      {videos.map((item) => (
        <div key={item.id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2'>
          <Link to={"/watch?v=" + item.id}><VideoCard item={item} /></Link>
        </div>
      ))}

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default VideoContainer;
