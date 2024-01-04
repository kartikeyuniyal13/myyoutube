import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appslice';
import ReactPlayer from 'react-player';
import { useSearchParams } from 'react-router-dom';
import { API_Key } from '../utils/constant';
import CommentCard from './CommentCard';
import LiveComments from './LiveCommentsCard';
import LiveCommentsContainer from './LiveCommentsContainer';

const WatchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('v');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    dispatch(closeMenu());
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  const getComments = async () => {
    try {
      const dataComments = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${id}&key=${API_Key}`);
      const jsonComments = await dataComments.json();
      //console.log(jsonComments.items);
      setComments(jsonComments.items);
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

          </div>
          <div className='w-96 border border-l-amber-950'>

            <LiveCommentsContainer />
          </div>
        </div>
        <div>
          {/* Render comments using the CommentCard component */}
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              textOriginal={comment.snippet.topLevelComment.snippet.textOriginal}
              authorDisplayName={comment.snippet.topLevelComment.snippet.authorDisplayName}
            />
          ))}
        </div>
      </div>
      <div>{/* Other content goes here */}</div>
    </div>
  );
};

export default WatchPage;
