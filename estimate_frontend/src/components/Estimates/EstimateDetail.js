import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../styles/theme.css';
import { EstimatesAPI } from '../../services/api';

// PUBLIC_INTERFACE
export default function EstimateDetail() {
  /** Displays detailed view of a specific estimate by id. */
  const { id } = useParams();
  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    EstimatesAPI.getById(id)
      .then((data) => { if (mounted) setEstimate(data); })
      .catch((e) => setErr(e?.message || 'Failed to load estimate'))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, [id]);

  return (
    <div className="panel">
      <div className="header-row">
        <div className="route-title">Estimate Details</div>
        <Link className="btn btn-ghost" to="/estimates">Back</Link>
      </div>
      {loading && <div className="card">Loading…</div>}
      {err && <div className="card" style={{ borderColor: 'var(--color-error)' }}>{err}</div>}
      {!loading && estimate && (
        <>
          <div className="card" style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{estimate.name}</div>
            <div className="text-muted" style={{ fontSize: 12 }}>
              Created {new Date(estimate.createdAt).toLocaleString()}
            </div>
            {estimate.notes && <div style={{ marginTop: 8 }}>{estimate.notes}</div>}
          </div>
          <div className="card" style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Summary</div>
            <div className="text-muted">Total Hours: <b>{estimate.totalHours}</b></div>
            <div className="text-muted">Total Cost: <b>${estimate.totalCost}</b></div>
            <div className="text-muted">Items: <b>{estimate.items?.length || 0}</b></div>
          </div>
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Line Items</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {(estimate.items || []).map((it, idx) => (
                <div key={`${it.requirementId}-${idx}`} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 120px', gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{it.title}</div>
                    <div className="text-muted" style={{ fontSize: 12 }}>{it.requirementId}</div>
                  </div>
                  <div className="text-muted">{it.hours}h</div>
                  <div className="text-muted">${it.cost}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
