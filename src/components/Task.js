import React from 'react'
import { FaTimes, FaEye, FaBell } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Task = ({ task, onDelete, onToggle }) => {
  // Calculate Deadline Status
  const getDeadlineStatus = (dayStr) => {
    if (!dayStr) return null
    const taskDate = new Date(dayStr)
    if (isNaN(taskDate)) return null
    
    const now = new Date()
    const isToday = taskDate.toDateString() === now.toDateString()
    
    if (taskDate < now && !isToday) {
      return { label: 'Overdue 🔴', className: 'deadline-overdue' }
    } else if (isToday) {
      return { label: 'Due Today 🟡', className: 'deadline-today' }
    } else {
      return { label: 'Upcoming 🟢', className: 'deadline-upcoming' }
    }
  }

  const deadline = getDeadlineStatus(task.day)

  return (
    <div
      className={`task-card ${task.reminder ? 'reminder-border' : ''} ${task.completed ? 'completed-card' : ''}`}
      onDoubleClick={() => onToggle(task.id)}
      title="Double click to toggle reminder alert"
    >
      <div className='task-main'>
        <div className='task-checkbox-wrapper'>
          <input
            type='checkbox'
            checked={task.completed || false}
            onChange={() => onToggle(task.id)}
            className='task-checkbox'
          />
        </div>

        <div className='task-info'>
          <div className='task-header-row'>
            <h3 className={task.completed ? 'text-strikethrough' : ''}>
              {task.text}
            </h3>
            {task.reminder && <FaBell className='reminder-icon' title='Reminder Active' />}
          </div>

          <p className='task-date'>{task.day}</p>

          <div className='task-tags'>
            <span className={`priority-badge priority-${task.priority?.toLowerCase() || 'low'}`}>
              {task.priority || 'Low'} Priority
            </span>

            {task.category && (
              <span className='category-badge'>
                {task.category}
              </span>
            )}

            {deadline && !task.completed && (
              <span className={`deadline-badge ${deadline.className}`}>
                {deadline.label}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className='task-actions'>
        <Link to={`/task/${task.id}`} className='action-icon view-icon' title='View Details'>
          <FaEye />
        </Link>
        <FaTimes
          className='action-icon delete-icon'
          onClick={() => onDelete(task.id)}
          title='Delete Task'
        />
      </div>
    </div>
  )
}

export default Task
