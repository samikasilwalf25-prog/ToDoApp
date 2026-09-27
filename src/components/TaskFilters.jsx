import { CATEGORIES } from './TaskForm'

function TaskFilters({ currentFilter, onFilterChange, categoryFilter, onCategoryChange }) {
  const filters = [['all', 'All'], ['active', 'Active'], ['completed', 'Completed']]
  return <div className="filters-bar"><div className="filter-tabs" role="tablist" aria-label="Filter tasks by status">{filters.map(([value, label]) => <button key={value} className={currentFilter === value ? 'filter-button active' : 'filter-button'} type="button" onClick={() => onFilterChange(value)} role="tab" aria-selected={currentFilter === value}>{label}</button>)}</div><label className="category-select-label" htmlFor="category-filter"><span>View</span><select id="category-filter" value={categoryFilter} onChange={(event) => onCategoryChange(event.target.value)}><option>All categories</option>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></label></div>
}

export default TaskFilters