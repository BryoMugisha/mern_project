/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import './css/navbar.css'
import { Link } from 'react-router-dom'
import { UserContext } from './App';

const Navbar = () => {
  const {user} = useContext(UserContext)

  return (
    <div className='navbar'>
        <div className='navar-left'>
        <Link to="/" className='navbar-brand'>
            #logo
        </Link>
        </div>
        <div className='navbar-right'>
            <Link to="/" className='navbar-link'>Home</Link>
            {
                user ? <>
              <Link to="/dashboard" className='navbar-link'>{user.name}</Link>
              <Link to="/logout" className='navbar-link'>Logout</Link>
              </>
              : <>
              </>
            }
            
        </div>
    </div>
  )
}

export default Navbar