import { useState } from 'react'
import { CATEGORIES } from './TaskForm'

function isOverdue(task) { return Boolean(task.dueDate && !task.completed && new Date(`${task.dueDate}T23:59:59`) < new Date()) }
function formatDueDate(date) { return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(`${date}T12:00:00`)) }

function TaskItem({ task, isEditing, onToggle, onEdit, onSave, onCancelEdit, onDelete }) {
  const [title, setTitle] = useState(task.title)
  const [category, setCategory] = useState(task.category)
  const [dueDate, setDueDate] = useState(task.dueDate || '')
  const overdue = isOverdue(task)

  function handleSave(event) { event.preventDefault(); if (title.trim()) onSave(task.id, { title: title.trim(), category, dueDate }) }
  if (isEditing) return <form className="task-item editing" onSubmit={handleSave}><input aria-label="Edit task title" value={title} onChange={(event) => setTitle(event.target.value)} autoFocus /><div className="edit-controls"><select aria-label="Edit task category" value={category} onChange={(event) => setCategory(event.target.value)}>{CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select><input aria-label="Edit task due date" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} /><button className="save-button" type="submit">Save</button><button className="text-button" type="button" onClick={onCancelEdit}>Cancel</button></div></form>
  return <article className={`task-item ${task.completed ? 'completed' : ''} ${overdue ? 'overdue' : ''}`}><button className="check-button" type="button" onClick={() => onToggle(task.id)} aria-label={`${task.completed ? 'Reopen' : 'Complete'} task: ${task.title}`}><span aria-hidden="true">{task.completed ? '✓' : ''}</span></button><div className="task-copy"><h3>{task.title}</h3><div className="task-meta"><span className={`category-badge category-${task.category.toLowerCase()}`}>{task.category}</span>{task.dueDate && <span className="due-date">{overdue ? 'Overdue · ' : 'Due '}{formatDueDate(task.dueDate)}</span>}{task.completed && <span className="done-label">Completed</span>}</div></div><div className="task-actions"><button className="icon-button" type="button" onClick={() => { setTitle(task.title); setCategory(task.category); setDueDate(task.dueDate || ''); onEdit(task.id) }} aria-label={`Edit ${task.title}`}>Edit</button><button className="icon-button delete-button" type="button" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.title}`}>Delete</button></div></article>
}

export default TaskItem