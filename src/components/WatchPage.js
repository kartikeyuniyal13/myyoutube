import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appslice';
import ReactPlayer from 'react-player';
import { useSearchParams } from 'react-router-dom';
import { API_Key } from '../utils/constant';
import CommentCard from './CommentCard';
import LiveCommentsContainer from './LiveCommentsContainer';

const WatchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('v');
  const [comments, setComments] = useState([]);
  const [videoData, setVideoData] = useState(null); // Initialize as null
  const [commentsNo, setCommentsNo] = useState(0);

  useEffect(() => {
    dispatch(closeMenu());
    getComments();
    fetchVideoDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  const fetchVideoDetails = async () => {
    try {
      console.log("func called");
      const vidData = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${API_Key}`);
      const jsonVidData = await vidData.json();
      console.log(jsonVidData);
      setVideoData(jsonVidData);
    } catch (error) {
      console.error('Error fetching video details:', error);
    }
  };

  const getComments = async () => {
    try {
      console.log("func comm called");
      const dataComments = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${id}&key=${API_Key}`);
      const jsonComments = await dataComments.json();

      // console.log(jsonComments);
      setComments(jsonComments.items);
      setCommentsNo(jsonComments.items.length);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  return (
    <div className="flex w-3/4">
      <div>
        <div className='flex'>
          <div>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="1000px"
              height="500px"
              style={{ backgroundColor: '#000000' }}
              playing={true}
            />
            {videoData && (
              <span>
                <b className='text-2xl'>{videoData.items[0].snippet.title}</b>
              </span>
            )}
          </div>
          <div className='w-96 border border-l-amber-950'>
            <LiveCommentsContainer />
          </div>
        </div>
        <div>
          <div>
            <b className='m-3 text-xl'>{commentsNo} Comments</b>
          </div>
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
            <p>No comments available.</p>
          )}
        </div>
      </div>
      <div>{/* Other content goes here */}</div>
    </div>
  );
};

export default WatchPage;
