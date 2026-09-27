import { useState } from 'react'

const CATEGORIES = ['Work', 'Personal', 'Urgent', 'Study']

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Work')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!title.trim()) { setError('Give your task a name first.'); return }
    onAddTask({ title: title.trim(), category, dueDate })
    setTitle(''); setCategory('Work'); setDueDate(''); setError('')
  }

  return <form className="task-form panel" onSubmit={handleSubmit}><div className="panel-heading"><div><p className="eyebrow">New focus</p><h2>Add a task</h2></div><span className="form-icon" aria-hidden="true">+</span></div><label htmlFor="task-title">What needs doing?</label><input id="task-title" value={title} onChange={(event) => { setTitle(event.target.value); setError('') }} placeholder="e.g. Outline project proposal" /><div className="form-row"><div><label htmlFor="task-category">Category</label><select id="task-category" value={category} onChange={(event) => setCategory(event.target.value)}>{CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select></div><div><label htmlFor="task-due-date">Due date <span>(optional)</span></label><input id="task-due-date" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} /></div></div>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button" type="submit">Add to my list <span aria-hidden="true">→</span></button></form>
}

export { CATEGORIES }
export default TaskForm