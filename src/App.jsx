import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskStats from './components/TaskStats'
import TaskFilters from './components/TaskFilters'
import TaskList from './components/TaskList'
import './App.css'

const TASKS_KEY = 'taskflow-tasks'
const THEME_KEY = 'taskflow-theme'

function readStoredTasks() {
  try {
    const storedTasks = localStorage.getItem(TASKS_KEY)
    const parsedTasks = storedTasks ? JSON.parse(storedTasks) : []
    return Array.isArray(parsedTasks) ? parsedTasks : []
  } catch {
    return []
  }
}

function App() {
  const [tasks, setTasks] = useState(readStoredTasks)
  const [filter, setFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('All categories')
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'light')

  useEffect(() => { localStorage.setItem(TASKS_KEY, JSON.stringify(tasks)) }, [tasks])
  useEffect(() => { localStorage.setItem(THEME_KEY, theme); document.documentElement.dataset.theme = theme }, [theme])

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length
    return { total: tasks.length, completed, remaining: tasks.length - completed }
  }, [tasks])

  const visibleTasks = useMemo(() => tasks.filter((task) => {
    const matchesStatus = filter === 'all' || (filter === 'active' ? !task.completed : task.completed)
    const matchesCategory = categoryFilter === 'All categories' || task.category === categoryFilter
    return matchesStatus && matchesCategory
  }), [tasks, filter, categoryFilter])

  function addTask(taskDetails) {
    setTasks((currentTasks) => [{ ...taskDetails, id: crypto.randomUUID(), completed: false, createdAt: new Date().toISOString() }, ...currentTasks])
  }

  function updateTask(taskId, updates) {
    setTasks((currentTasks) => currentTasks.map((task) => task.id === taskId ? { ...task, ...updates } : task))
    setEditingTaskId(null)
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) => currentTasks.map((task) => task.id === taskId ? { ...task, completed: !task.completed } : task))
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
    if (editingTaskId === taskId) setEditingTaskId(null)
  }

  return (
    <div className="app-shell">
      <Header theme={theme} onToggleTheme={() => setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')} />
      <main className="main-content">
        <section className="intro-row"><div><p className="eyebrow">Personal command center</p><h1>Make space for what matters.</h1><p className="intro-copy">A focused place to capture today&apos;s work, keep momentum, and close the loop.</p></div><div className="date-stamp" aria-label="Today"><span className="date-dot" /><span>Today</span><strong>{new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date())}</strong></div></section>
        <TaskStats {...stats} />
        <section className="workspace-grid"><TaskForm onAddTask={addTask} /><div className="task-board"><TaskFilters currentFilter={filter} onFilterChange={setFilter} categoryFilter={categoryFilter} onCategoryChange={setCategoryFilter} /><TaskList tasks={visibleTasks} hasTasks={tasks.length > 0} filter={filter} categoryFilter={categoryFilter} editingTaskId={editingTaskId} onToggle={toggleTask} onEdit={setEditingTaskId} onSave={updateTask} onCancelEdit={() => setEditingTaskId(null)} onDelete={deleteTask} /></div></section>
      </main>
      <footer><span>TaskFlow</span> &middot; Keep the small promises.</footer>
    </div>
  )
}

export default App
