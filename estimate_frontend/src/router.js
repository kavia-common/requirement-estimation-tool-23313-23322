import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import './styles/theme.css';
import TopNav from './components/Layout/TopNav';
import Sidebar from './components/Layout/Sidebar';

// Route stubs
function EstimatesList() {
  return (
    <div className="panel">
      <div className="header-row">
        <div className="route-title">Estimates</div>
        <a className="btn btn-primary" href="/estimates/new">+ New Estimate</a>
      </div>
      <p className="text-muted">View and manage your estimates here. This is a placeholder list.</p>
      <div className="card">No estimates yet.</div>
    </div>
  );
}

function NewEstimate() {
  return (
    <div className="panel">
      <div className="header-row">
        <div className="route-title">Create Estimate</div>
        <div />
      </div>
      <p className="text-muted">Start a new estimate. Form to be implemented.</p>
      <div className="card">Form goes here.</div>
    </div>
  );
}

function EstimateDetail() {
  const { id } = useParams();
  return (
    <div className="panel">
      <div className="header-row">
        <div className="route-title">Estimate Details</div>
      </div>
      <p className="text-muted">Details for estimate ID: <strong>{id}</strong></p>
      <div className="card">Detail view placeholder.</div>
    </div>
  );
}

function Requirements() {
  return (
    <div className="panel">
      <div className="header-row">
        <div className="route-title">Requirements</div>
      </div>
      <p className="text-muted">Requirements catalogue placeholder.</p>
      <div className="card">Content to be implemented.</div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function AppRouter() {
  /** Main app router and layout shell using Ocean Professional theme. */
  return (
    <BrowserRouter>
      <div className="app-shell">
        <TopNav />
        <Sidebar />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Navigate to="/estimates" replace />} />
            <Route path="/estimates" element={<EstimatesList />} />
            <Route path="/estimates/new" element={<NewEstimate />} />
            <Route path="/estimates/:id" element={<EstimateDetail />} />
            <Route path="/requirements" element={<Requirements />} />
            <Route path="*" element={<div className="panel">Not Found</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
