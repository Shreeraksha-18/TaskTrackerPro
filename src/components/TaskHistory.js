import React from 'react'
import { FaHistory, FaPlus, FaCheck, FaTrash, FaBell, FaTrashAlt } from 'react-icons/fa'

const TaskHistory = ({ history, onClearHistory }) => {
  const getActionIcon = (type) => {
    switch (type) {
      case 'CREATE':
        return <FaPlus className='history-icon icon-create' />
      case 'COMPLETE':
        return <FaCheck className='history-icon icon-complete' />
      case 'DELETE':
        return <FaTrash className='history-icon icon-delete' />
      case 'REMINDER':
        return <FaBell className='history-icon icon-reminder' />
      default:
        return <FaHistory className='history-icon' />
    }
  }

  return (
    <div className='history-container'>
      <div className='history-header'>
        <div>
          <h2><FaHistory /> Activity History Log</h2>
          <p className='history-subtitle'>Audit trail recording all task actions and modifications</p>
        </div>
        {history.length > 0 && (
          <button className='btn btn-danger btn-small' onClick={onClearHistory}>
            <FaTrashAlt /> Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className='no-tasks'>
          <p>No activity history recorded yet. Perform actions like adding, completing, or deleting tasks to populate this log.</p>
        </div>
      ) : (
        <div className='history-timeline'>
          {history.map((item) => (
            <div key={item.id} className='history-card'>
              <div className='history-icon-box'>
                {getActionIcon(item.type)}
              </div>
              <div className='history-details'>
                <div className='history-title-row'>
                  <span className={`history-action-badge type-${item.type?.toLowerCase()}`}>
                    {item.action}
                  </span>
                  <span className='history-time'>{item.timestamp}</span>
                </div>
                <p className='history-message'>{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskHistory
