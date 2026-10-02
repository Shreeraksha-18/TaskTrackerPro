const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000
const DB_FILE = path.join(__dirname, 'db.json')

app.use(cors())
app.use(express.json())

// Helper to read db.json safely
const readDB = () => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initialData = {
        tasks: [
          { id: 1, text: 'Doctors Appointment', day: '2026-09-30 14:30', priority: 'High', category: 'Personal', reminder: true, completed: false },
          { id: 2, text: 'CS3301 Mini Project Submission', day: '2026-09-28 23:59', priority: 'High', category: 'Study', reminder: true, completed: false },
          { id: 3, text: 'Weekly Grocery Shopping', day: '2026-10-02 10:00', priority: 'Low', category: 'Personal', reminder: false, completed: true }
        ],
        history: [
          { id: 1, action: 'System Initialized', type: 'SYSTEM', details: 'Express.js REST API backend connected', timestamp: new Date().toLocaleString() }
        ]
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2))
      return initialData
    }
    const content = fs.readFileSync(DB_FILE, 'utf8')
    return JSON.parse(content)
  } catch (err) {
    console.error('Error reading db.json:', err)
    return { tasks: [], history: [] }
  }
}

// Helper to write db.json safely
const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2))
  } catch (err) {
    console.error('Error writing db.json:', err)
  }
}

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Express.js TaskTracker API Running' })
})

// GET /api/tasks
app.get('/api/tasks', (req, res) => {
  const db = readDB()
  res.json(db.tasks || [])
})

// POST /api/tasks
app.post('/api/tasks', (req, res) => {
  const db = readDB()
  const newTask = {
    id: req.body.id || Date.now(),
    text: req.body.text,
    day: req.body.day,
    priority: req.body.priority || 'Medium',
    category: req.body.category || 'General',
    reminder: req.body.reminder || false,
    completed: req.body.completed || false
  }

  db.tasks = [newTask, ...(db.tasks || [])]
  writeDB(db)
  res.status(201).json(newTask)
})

// PUT /api/tasks/:id
app.put('/api/tasks/:id', (req, res) => {
  const db = readDB()
  const taskId = req.params.id
  let updatedTask = null

  db.tasks = (db.tasks || []).map((task) => {
    if (String(task.id) === String(taskId)) {
      updatedTask = { ...task, ...req.body }
      return updatedTask
    }
    return task
  })

  if (!updatedTask) {
    return res.status(404).json({ error: 'Task not found' })
  }

  writeDB(db)
  res.json(updatedTask)
})

// DELETE /api/tasks/:id
app.delete('/api/tasks/:id', (req, res) => {
  const db = readDB()
  const taskId = req.params.id
  const initialLength = (db.tasks || []).length

  db.tasks = (db.tasks || []).filter((task) => String(task.id) !== String(taskId))

  if (db.tasks.length === initialLength) {
    return res.status(404).json({ error: 'Task not found' })
  }

  writeDB(db)
  res.json({ message: 'Task deleted successfully', id: taskId })
})

// GET /api/history
app.get('/api/history', (req, res) => {
  const db = readDB()
  res.json(db.history || [])
})

// POST /api/history
app.post('/api/history', (req, res) => {
  const db = readDB()
  const newLog = {
    id: Date.now(),
    action: req.body.action,
    type: req.body.type || 'INFO',
    details: req.body.details,
    timestamp: new Date().toLocaleString()
  }

  db.history = [newLog, ...(db.history || [])]
  writeDB(db)
  res.status(201).json(newLog)
})

app.listen(PORT, () => {
  console.log(`🚀 Express.js REST API server running on http://localhost:${PORT}`)
})
