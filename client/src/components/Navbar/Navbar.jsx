import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Navbar = () => {
    const isAthenticated= useSelector(state=>state.user.auth);
  return (
    <div>
      <nav className='w-[80%]  flex justify-between items-center text-center mx-auto '>
<NavLink className= {({ isActive }) =>
          isActive
            ? "text-white bg-blue-500 text-2xl  px-4 py-2 rounded"
            : "text-gray-500 hover:text-blue-500 px-4 py-2 text-2xl font-bold "}
         to='coinbounce'>  Coin Bounce </NavLink>
<NavLink to='/' className={({ isActive }) =>
          isActive
            ? "text-white bg-blue-500 px-4 py-2 rounded"
            : "text-gray-500 hover:text-blue-500 px-4 py-2"
        }>  Home</NavLink>
<NavLink to='crypto' className={({ isActive }) =>
          isActive
            ? "text-white bg-blue-500 px-4 py-2 rounded"
            : "text-gray-500 hover:text-blue-500 px-4 py-2"
        }> Cryptocurrencies </NavLink>
<NavLink to="blogs" className={({ isActive }) =>
          isActive
            ? "text-white bg-blue-500 px-4 py-2 rounded"
            : "text-gray-500 hover:text-blue-500 px-4 py-2"
        }>  Blogs </NavLink>
<NavLink to="submit" className={({ isActive }) =>
          isActive
            ? "text-white bg-blue-500 px-4 py-2 rounded"
            : "text-gray-500 hover:text-blue-500 px-4 py-2"
        }>  Submit a Blog </NavLink>



        {isAthenticated? 
        <div><NavLink to='logout'  className={({ isActive }) =>
            isActive
              ? "text-white bg-red-500 px-4 py-2 rounded"
              : "text-gray-500 hover:text-red-500 px-4 py-2"}> Logout</NavLink> </div>:
         <div>
            <NavLink to="login" className={({isActive})=>
isActive ?"text-white bg-blue-500 px-4 py-2 rounded":
"text-gray-500 hover:text-blue-500 px-4 py-2"}> Login</NavLink>
<NavLink
        to="/signup"
        className={({ isActive }) =>
          isActive
            ? "text-white bg-blue-500 px-4 py-2 rounded"
            : "text-gray-500 hover:text-blue-500 px-4 py-2"
        }
      >
       Signup
      </NavLink>
      </div>}


      </nav>

    </div>
  )
}

export default Navbar
