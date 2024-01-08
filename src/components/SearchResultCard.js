import React from 'react'
import { useEffect,useState } from 'react';
import { API_Key } from '../utils/constant';

const SearchResultCard = ({id}) => {


    const [videoData,setVideoData]=useState();

    const fetchVideoDetails = async () => {
        try {
          //console.log("func called");
          const vidData = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${API_Key}`);
          const jsonVidData = await vidData.json();
          console.log("vid data",jsonVidData);
          setVideoData(jsonVidData);
        } catch (error) {
          console.error('Error fetching video details:', error);
        }
      };
      

      useEffect(()=>{
        fetchVideoDetails();

      },[id]);

 
    return (
        <div className='flex'>
          {videoData && videoData.items && videoData.items.length > 0 && (
            <>
              <img src={videoData.items[0].snippet.thumbnails.default.url} alt="Thumbnail" />
              <div>
                <span>{videoData.items[0].snippet.title}</span>
                <div>Description</div>
              </div>
            </>
          )}
        </div>
      );
      
  
}

export default SearchResultCard