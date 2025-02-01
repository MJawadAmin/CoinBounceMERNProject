import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
     <nav className=' flex flex-row justify-center gap-10 '>
            <NavLink className='hover:text-gray-600' >ConBounce</NavLink>
            <NavLink className='hover:text-gray-600'>Home</NavLink>
            <NavLink className='hover:text-gray-600'>Cryptcurrencies</NavLink>
            <NavLink className='hover:text-gray-600'>Blogs</NavLink>
            <NavLink className='hover:text-gray-600'>Submit a blog</NavLink>
            <NavLink className='hover:text-gray-600'>Login</NavLink>
            <NavLink className='hover:text-gray-600'>Signup</NavLink>

     </nav>
    </div>
  )
}

export default Navbar
