import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../../styles/theme.css';

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Left sidebar with primary navigation links. */
  return (
    <aside className="sidebar" role="navigation" aria-label="Sidebar">
      <div className="section-title">Navigation</div>
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/estimates" className={({ isActive }) => isActive ? 'active' : undefined}>
            <span>Estimates</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/estimates/new" className={({ isActive }) => isActive ? 'active' : undefined}>
            <span>New Estimate</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/requirements" className={({ isActive }) => isActive ? 'active' : undefined}>
            <span>Requirements</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
