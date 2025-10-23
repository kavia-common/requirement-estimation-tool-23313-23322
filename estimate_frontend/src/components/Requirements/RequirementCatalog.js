import React, { useEffect, useState } from 'react';
import '../../styles/theme.css';
import { RequirementsAPI } from '../../services/api';

// PUBLIC_INTERFACE
export default function RequirementCatalog({ onSelect }) {
  /**
   * Displays browseable requirements. When onSelect is provided,
   * clicking a requirement will pass the requirement back to parent.
   */
  const [reqs, setReqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let mounted = true;
    RequirementsAPI.list()
      .then((data) => { if (mounted) setReqs(data); })
      .catch((e) => setErr(e?.message || 'Failed to load requirements'))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  const filtered = reqs.filter((r) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      r.title.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      (r.description || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="panel">
      <div className="header-row">
        <div className="route-title">Requirements</div>
        <div />
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <input
          aria-label="Search requirements"
          placeholder="Search requirements…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(0,0,0,0.12)',
            outline: 'none',
          }}
        />
      </div>

      {loading && <div className="card">Loading requirements…</div>}
      {err && <div className="card" style={{ borderColor: 'var(--color-error)' }}>{err}</div>}

      <div style={{ display: 'grid', gap: 10 }}>
        {filtered.map((r) => (
          <div key={r.id} className="card" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700 }}>{r.title}</div>
              <div className="text-muted" style={{ fontSize: 12 }}>{r.id} • {r.category}</div>
              {r.description && <div style={{ marginTop: 6 }}>{r.description}</div>}
              <div className="text-muted" style={{ fontSize: 12, marginTop: 6 }}>Default: {r.defaultHours}h</div>
            </div>
            {onSelect && (
              <button className="btn btn-primary" onClick={() => onSelect(r)}>
                Add
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
