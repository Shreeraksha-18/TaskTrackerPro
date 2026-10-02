# CS3301 – Full Stack Development (CIE-2 Project)
## TaskTracker Pro – Intelligent Task, Deadline & Activity History Manager

A feature-rich React.js Single Page Application (SPA) developed for the **CS3301 Full Stack Development CIE-2 Assignment**, built by following and extending Brad Traversy's React JS Crash Course tutorial.

---

## 🚀 Key Features & Syllabus Compliance

### **React Concepts Implemented (11/11 Checklist)**
1. **Components:** Modular architecture (`Navbar`, `Header`, `AddTask`, `TaskFilter`, `Tasks`, `Task`, `TaskStatsSummary`, `TaskDetails`, `TaskHistory`, `Footer`).
2. **Class Component:** `TaskStatsSummary.js` extending `React.Component` with lifecycle methods (`componentDidMount`, `componentDidUpdate`) and analytical state calculations.
3. **Functional Components:** Used for all primary routes and card views.
4. **Parent-Child Components:** Top-down state flow from `App.js` to children.
5. **Props:** Callback props (`onAdd`, `onDelete`, `onToggle`, `onToggleReminder`) passed down trees.
6. **useState:** Managed tasks, activity history logs, modal visibility, search queries, priority filters, and form states.
7. **useEffect:** Browser `localStorage` synchronization (`cs3301_tasks` & `cs3301_history`).
8. **Event Handling:** Form submissions (`onSubmit`), select changes (`onChange`), deletions (`onClick`), and double-click reminder toggles (`onDoubleClick`).
9. **Form Handling:** Controlled form in `AddTask.js` with inputs for Task Name, Date-Time picker, Priority level dropdown, Category dropdown, and Reminder toggle checkbox.
10. **Client-Side Routing:** Powered by `React Router v6` across `/`, `/analytics`, `/task/:id`, and `/history`.
11. **Responsive UI:** Custom glassmorphism CSS layout in `index.css`.

---

## 🌟 Student Personal Modifications

1. **Priority Tagging & Multi-Criteria Filter Bar (`TaskFilter.js`)**
   * Assign High 🔴, Medium 🟡, or Low 🟢 priorities and filter tasks dynamically by Priority, Category, Status, or Live Text Search.
2. **Real-Time Due Date & Deadline Status Tracker**
   * Automated calculation of task deadline urgency (*Overdue* 🔴, *Due Today* 🟡, *Upcoming* 🟢).
3. **Activity Audit History Log (`/history`)**
   * Records every single user action (Task Created, Status Changed, Reminder Toggled, Task Deleted) with exact timestamps (`new Date().toLocaleString()`) and persistent storage in `localStorage`.

---

## 🛠️ How to Run the Project

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Start Development Server:**
   ```bash
   npm start
   ```
3. Open **`http://localhost:3000`** in your browser.

---

## 📄 Project Documentation
Full documentation report is available in **[`PROJECT_REPORT.md`](PROJECT_REPORT.md)**.

* **YouTube Tutorial Link:** [https://www.youtube.com/watch?v=w7ejDZ8SWv8](https://www.youtube.com/watch?v=w7ejDZ8SWv8)
* **Base GitHub Repository:** [https://github.com/bradtraversy/react-crash-2021](https://github.com/bradtraversy/react-crash-2021)
