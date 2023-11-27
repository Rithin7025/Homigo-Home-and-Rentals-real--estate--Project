import React from 'react'
import { FcBusinessman, FcUndo } from "react-icons/fc";
import { DASHBOARD_SIDEBAR_LINKS } from '../../lib/consts/navigation';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames'

const LinkClassess = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover: no-underline active:bg-neutral-600 rounded-sm '

export default function Sidebar() {
  return (
      <div className='flex flex-col w-60 p-3 bg-slate-900'>
        <div className='flex items-center  px-2 py-3 '>
            <  FcBusinessman className='h-10 w-10 '/>
            <span className='font-bold text-xl text-slate-400'>Homi</span><span className='font-bold text-neutral-200 text-xl'>go</span>
            
        </div> 
        <hr className='text-white'/>
        <div className='flex-1 py-4'>
            {DASHBOARD_SIDEBAR_LINKS.map((item)=>(
                   <SidebarLink key={item.key} item={item}/>
                    
                  
            ))}
        </div>
        <div className='text-white'>bottom</div>
        
    </div>
  )
}

 function SidebarLink({item}){
    //to track which path is active 
    const {pathname} = useLocation()
    return( 
        <Link to={item.path} className={classnames(pathname === item.path ? 'bg-neutral-400 text-white' : 'text-neutral-400', LinkClassess)}>
        <span className='text-xl'>{item.icon}</span>
        {item.label}
        </Link>
    )
 }