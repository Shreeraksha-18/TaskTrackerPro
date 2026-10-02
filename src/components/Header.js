import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation()

  return (
    <header className='header'>
      <div className='header-title-box'>
        <h1>{title}</h1>
        <p className='header-subtitle'>CS3301 Full Stack Development Project</p>
      </div>

      {location.pathname === '/' && (
        <Button
          color={showAdd ? '#e74c3c' : '#2ecc71'}
          text={showAdd ? 'Close Form' : '+ Add Task'}
          onClick={onAdd}
        />
      )}
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Dashboard',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header
