import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import TaskFilter from './components/TaskFilter'
import TaskStatsSummary from './components/TaskStatsSummary'
import TaskDetails from './components/TaskDetails'
import TaskHistory from './components/TaskHistory'

const API_BASE = 'http://localhost:5000/api'

const INITIAL_TASKS = [
  {
    id: 1,
    text: 'Doctors Appointment',
    day: '2026-09-30 14:30',
    priority: 'High',
    category: 'Personal',
    reminder: true,
    completed: false
  },
  {
    id: 2,
    text: 'CS3301 Mini Project Submission',
    day: '2026-09-28 23:59',
    priority: 'High',
    category: 'Study',
    reminder: true,
    completed: false
  },
  {
    id: 3,
    text: 'Weekly Grocery Shopping',
    day: '2026-10-02 10:00',
    priority: 'Low',
    category: 'Personal',
    reminder: false,
    completed: true
  }
]

const INITIAL_HISTORY = [
  {
    id: 1,
    action: 'System Initialized',
    type: 'SYSTEM',
    details: 'TaskTracker Pro system loaded with Express.js API & LocalStorage sync',
    timestamp: new Date().toLocaleString()
  }
]

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('cs3301_tasks')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) { return INITIAL_TASKS }
    }
    return INITIAL_TASKS
  })

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('cs3301_history')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) { return INITIAL_HISTORY }
    }
    return INITIAL_HISTORY
  })

  // Filters State
  const [searchTerm, setSearchTerm] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')

  // Fetch initial data from Express.js API on mount
  useEffect(() => {
    const fetchTasksFromAPI = async () => {
      try {
        const res = await fetch(`${API_BASE}/tasks`)
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setTasks(data)
          }
        }
      } catch (err) {
        console.log('Express API offline, running in localStorage mode')
      }
    }

    const fetchHistoryFromAPI = async () => {
      try {
        const res = await fetch(`${API_BASE}/history`)
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setHistory(data)
          }
        }
      } catch (err) {
        console.log('Express API history sync running locally')
      }
    }

    fetchTasksFromAPI()
    fetchHistoryFromAPI()
  }, [])

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('cs3301_tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('cs3301_history', JSON.stringify(history))
  }, [history])

  // Helper to log user activity/moves
  const logActivity = async (action, type, details) => {
    const newLog = {
      id: Date.now(),
      action,
      type,
      details,
      timestamp: new Date().toLocaleString()
    }
    setHistory((prev) => [newLog, ...prev])

    try {
      await fetch(`${API_BASE}/history`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLog)
      })
    } catch (e) {
      // API fallback silently handled
    }
  }

  // Add Task
  const addTask = async (task) => {
    const id = Math.floor(Math.random() * 100000) + 1
    const newTask = { id, ...task }
    setTasks([newTask, ...tasks])
    setShowAddTask(false)

    logActivity('Task Created', 'CREATE', `Created task "${task.text}" (${task.priority} Priority)`)

    try {
      await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      })
    } catch (e) {
      // API fallback silently handled
    }
  }

  // Delete Task
  const deleteTask = async (id) => {
    const taskToDelete = tasks.find((t) => t.id === id)
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter((t) => t.id !== id))
      if (taskToDelete) {
        logActivity('Task Deleted', 'DELETE', `Deleted task "${taskToDelete.text}"`)
      }

      try {
        await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' })
      } catch (e) {
        // API fallback silently handled
      }
    }
  }

  // Toggle Reminder & Completion
  const toggleReminder = async (id) => {
    let targetTask = null

    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          targetTask = { ...task, reminder: !task.reminder }
          return targetTask
        }
        return task
      })
    )

    if (targetTask) {
      logActivity('Reminder Toggled', 'REMINDER', `Toggled reminder for "${targetTask.text}"`)
      try {
        await fetch(`${API_BASE}/tasks/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(targetTask)
        })
      } catch (e) {}
    }
  }

  const toggleCompleted = async (id) => {
    let targetTask = null

    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          targetTask = { ...task, completed: !task.completed }
          return targetTask
        }
        return task
      })
    )

    if (targetTask) {
      logActivity('Status Changed', 'COMPLETE', `Marked "${targetTask.text}" as ${targetTask.completed ? 'COMPLETED' : 'PENDING'}`)
      try {
        await fetch(`${API_BASE}/tasks/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(targetTask)
        })
      } catch (e) {}
    }
  }

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear your activity history log?')) {
      setHistory([])
    }
  }

  // Filter Tasks Logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter
    const matchesCategory = categoryFilter === 'All' || task.category === categoryFilter
    
    let matchesStatus = true
    if (statusFilter === 'Pending') matchesStatus = !task.completed
    if (statusFilter === 'Completed') matchesStatus = task.completed

    return matchesSearch && matchesPriority && matchesCategory && matchesStatus
  })

  return (
    <Router>
      <div className='app-wrapper'>
        <Navbar />

        <div className='container'>
          <Routes>
            {/* Dashboard / Task Tracker Route */}
            <Route
              path='/'
              element={
                <>
                  <Header
                    title='Task Dashboard'
                    onAdd={() => setShowAddTask(!showAddTask)}
                    showAdd={showAddTask}
                  />

                  {showAddTask && <AddTask onAdd={addTask} />}

                  <TaskFilter
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    priorityFilter={priorityFilter}
                    setPriorityFilter={setPriorityFilter}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                  />

                  {filteredTasks.length > 0 ? (
                    <Tasks
                      tasks={filteredTasks}
                      onDelete={deleteTask}
                      onToggle={toggleCompleted}
                      onToggleReminder={toggleReminder}
                    />
                  ) : (
                    <div className='no-tasks'>
                      <p>No tasks found matching your filters.</p>
                      {(searchTerm || priorityFilter !== 'All' || statusFilter !== 'All' || categoryFilter !== 'All') && (
                        <button 
                          className='btn btn-small'
                          onClick={() => {
                            setSearchTerm('')
                            setPriorityFilter('All')
                            setStatusFilter('All')
                            setCategoryFilter('All')
                          }}
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>
                  )}
                </>
              }
            />

            {/* Analytics Route (Class Component TaskStatsSummary) */}
            <Route
              path='/analytics'
              element={<TaskStatsSummary tasks={tasks} />}
            />

            {/* Task Detail View Route */}
            <Route
              path='/task/:id'
              element={
                <TaskDetails
                  tasks={tasks}
                  onToggle={toggleCompleted}
                  onDelete={deleteTask}
                />
              }
            />

            {/* Activity History Log Route */}
            <Route 
              path='/history' 
              element={<TaskHistory history={history} onClearHistory={clearHistory} />} 
            />
          </Routes>

          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App
