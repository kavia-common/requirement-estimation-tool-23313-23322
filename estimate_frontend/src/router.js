import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/theme.css';
import TopNav from './components/Layout/TopNav';
import Sidebar from './components/Layout/Sidebar';

// Feature routes
import EstimateList from './components/Estimates/EstimateList';
import EstimateDetail from './components/Estimates/EstimateDetail';
import EstimateForm from './components/Estimates/EstimateForm';
import RequirementCatalog from './components/Requirements/RequirementCatalog';

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
            <Route path="/estimates" element={<EstimateList />} />
            <Route path="/estimates/new" element={<EstimateForm />} />
            <Route path="/estimates/:id" element={<EstimateDetail />} />
            <Route path="/requirements" element={<RequirementCatalog />} />
            <Route path="*" element={<div className="panel">Not Found</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
