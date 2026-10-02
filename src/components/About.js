import React from 'react'
import { Link } from 'react-router-dom'
import { FaYoutube, FaGithub, FaCheckCircle, FaCode, FaGraduationCap } from 'react-icons/fa'

const About = () => {
  const concepts = [
    { name: 'Components', status: 'Implemented', detail: 'Modular reusable components structure' },
    { name: 'Class Component', status: 'Implemented', detail: 'TaskStatsSummary analytics component' },
    { name: 'Functional Components', status: 'Implemented', detail: 'Header, Tasks, Task, AddTask, TaskFilter, Nav' },
    { name: 'Parent-Child Props', status: 'Implemented', detail: 'State & action handler passing down trees' },
    { name: 'Props', status: 'Implemented', detail: 'Prop configuration and PropTypes validation' },
    { name: 'useState', status: 'Implemented', detail: 'Local & global state management' },
    { name: 'useEffect', status: 'Implemented', detail: 'localStorage synchronization & side-effects' },
    { name: 'Event Handling', status: 'Implemented', detail: 'onClick, onChange, onSubmit, onDoubleClick' },
    { name: 'Form Handling', status: 'Implemented', detail: 'Controlled inputs with error validation' },
    { name: 'Client-Side Routing', status: 'Implemented', detail: 'React Router v6 multi-page navigation' },
    { name: 'Responsive UI', status: 'Implemented', detail: 'Mobile-first flexbox/grid CSS layout' },
  ]

  return (
    <div className='about-container'>
      <div className='about-card'>
        <h2><FaGraduationCap /> Course Assignment Details</h2>
        <p><strong>Course:</strong> CS3301 – Full Stack Development</p>
        <p><strong>Assignment:</strong> CIE-2 React Mini Project Development</p>
        <p><strong>Application Title:</strong> TaskTracker Pro - Smart Task Manager</p>
        <p><strong>Version:</strong> 2.0.0 (Enhanced Edition)</p>
      </div>

      <div className='about-card'>
        <h2><FaCode /> Mandatory React Concepts Demonstrated</h2>
        <div className='concepts-grid'>
          {concepts.map((item, idx) => (
            <div key={idx} className='concept-badge-item'>
              <FaCheckCircle className='check-icon' />
              <div>
                <strong>{item.name}</strong>
                <p>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='about-card'>
        <h2>Student Personal Modifications (Beyond Tutorial)</h2>
        <div className='mod-box'>
          <h3>1. Priority Tagging & Multi-Criteria Filter Bar</h3>
          <p>Added priority levels (High 🔴, Medium 🟡, Low 🟢) and dynamic filtering by Priority, Completion Status, Category, and Live Text Search.</p>
        </div>

        <div className='mod-box'>
          <h3>2. Due Date & Real-time Deadline Status Tracker</h3>
          <p>Integrated date-time picker with automated deadline calculation (Overdue 🔴, Due Today 🟡, Upcoming 🟢) and analytics reporting.</p>
        </div>
      </div>

      <div className='about-card links-card'>
        <h2>Reference Links</h2>
        <a 
          href='https://www.youtube.com/watch?v=w7ejDZ8SWv8' 
          target='_blank' 
          rel='noopener noreferrer'
          className='external-btn btn-youtube'
        >
          <FaYoutube /> Watch YouTube Tutorial (Traversy Media)
        </a>

        <a 
          href='https://github.com/bradtraversy/react-crash-2021' 
          target='_blank' 
          rel='noopener noreferrer'
          className='external-btn btn-github'
        >
          <FaGithub /> Original Base GitHub Repository
        </a>
      </div>

      <Link to='/' className='btn btn-primary btn-block text-center mt-20'>
        Back to Task Dashboard
      </Link>
    </div>
  )
}

export default About
