import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SideBar = ({ menuTogglerHandle }) => {
  const [showMore, setShowMore] = useState(false);
  const isMenuOpen = useSelector(store => store?.app?.isMenuOpen);

  return (
    <>
      {isMenuOpen && (
        <div className='px-3 w-56 overflow-y-scroll ease-in fixed top-[3.8rem] bg-white z-10' style={{ height: '91vh', minWidth: '16rem' }}>
          <ul className='mt-3'>
            <Link to='/'>
              <li className='flex py-2 border-0 rounded-xl cursor-pointer hover:bg-gray-100 last:mb-2 px-4'>
                <div>
                  <i className='fa-solid fa-house'></i>
                </div>
                <div className='ml-5 text-gray-700'>Home</div>
              </li>
            </Link>
            <Link to='/shorts'>
              <li className='flex py-2 border-0 rounded-xl cursor-pointer hover:bg-gray-100 last:mb-2 px-4'>
                <div>
                  <i className='fa-solid fa-circle-play'></i>
                </div>
                <div className='ml-5 text-gray-700'>Shorts</div>
              </li>
            </Link>
            <Link to='/subscriptions'>
              <li className='flex py-2 border-0 rounded-xl cursor-pointer hover:bg-gray-100 last:mb-2 px-4'>
                <div>
                  <i className='fa-solid fa-clapperboard'></i>
                </div>
                <div className='ml-5 text-gray-700'>Subscriptions</div>
              </li>
            </Link>
          </ul>

          <hr />

          <ul className='mt-3'>
            <div className='mb-1 px-4'>
              <span className='text-lg font-semibold mr-1'>You</span>
              <i className='fa-solid fa-chevron-right fa-sm'></i>
            </div>
            <Link to='/your-channel'>
              <li className='flex py-2 border-0 rounded-xl cursor-pointer hover:bg-gray-100 last:mb-2 px-4'>
                <div>
                  <i className='fa-solid fa-circle-user'></i>
                </div>
                <div className='ml-5 text-gray-700'>Your Channel</div>
              </li>
            </Link>
            <Link to='/history'>
              <li className='flex py-2 border-0 rounded-xl cursor-pointer hover:bg-gray-100 last:mb-2 px-4'>
                <div>
                  <i className='fa-solid fa-clock-rotate-left'></i>
                </div>
                <div className='ml-5 text-gray-700'>History</div>
              </li>
            </Link>

            {/* Add other items similarly */}
          </ul>

          <hr />

          <ul className='mt-3'>
            {/* Show More section */}
            {!showMore ? (
              <li className='flex py-2 border-0 rounded-xl cursor-pointer hover:bg-gray-100 last:mb-2 px-4' onClick={() => setShowMore(!showMore)}>
                <div>
                  <i className='fa-solid fa-chevron-down'></i>
                </div>
                <div className='ml-5 text-gray-700'>Show More</div>
              </li>
            ) : (
              <>
                {/* Additional items when showMore is true */}
                <li className='flex py-2 border-0 rounded-xl cursor-pointer hover:bg-gray-100 last:mb-2 px-4'>
                  <div>
                    <i className='fa-solid fa-thumbs-up'></i>
                  </div>
                  <div className='ml-5 text-gray-700'>Liked Videos</div>
                </li>
                {/* Add more items here */}
                <li className='flex py-2 border-0 rounded-xl cursor-pointer hover:bg-gray-100 last:mb-2 px-4' onClick={() => setShowMore(!showMore)}>
                  <div>
                    <i className='fa-solid fa-chevron-up'></i>
                  </div>
                  <div className='ml-5 text-gray-700'>Show Less</div>
                </li>
              </>
            )}
          </ul>

          <hr />

          <ul className='mt-3'>
            {/* Explore section */}
            <li className='flex py-2 border-0 rounded-xl cursor-pointer hover:bg-gray-100 last:mb-2 px-4'>
              <div>
                <i className='fa-solid fa-fire'></i>
              </div>
              <div className='ml-5 text-gray-700'>Trending</div>
            </li>
            {/* Add other explore items */}
          </ul>

          <hr />

          <ul className='mt-3'>
            {/* More from YouTube */}
            <li className='flex py-2 border-0 rounded-xl cursor-pointer hover:bg-gray-100 last:mb-2 px-4'>
              <div>
                <i className='fa-brands fa-youtube' style={{ color: '#ff0000' }}></i>
              </div>
              <div className='ml-5 text-gray-700'>Playlist</div>
            </li>
            {/* Add other YouTube related items */}
          </ul>

          <hr />

          <ul className='mt-3'>
            {/* Settings section */}
            <li className='flex py-2 border-0 rounded-xl cursor-pointer hover:bg-gray-100 last:mb-2 px-4'>
              <div>
                <i className='fa-solid fa-gear'></i>
              </div>
              <div className='ml-5 text-gray-700'>Settings</div>
            </li>
            {/* Add other settings items */}
          </ul>
        </div>
      )}
    </>
  );
};

export default SideBar;