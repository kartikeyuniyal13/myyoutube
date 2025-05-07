import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appslice';
import ReactPlayer from 'react-player';
import { useSearchParams } from 'react-router-dom';
import { API_Key, channel_URL } from '../utils/constant';
import CommentCard from './CommentCard';
import LiveCommentsContainer from './LiveCommentsContainer';

const WatchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('v');
  const [comments, setComments] = useState([]);
  const [videoData, setVideoData] = useState(null);
  const [commentsNo, setCommentsNo] = useState(0);
  const [channelThumbnail, setChannelThumbnail] = useState('');
  const [channelStats, setChannelStats] = useState(null);

  useEffect(() => {
    dispatch(closeMenu());
    getComments();
    fetchVideoDetails();
  }, [dispatch, id]);

  const fetchVideoDetails = async () => {
    try {
      const vidData = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${API_Key}`);
      const jsonVidData = await vidData.json();
      setVideoData(jsonVidData);
      
      // Fetch channel thumbnail and stats
      if (jsonVidData.items?.[0]?.snippet?.channelId) {
        const channelData = await fetch(`${channel_URL}id=${jsonVidData.items[0].snippet.channelId}&part=snippet,statistics&key=${API_Key}`);
        const channelJson = await channelData.json();
        setChannelThumbnail(channelJson.items?.[0]?.snippet?.thumbnails?.default?.url);
        setChannelStats(channelJson.items?.[0]?.statistics);
      }
    } catch (error) {
      console.error('Error fetching video details:', error);
    }
  };

  const getComments = async () => {
    try {
      const dataComments = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${id}&key=${API_Key}`);
      const jsonComments = await dataComments.json();
      setComments(jsonComments.items);
      setCommentsNo(jsonComments.items.length);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="flex flex-col w-full px-4 py-6 bg-white mt-14">
      <div className="flex gap-6 max-w-[1600px] mx-auto w-full">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Video Player */}
          <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              playing={true}
              config={{
                youtube: {
                  playerVars: { modestbranding: 1 }
                }
              }}
            />
          </div>

          {/* Video Info */}
          {videoData && (
            <div className="mt-4">
              <h1 className="text-xl font-semibold">{videoData.items[0].snippet.title}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={channelThumbnail || "https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"} 
                      alt="channel" 
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{videoData.items[0].snippet.channelTitle}</p>
                      <p className="text-sm text-gray-500">
                        {channelStats ? formatNumber(parseInt(channelStats.subscriberCount)) + ' subscribers' : ''} • 
                        {formatNumber(parseInt(videoData.items[0].statistics.viewCount))} views • 
                        {new Date(videoData.items[0].snippet.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 font-medium">
                    Subscribe
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <i className="fa-solid fa-thumbs-up"></i>
                    <span>{formatNumber(parseInt(videoData.items[0].statistics.likeCount))}</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <i className="fa-solid fa-thumbs-down"></i>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <i className="fa-solid fa-share"></i>
                    <span>Share</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <i className="fa-solid fa-ellipsis"></i>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Video Description */}
          {videoData && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{formatNumber(parseInt(videoData.items[0].statistics.viewCount))} views</span>
                <span>•</span>
                <span>{new Date(videoData.items[0].snippet.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}</span>
              </div>
              <p className="mt-2 text-sm whitespace-pre-line">{videoData.items[0].snippet.description}</p>
            </div>
          )}

          {/* Comments Section */}
          <div className="mt-8">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold">{commentsNo} Comments</h2>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <i className="fa-solid fa-sort"></i>
                <span>Sort by</span>
              </button>
            </div>
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    icon={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                    textOriginal={comment.snippet.topLevelComment.snippet.textOriginal}
                    authorDisplayName={comment.snippet.topLevelComment.snippet.authorDisplayName}
                  />
                ))
              ) : (
                <p className="text-gray-500">No comments available.</p>
              )}
            </div>
          </div>
        </div>

        {/* Live Chat */}
        <div className="w-96 hidden lg:block">
          <div className="sticky top-20">
            <LiveCommentsContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;

