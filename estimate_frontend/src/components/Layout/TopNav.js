import React from 'react';
import '../../styles/theme.css';

// PUBLIC_INTERFACE
export default function TopNav() {
  /** Top navigation bar with brand and quick actions. */
  return (
    <header className="topnav" role="banner" aria-label="Top navigation">
      <div className="brand" aria-label="Application brand">
        <div className="brand-badge" aria-hidden="true" />
        <span>Requirement Estimator</span>
      </div>
      <div className="topnav-actions">
        <a
          className="btn btn-ghost"
          href="https://vscode-internal-41577-beta.beta01.cloud.kavia.ai:3001/docs"
          target="_blank"
          rel="noreferrer"
          title="Open API Docs"
        >
          API Docs
        </a>
      </div>
    </header>
  );
}
