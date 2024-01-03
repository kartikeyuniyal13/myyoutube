import React from 'react'

const VideoCard = ({item}) => {

    const title=item.snippet.title;
    const thumbnailUrl = item.snippet && item.snippet.thumbnails && item.snippet.thumbnails.standard && item.snippet.thumbnails.standard.url;
  return (
    <div >
        <div>
         <img alt="thumbnail" className="rounded-md" src={thumbnailUrl}/>
        </div>
        <div>
         {title}
        </div>
    </div>
  )
}

export default VideoCard