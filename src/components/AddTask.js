import React, { useState } from 'react'

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [category, setCategory] = useState('Work')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!text.trim()) {
      alert('Please enter a task title!')
      return
    }

    onAdd({ 
      text, 
      day: day || new Date().toISOString().slice(0, 16).replace('T', ' '), 
      priority, 
      category, 
      reminder,
      completed: false 
    })

    setText('')
    setDay('')
    setPriority('Medium')
    setCategory('Work')
    setReminder(false)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <h3>Add New Task</h3>
      
      <div className='form-control'>
        <label>Task Name *</label>
        <input
          type='text'
          placeholder='e.g., Complete Full Stack Assignment'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>

      <div className='form-control'>
        <label>Due Date & Time</label>
        <input
          type='datetime-local'
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>

      <div className='form-grid'>
        <div className='form-control'>
          <label>Priority Level</label>
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
            className='form-select'
          >
            <option value='High'>High Priority 🔴</option>
            <option value='Medium'>Medium Priority 🟡</option>
            <option value='Low'>Low Priority 🟢</option>
          </select>
        </div>

        <div className='form-control'>
          <label>Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className='form-select'
          >
            <option value='Work'>Work 💼</option>
            <option value='Personal'>Personal 🏠</option>
            <option value='Study'>Study 📚</option>
          </select>
        </div>
      </div>

      <div className='form-control form-control-check'>
        <label>Set Reminder Alert</label>
        <input
          type='checkbox'
          checked={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type='submit' value='Save Task' className='btn btn-block btn-primary' />
    </form>
  )
}

export default AddTask
