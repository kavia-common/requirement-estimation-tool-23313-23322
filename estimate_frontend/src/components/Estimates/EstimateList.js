import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/theme.css';
import { EstimatesAPI } from '../../services/api';

// PUBLIC_INTERFACE
export default function EstimateList() {
  /** Displays a list of estimates with quick summary and link to details. */
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    EstimatesAPI.list()
      .then((data) => {
        if (mounted) setEstimates(data);
      })
      .catch((e) => setErr(e?.message || 'Failed to load estimates'))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  return (
    <div className="panel">
      <div className="header-row">
        <div className="route-title">Estimates</div>
        <Link className="btn btn-primary" to="/estimates/new">+ New Estimate</Link>
      </div>
      {loading && <div className="card">Loading estimates…</div>}
      {err && <div className="card" style={{ borderColor: 'var(--color-error)' }}>{err}</div>}
      {!loading && !err && estimates.length === 0 && <div className="card">No estimates yet.</div>}
      <div style={{ display: 'grid', gap: 12 }}>
        {estimates.map((e) => (
          <div key={e.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700 }}>{e.name}</div>
              <div className="text-muted" style={{ fontSize: 12 }}>
                Created {new Date(e.createdAt).toLocaleString()} • {e.itemsCount} items • {e.totalHours}h • ${e.totalCost}
              </div>
            </div>
            <Link className="btn btn-amber" to={`/estimates/${e.id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
