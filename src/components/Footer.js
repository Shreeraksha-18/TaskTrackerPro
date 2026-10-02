import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='footer'>
      <p>CS3301 Full Stack Development &copy; 2026</p>
      <div className='footer-links'>
        <Link to='/'>Tasks</Link> | <Link to='/analytics'>Analytics</Link> | <Link to='/history'>Activity History</Link>
      </div>
    </footer>
  )
}

export default Footer
