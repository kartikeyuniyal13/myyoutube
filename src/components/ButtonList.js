import React, { useState } from 'react';
import Button from './Button';

const List = [
  "All", "News", "Cricket", "Music", "Movies", "Cycling", "Comedy", "Action",
  "All", "News", "Cricket", "Music", "Movies", "Cycling", "Comedy", "Action",
  "All", "News", "Cricket", "Music", "Movies", "Cycling", "Comedy", "Action"
];

const ButtonList = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleShowMoreRight = () => {
    setScrollPosition(scrollPosition + 200); // Adjust the value based on your button width
  };

  const handleShowMoreLeft = () => {
    setScrollPosition(scrollPosition - 200); // Adjust the value based on your button width
  };

  return (
    <div className='flex overflow-hidden' style={{ width: '100vw' }}>
      <button onClick={handleShowMoreLeft} className='bg-gray-200 rounded-md pl-2 pr-2 m-2 absolute left-0'>
        Show Less
      </button>
      <div className='flex' style={{ transform: `translateX(-${scrollPosition}px)` }}>
        {List.map((item, index) => (
          <Button key={index} name={item} />
        ))}
      </div>
      <button onClick={handleShowMoreRight} className='bg-gray-200 rounded-md pl-2 pr-2 m-2 absolute right-0'>
        Show More
      </button>
    </div>
  );
}

export default ButtonList;
