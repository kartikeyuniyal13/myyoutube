import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
    //early return:when isMenuOpen=false it returns null
    if (!isMenuOpen) return null;
    return (
        <div>
            <div> <Link to="/">Home</Link></div>
            <div>Shorts</div>
            <div>Subscriptions</div>
            <div>
                <p className='font-bold'>You</p>
            </div>
            <div>

                <p className='font-bold'>Subscriptions</p>


            </div>
            <div>
                <p className='font-bold'>Explore</p>
            </div>
            <div>
                <p className='font-bold'>More from YouTube</p>
            </div>
            <div>
                <p>Settings</p>
            </div>
            <div>
                <p>Report History</p>
            </div>
            <div>
                <p>Help</p>
            </div>
            <div>
                <p>Send Feedback</p>
            </div>
        </div>
    )
}
export default Sidebar