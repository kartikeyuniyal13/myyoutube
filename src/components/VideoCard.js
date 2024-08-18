import React, { useState, useEffect } from 'react';
import { channel_URL, API_Key } from '../utils/constant';

const VideoCard = ({ item }) => {
    const [channelThumbnail, setChannelThumbnail] = useState('');
    const title = item?.snippet?.title;
    const thumbnailUrl = item?.snippet?.thumbnails?.high?.url;

    useEffect(() => {
        const fetchChannelThumbnail = async () => {
            try {
                const response = await fetch(`${channel_URL}?part=snippet&id=${item.snippet.channelId}&key=${API_Key}`);
                const json = await response.json();
                const thumbnail = json.items[0]?.snippet?.thumbnails?.default?.url;
                setChannelThumbnail(thumbnail);
            } catch (error) {
                console.error('Error fetching channel thumbnail:', error);
            }
        };

        if (item.snippet.channelId) {
            fetchChannelThumbnail();
        }
    }, [item.snippet.channelId]);

    return (
        <div className='w-80 p-3 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105'>
            <img
                src={thumbnailUrl}
                alt={title}
                className='w-full h-48 object-cover rounded-lg'
                onError={(e) => e.target.src = 'fallback-thumbnail-url.jpg'} // Fallback image
            />
            <div className="flex items-start mt-3">
                <img
                    className='rounded-full h-12 w-12'
                    src={channelThumbnail}
                    alt="Channel Thumbnail"
                    onError={(e) => e.target.src = 'fallback-channel-thumbnail-url.jpg'} // Fallback image
                />
                <div className="ml-3 flex-1">
                    <div className='text-lg font-semibold line-clamp-2'>
                        {title}
                    </div>
                    <div className="text-gray-600 text-sm mt-1">
                        <div>
                            {item?.snippet?.channelTitle}
                        </div>
                        <div className='mt-1'>
                            {item?.statistics?.viewCount ? Math.round(item?.statistics?.viewCount / 1000) + 'K Views' : 'No Views'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
