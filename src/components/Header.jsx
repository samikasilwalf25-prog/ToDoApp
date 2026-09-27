function Header({ theme, onToggleTheme }) {
  return <header className="app-header"><a className="brand" href="/" aria-label="TaskFlow home"><span className="brand-mark">TF</span><span>TaskFlow</span></a><button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}><span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</button></header>
}

export default Header