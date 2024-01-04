import React, { useEffect, useState } from 'react'
import { URL } from '../utils/constant';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';

const VideoContainer = () => {
  const [videos, setVideos] = useState();

  useEffect(() => { getVideos() }, []);

  const getVideos = async () => {
    const data = await fetch(URL);
    const json = await data.json();
    //console.log(json)
    setVideos(json.items)


  }
  //console.log(videos)
  //console.log(videos[0].snippet.title)
  return (
    <div className='flex flex-wrap'>

      {
        videos && videos.map((item) => (
          <div key={item.id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2'>
            <Link to={"/watch?v=" + item.id} > <VideoCard item={item} /></Link>

          </div>
        ))

      }
    </div>
  )



}

export default VideoContainer