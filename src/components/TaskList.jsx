import TaskItem from './TaskItem'

function TaskList({ tasks, hasTasks, filter, categoryFilter, editingTaskId, onToggle, onEdit, onSave, onCancelEdit, onDelete }) {
  if (!tasks.length) return <div className="empty-state"><div className="empty-mark" aria-hidden="true">{hasTasks ? '◌' : '+'}</div><h3>{hasTasks ? 'Nothing in this view' : 'Your list is clear'}</h3><p>{hasTasks ? `No ${filter} tasks in ${categoryFilter.toLowerCase()}. Try another filter.` : 'Add a task above and turn your plans into progress.'}</p></div>
  return <div className="task-list">{tasks.map((task) => <TaskItem key={task.id} task={task} isEditing={editingTaskId === task.id} onToggle={onToggle} onEdit={onEdit} onSave={onSave} onCancelEdit={onCancelEdit} onDelete={onDelete} />)}</div>
}

export default TaskList