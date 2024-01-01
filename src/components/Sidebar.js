import React from 'react'
import { useSelector } from 'react-redux'

const Sidebar = () => {
    const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
    //early return
    if (!isMenuOpen) return null;
    return (
        <div>
            <div>Home</div>
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