import React from 'react'

const CommentCard = ({icon,textOriginal,authorDisplayName}) => {


    return (
        <div  className='flex'>
            <div>
                
                <img alt="icon" className="w-8 h-8 m-2 rounded-full" src={icon} />
                </div>
               <div>
                
            <span className='font-bold'>
                {authorDisplayName}
                
            </span>
            <div>
                {textOriginal}
            </div>
                </div> 
        </div>
    )
}

export default CommentCard