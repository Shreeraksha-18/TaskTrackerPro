import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FaArrowLeft, FaCalendarAlt, FaTag, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'

const TaskDetails = ({ tasks, onToggle, onDelete }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const task = tasks.find((t) => String(t.id) === String(id))

  if (!task) {
    return (
      <div className='details-container'>
        <h2>Task Not Found</h2>
        <p>The task with ID "{id}" could not be located.</p>
        <Link to='/' className='btn btn-secondary'>
          <FaArrowLeft /> Back to Tasks
        </Link>
      </div>
    )
  }

  // Calculate Deadline Status
  const getDeadlineStatus = (dayStr) => {
    if (!dayStr) return { status: 'No Deadline', color: 'neutral' }
    const taskDate = new Date(dayStr)
    if (isNaN(taskDate)) return { status: 'Scheduled', color: 'neutral' }
    
    const now = new Date()
    const isToday = taskDate.toDateString() === now.toDateString()
    
    if (taskDate < now && !isToday) {
      return { status: 'Overdue 🔴', color: 'overdue' }
    } else if (isToday) {
      return { status: 'Due Today 🟡', color: 'duetoday' }
    } else {
      return { status: 'Upcoming 🟢', color: 'upcoming' }
    }
  }

  const deadline = getDeadlineStatus(task.day)

  return (
    <div className='details-container'>
      <button className='btn btn-back' onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      <div className={`details-card ${task.completed ? 'completed' : ''}`}>
        <div className='details-header'>
          <h2>{task.text}</h2>
          <span className={`status-badge ${task.completed ? 'badge-completed' : 'badge-pending'}`}>
            {task.completed ? <><FaCheckCircle /> Completed</> : <><FaExclamationCircle /> Pending</>}
          </span>
        </div>

        <div className='details-body'>
          <div className='detail-row'>
            <span className='detail-label'><FaTag /> Priority:</span>
            <span className={`priority-tag ${task.priority?.toLowerCase() || 'low'}`}>
              {task.priority || 'Low'}
            </span>
          </div>

          <div className='detail-row'>
            <span className='detail-label'><FaTag /> Category:</span>
            <span className='category-badge'>{task.category || 'General'}</span>
          </div>

          <div className='detail-row'>
            <span className='detail-label'><FaCalendarAlt /> Due Date:</span>
            <span>{task.day || 'No deadline specified'}</span>
          </div>

          <div className='detail-row'>
            <span className='detail-label'>Deadline Status:</span>
            <span className={`deadline-tag ${deadline.color}`}>{deadline.status}</span>
          </div>

          <div className='detail-row'>
            <span className='detail-label'>Reminder Alert:</span>
            <span>{task.reminder ? 'Enabled 🔔' : 'Disabled 🔕'}</span>
          </div>
        </div>

        <div className='details-actions'>
          <button 
            className={`btn ${task.completed ? 'btn-warn' : 'btn-success'}`}
            onClick={() => onToggle(task.id)}
          >
            {task.completed ? 'Mark Pending' : 'Mark Completed'}
          </button>

          <button 
            className='btn btn-danger'
            onClick={() => {
              onDelete(task.id)
              navigate('/')
            }}
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetails
