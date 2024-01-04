import React from 'react'

const CommentCard = ({textOriginal,authorDisplayName}) => {


    return (
        <div>
            <div className='font-bold'>
                {authorDisplayName}
                
            </div>
            <div>
                {textOriginal}
            </div>
        </div>
    )
}

export default CommentCard