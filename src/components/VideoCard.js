import React, { useState, useEffect } from 'react';
import { channel_URL, API_Key } from '../utils/constant';
import { Link } from 'react-router-dom';

const VideoCard = ({ item }) => {
    const [channelThumbnail, setChannelThumbnail] = useState('');
    const title = item?.snippet?.title;
    const thumbnailUrl = item?.snippet?.thumbnails?.high?.url;
    const channelTitle = item?.snippet?.channelTitle;
    const publishedAt = new Date(item?.snippet?.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    const viewCount = item?.statistics?.viewCount ? 
        parseInt(item.statistics.viewCount) >= 1000000 ? 
            (parseInt(item.statistics.viewCount) / 1000000).toFixed(1) + 'M' :
            (parseInt(item.statistics.viewCount) / 1000).toFixed(1) + 'K' 
        : 'No views';

    const formatDuration = (duration) => {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        
        const hours = (match[1] || '').replace('H', '');
        const minutes = (match[2] || '').replace('M', '');
        const seconds = (match[3] || '').replace('S', '');
        
        let result = '';
        
        if (hours) {
            result += hours + ':';
            result += minutes.padStart(2, '0') + ':';
        } else {
            result += minutes + ':';
        }
        
        result += seconds.padStart(2, '0');
        
        return result;
    };

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
        <Link to={`/watch?v=${item.id}`} className="block">
            <div className="group">
                {/* Thumbnail Container */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                    <img
                        src={thumbnailUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => e.target.src = 'https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg'}
                    />
                    {/* Video Duration */}
                    {item?.contentDetails?.duration && (
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
                            {formatDuration(item.contentDetails.duration)}
                        </div>
                    )}
                </div>

                {/* Video Info */}
                <div className="flex gap-3 mt-3">
                    {/* Channel Thumbnail */}
                    <div className="flex-shrink-0">
                        <img
                            className="w-9 h-9 rounded-full"
                            src={channelThumbnail || "https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"}
                            alt={channelTitle}
                            onError={(e) => e.target.src = "https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"}
                        />
                    </div>

                    {/* Video Details */}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                            {channelTitle}
                        </p>
                        <div className="text-sm text-gray-600">
                            {viewCount} views • {publishedAt}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;
