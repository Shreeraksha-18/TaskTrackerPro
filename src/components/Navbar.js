import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaTasks, FaChartBar, FaHistory } from 'react-icons/fa'

const Navbar = () => {
  const location = useLocation()

  return (
    <nav className='navbar'>
      <div className='nav-brand'>
        <FaTasks className='brand-icon' />
        <span>TaskTracker Pro</span>
      </div>
      <div className='nav-links'>
        <Link 
          to='/' 
          className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
        >
          <FaTasks /> Tasks
        </Link>
        <Link 
          to='/analytics' 
          className={`nav-item ${location.pathname === '/analytics' ? 'active' : ''}`}
        >
          <FaChartBar /> Analytics
        </Link>
        <Link 
          to='/history' 
          className={`nav-item ${location.pathname === '/history' ? 'active' : ''}`}
        >
          <FaHistory /> History
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
