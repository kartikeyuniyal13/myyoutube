import React, { useState, useEffect } from 'react';
import LiveComments from './LiveCommentsCard';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/livecommentslice';
import { generateName, generateString } from '../utils/HelperFunction';

const LiveCommentsContainer = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const livechatmessage = useSelector((state) => state.livecomment.message);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(
        addMessage({
          name: generateName(),
          comment: generateString(20),
        })
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const send = () => {
    dispatch(
      addMessage({
        name: "KARTIKEY UNIYAL",
        comment: inputValue,
      })
    );
    setInputValue('');
  };

  return (
    <div>
      <div className='border-black h-[500px] overflow-y-scroll flex flex-col-reverse'>
        {livechatmessage.map((message, index) => (
          <LiveComments key={index} name={message.name} comment={message.comment} />
        ))}
      </div>

      <div>
        <input
          value={inputValue}
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          className="w-[500px] h-8 border border-solid border-black rounded-sm"
        />
        <button onClick={send}>Submit</button>
      </div>
    </div>
  );
};

export default LiveCommentsContainer;
