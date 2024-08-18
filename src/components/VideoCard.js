import React, { useState, useEffect } from 'react';
import { channel_URL, API_Key } from '../utils/constant';

const VideoCard = ({ item }) => {
    //console.log(item)
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
        <div className='w-80 p-3 grow cursor-pointer'>
            <img
                src={thumbnailUrl}
                alt={item?.snippet?.localized?.title}
                className='w-full rounded-lg transition-all ease-in delay-100 hover:scale-105'
            />
            <div className="flex mt-3">
                <img
                    className='rounded-full h-10 w-10'
                    src={channelThumbnail}
                    alt="userimage"
                />
                <div className="ml-3">
                    <div className='text-sm font-semibold line-clamp-2'>
                        {title}
                    </div>
                    <div className="text-gray-600 text-xs mt-1">
                        <div>
                            {item?.snippet?.channelTitle}
                        </div>
                        <div className='mt-1'>
                            {Math.round(item?.statistics?.viewCount / 1000) + 'K Views'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;