import React from 'react'

const LiveComments = ({name,comment}) => {
  return (
    <div className='flex'>
      <div className='mt-3 shadow-md flex'>

        <div className=''  >
         <img className="w-6 h-6 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxxw8dScmluGuzp_Tt3WoSKjalK2G0FYC8OA&usqp=CAU" alt="dp-icon"/>
        </div>
         <div className='ml-1 mr-1'>
          <b>{name}</b>
         </div>
        <div>
        <p>{comment}</p>
        </div>


      </div>
    </div>
  )
}

export default LiveComments