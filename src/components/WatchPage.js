import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../utils/appslice';
import ReactPlayer from 'react-player';
import { useSearchParams } from 'react-router-dom';

const WatchPage = () => {
    const dispatch=useDispatch();
    const [searchParams]=useSearchParams();
    const id=searchParams.get("v");
    useEffect(()=>{
    dispatch(closeMenu())
    },[])


    const getComments = async () => {
        const data = await fetch();
        const json = await data.json();
        console.log(json)
        setVideos(json.items)
    
    
      }
  return (
    <div className='flex'>
        <div>
            <div>
         <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="1200px"
              height="600px"
              style={{ backgroundColor: "#000000" }}
              playing={true}
            />

            </div>

            <div>
                  
            </div>
        </div>
        <div>

        </div>
    </div>
  )
}

export default WatchPage