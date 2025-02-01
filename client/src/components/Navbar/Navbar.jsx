import React from 'react'
import { NavLink ,useLocation} from 'react-router-dom'
import { useState } from 'react';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated]=useState(false)
    const location = useLocation(); // Get the current path
    const isActive = (path) => location.pathname === path;
    return (
        <div>
        <nav className='flex flex-row justify-between w-full'>
          {/* Left side: NavLinks */}
          <div className='flex gap-10'>
            <NavLink
              to="/coinbounce"
              className={({ isActive }) =>
                `text-[22px] font-bold hover:text-gray-600 ${isActive ? "text-[#3861fb] underline" : ""}`
              }
            >
              CoinBounce
            </NavLink>
            <NavLink
              to="/"
              className="text-[22px] font-bold hover:text-gray-600 group-[aria-current]:text-[#3861fb] group-[aria-current]:underline"
            >
              Home
            </NavLink>
            <NavLink
              to="/crypto"
              className={({ isActive }) =>
                `text-[22px] font-bold hover:text-gray-600 ${isActive ? "text-[#3861fb] underline" : ""}`
              }
            >
              Cryptocurrencies
            </NavLink>
            <NavLink
              to='/blogs'
              className={({ isActive }) =>
                `text-[22px] font-bold hover:text-gray-600 ${isActive ? "text-[#3861fb] underline" : ""}`
              }
            >
              Blogs
            </NavLink>
            <NavLink
              to='/submit'
              className={({ isActive }) =>
                `text-[22px] font-bold hover:text-gray-600 ${isActive ? "text-[#3861fb] underline" : ""}`
              }
            >
              Submit a blog
            </NavLink>
          </div>
      
          {/* Right side: Login/Signup/Logout */}
          <div className='flex gap-10 items-center'>
            {isAuthenticated ? (
              <NavLink
                to="logout"
                className={({ isActive }) =>
                  `text-[22px] font-bold hover:text-gray-600 bg-red-500 rounded-2xl ${isActive ? "text-[#3861fb] underline" : ""}`
                }
              >
                <button>Logout</button>
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="login"
                  className={({ isActive }) =>
                    `text-[22px] font-bold hover:text-gray-600 ${isActive ? "text-[#3861fb] underline" : ""}`
                  }
                >
                  <button>Login</button>
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `text-[22px] font-bold hover:text-gray-600 ${isActive ? "text-[#3861fb] underline" : ""}`
                  }
                >
                  <button>Signup</button>
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
      
    )
}

export default Navbar
