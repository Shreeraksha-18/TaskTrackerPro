import React from 'react'
import { FaSearch, FaFilter } from 'react-icons/fa'

const TaskFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  priorityFilter, 
  setPriorityFilter, 
  statusFilter, 
  setStatusFilter,
  categoryFilter,
  setCategoryFilter 
}) => {
  return (
    <div className='filter-container'>
      <div className='search-box'>
        <FaSearch className='search-icon' />
        <input
          type='text'
          placeholder='Search tasks by title...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='filter-controls'>
        <div className='filter-group'>
          <FaFilter className='filter-icon' />
          <select 
            value={priorityFilter} 
            onChange={(e) => setPriorityFilter(e.target.value)}
            className='filter-select'
          >
            <option value='All'>All Priorities</option>
            <option value='High'>High Priority 🔴</option>
            <option value='Medium'>Medium Priority 🟡</option>
            <option value='Low'>Low Priority 🟢</option>
          </select>
        </div>

        <div className='filter-group'>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className='filter-select'
          >
            <option value='All'>All Statuses</option>
            <option value='Pending'>Pending</option>
            <option value='Completed'>Completed</option>
          </select>
        </div>

        <div className='filter-group'>
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className='filter-select'
          >
            <option value='All'>All Categories</option>
            <option value='Work'>Work 💼</option>
            <option value='Personal'>Personal 🏠</option>
            <option value='Study'>Study 📚</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default TaskFilter
