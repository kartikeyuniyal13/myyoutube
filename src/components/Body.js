import React from 'react'
import Sidebar from './Sidebar'
import Head from './Head'
import { Outlet } from 'react-router-dom'
const Body=()=>{
return(

    <div>
<Head/>
    
    <div className='flex'>
      
        <Sidebar/>
        <Outlet/>
    </div>
    </div>
)
}
export default Body