import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FaCheckCircle, FaExclamationTriangle, FaClock, FaListUl } from 'react-icons/fa'

class TaskStatsSummary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0,
      completed: 0,
      pending: 0,
      highPriority: 0,
      mediumPriority: 0,
      lowPriority: 0,
      overdue: 0,
      completionRate: 0,
      lastUpdated: new Date().toLocaleTimeString()
    }
  }

  componentDidMount() {
    this.calculateStats()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tasks !== this.props.tasks) {
      this.calculateStats()
    }
  }

  calculateStats = () => {
    const { tasks } = this.props
    const total = tasks.length
    const completed = tasks.filter((t) => t.completed).length
    const pending = total - completed
    const highPriority = tasks.filter((t) => t.priority === 'High').length
    const mediumPriority = tasks.filter((t) => t.priority === 'Medium').length
    const lowPriority = tasks.filter((t) => t.priority === 'Low').length

    // Overdue calculation
    const now = new Date()
    const overdue = tasks.filter((t) => {
      if (t.completed || !t.day) return false
      const taskDate = new Date(t.day)
      return !isNaN(taskDate) && taskDate < now
    }).length

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    this.setState({
      total,
      completed,
      pending,
      highPriority,
      mediumPriority,
      lowPriority,
      overdue,
      completionRate,
      lastUpdated: new Date().toLocaleTimeString()
    })
  }

  render() {
    const {
      total,
      completed,
      pending,
      highPriority,
      mediumPriority,
      lowPriority,
      overdue,
      completionRate,
      lastUpdated
    } = this.state

    return (
      <div className='stats-container'>
        <div className='stats-header'>
          <h2>Task Analytics Dashboard</h2>
          <span className='stats-badge-class'>Class Component Standard</span>
        </div>
        <p className='last-updated'>Last updated at: {lastUpdated}</p>

        <div className='stats-grid'>
          <div className='stat-card card-total'>
            <div className='stat-icon-wrapper'>
              <FaListUl className='stat-icon' />
            </div>
            <div className='stat-info'>
              <h3>{total}</h3>
              <p>Total Tasks</p>
            </div>
          </div>

          <div className='stat-card card-completed'>
            <div className='stat-icon-wrapper'>
              <FaCheckCircle className='stat-icon' />
            </div>
            <div className='stat-info'>
              <h3>{completed}</h3>
              <p>Completed ({completionRate}%)</p>
            </div>
          </div>

          <div className='stat-card card-pending'>
            <div className='stat-icon-wrapper'>
              <FaClock className='stat-icon' />
            </div>
            <div className='stat-info'>
              <h3>{pending}</h3>
              <p>Pending Tasks</p>
            </div>
          </div>

          <div className='stat-card card-overdue'>
            <div className='stat-icon-wrapper'>
              <FaExclamationTriangle className='stat-icon' />
            </div>
            <div className='stat-info'>
              <h3>{overdue}</h3>
              <p>Overdue Tasks</p>
            </div>
          </div>
        </div>

        <div className='progress-section'>
          <div className='progress-header'>
            <span>Overall Completion Progress</span>
            <span>{completionRate}%</span>
          </div>
          <div className='progress-bar-bg'>
            <div 
              className='progress-bar-fill' 
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>

        <div className='priority-distribution'>
          <h3>Priority Distribution</h3>
          <div className='priority-bars'>
            <div className='priority-item'>
              <span className='priority-label high'>High Priority</span>
              <span className='priority-count'>{highPriority}</span>
            </div>
            <div className='priority-item'>
              <span className='priority-label medium'>Medium Priority</span>
              <span className='priority-count'>{mediumPriority}</span>
            </div>
            <div className='priority-item'>
              <span className='priority-label low'>Low Priority</span>
              <span className='priority-count'>{lowPriority}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

TaskStatsSummary.propTypes = {
  tasks: PropTypes.array.isRequired
}

export default TaskStatsSummary
