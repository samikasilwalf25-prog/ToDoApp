function TaskStats({ total, remaining, completed }) {
  return <section className="stats-grid" aria-label="Task statistics"><div className="stat-card stat-total"><span className="stat-label">Total tasks</span><strong>{total}</strong><span className="stat-note">Everything on your plate</span></div><div className="stat-card stat-active"><span className="stat-label">In progress</span><strong>{remaining}</strong><span className="stat-note">Still to be handled</span></div><div className="stat-card stat-done"><span className="stat-label">Completed</span><strong>{completed}</strong><span className="stat-note">Small wins add up</span></div></section>
}

export default TaskStats