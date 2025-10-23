import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate, useParams } from 'react-router-dom';
import './App.css';

/**
 * Simple Navbar component with app title and top-level links.
 */
// PUBLIC_INTERFACE
export function Navbar({ theme, onToggleTheme }) {
  /** Navbar for the top of the application */
  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="brand">Requirement Estimator</span>
      </div>
      <nav className="navbar-links">
        <NavLink to="/" className="nav-item">Home</NavLink>
        <NavLink to="/requirements" className="nav-item">Requirements</NavLink>
        <NavLink to="/estimates/new" className="nav-item action">New Estimate</NavLink>
        <NavLink to="/reference" className="nav-item">Reference</NavLink>
      </nav>
      <div className="navbar-actions">
        <button
          className="btn btn-secondary"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  );
}

/**
 * Sidebar navigation with sectioned links.
 */
// PUBLIC_INTERFACE
export function Sidebar() {
  /** Collapsible left sidebar for route navigation */
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-title">Navigation</div>
        <NavLink end to="/" className="sidebar-link">Dashboard</NavLink>
        <NavLink to="/requirements" className="sidebar-link">Requirements</NavLink>
        <NavLink to="/reference" className="sidebar-link">Reference Data</NavLink>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-title">Estimates</div>
        <NavLink to="/estimates/new" className="sidebar-link">Create New</NavLink>
        <NavLink to="/estimates/123" className="sidebar-link">Sample Estimate</NavLink>
      </div>
    </aside>
  );
}

// PUBLIC_INTERFACE
export function Home() {
  /** Landing dashboard page */
  const navigate = useNavigate();
  return (
    <div className="panel">
      <h1 className="title">Welcome to Requirement Estimator</h1>
      <p className="description">Create and manage requirement effort estimates with reference-backed data.</p>
      <div className="actions">
        <button className="btn btn-primary btn-large" onClick={() => navigate('/estimates/new')}>
          Create New Estimate
        </button>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function Requirements() {
  /** Requirements listing placeholder */
  return (
    <div className="panel">
      <h2 className="subtitle">Requirements</h2>
      <p className="description">Browse and manage requirement inputs used for estimates.</p>
    </div>
  );
}

// PUBLIC_INTERFACE
export function NewEstimate() {
  /** New estimate form placeholder */
  return (
    <div className="panel">
      <h2 className="subtitle">New Estimate</h2>
      <p className="description">Start a new estimate by entering requirement details.</p>
      <div className="form-grid">
        <div className="form-row">
          <label>Title</label>
          <input className="input" placeholder="e.g., API Integration Feature" />
        </div>
        <div className="form-row">
          <label>Description</label>
          <textarea className="input" rows="4" placeholder="Brief description of the requirement..." />
        </div>
        <div className="form-row two-col">
          <div>
            <label>Complexity</label>
            <select className="input">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div>
            <label>Risk</label>
            <select className="input">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>
        <div className="actions">
          <button className="btn btn-primary">Estimate</button>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function EstimateDetail() {
  /** Estimate details placeholder */
  const { id } = useParams();
  return (
    <div className="panel">
      <h2 className="subtitle">Estimate #{id}</h2>
      <p className="description">Review details for the selected estimate.</p>
    </div>
  );
}

// PUBLIC_INTERFACE
export function Reference() {
  /** Reference data page placeholder */
  return (
    <div className="panel">
      <h2 className="subtitle">Reference Data</h2>
      <p className="description">View reference tables and assumptions used by the estimator.</p>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Root application layout and routing */
  const [theme, setTheme] = useState('light');

  // Apply theme to document element for CSS variable control
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    /** Toggles between light and dark mode */
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-root">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <div className="layout">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/requirements" element={<Requirements />} />
            <Route path="/estimates/new" element={<NewEstimate />} />
            <Route path="/estimates/:id" element={<EstimateDetail />} />
            <Route path="/reference" element={<Reference />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
