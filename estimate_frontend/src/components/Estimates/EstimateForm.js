import React, { useState } from 'react';
import '../../styles/theme.css';
import { EstimatesAPI } from '../../services/api';
import RequirementCatalog from '../Requirements/RequirementCatalog';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function EstimateForm() {
  /** Form to create a new estimate. Allows adding requirement items and computing totals. */
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState(null);
  const [showCatalog, setShowCatalog] = useState(false);

  function addRequirement(r) {
    setItems((prev) => [
      ...prev,
      {
        requirementId: r.id,
        title: r.title,
        hours: r.defaultHours || 0,
        cost: (r.defaultHours || 0) * 80, // simple default rate for stub
      },
    ]);
  }

  function updateItem(index, field, value) {
    setItems((prev) =>
      prev.map((it, i) => (i === index ? { ...it, [field]: field === 'title' ? value : Number(value) } : it))
    );
  }

  function removeItem(index) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  const totalHours = items.reduce((sum, it) => sum + (Number(it.hours) || 0), 0);
  const totalCost = items.reduce((sum, it) => sum + (Number(it.cost) || 0), 0);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    setSubmitting(true);
    try {
      const created = await EstimatesAPI.create({ name, notes, items });
      navigate(`/estimates/${created.id}`);
    } catch (e2) {
      setErr(e2?.message || 'Failed to create estimate');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="panel">
      <div className="header-row">
        <div className="route-title">Create Estimate</div>
        <button className="btn btn-ghost" onClick={() => setShowCatalog((v) => !v)}>
          {showCatalog ? 'Hide Requirements' : 'Browse Requirements'}
        </button>
      </div>

      {err && <div className="card" style={{ borderColor: 'var(--color-error)', marginBottom: 12 }}>{err}</div>}

      <form onSubmit={handleSubmit}>
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'grid', gap: 10 }}>
            <div>
              <label htmlFor="estName" className="text-muted" style={{ fontSize: 12 }}>Estimate Name</label>
              <input
                id="estName"
                placeholder="e.g., Mobile App MVP"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0,0,0,0.12)',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label htmlFor="estNotes" className="text-muted" style={{ fontSize: 12 }}>Notes</label>
              <textarea
                id="estNotes"
                placeholder="Key requirements, constraints, acceptance criteria…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0,0,0,0.12)',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontWeight: 700 }}>Line Items</div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setItems((prev) => [...prev, { requirementId: '', title: 'Custom item', hours: 0, cost: 0 }])}
            >
              + Add Custom
            </button>
          </div>
          {items.length === 0 && <div className="text-muted">No items added yet.</div>}
          <div style={{ display: 'grid', gap: 8 }}>
            {items.map((it, idx) => (
              <div key={`${it.requirementId}-${idx}`} className="card" style={{ display: 'grid', gap: 8 }}>
                <div className="text-muted" style={{ fontSize: 12 }}>
                  Requirement ID: {it.requirementId || 'N/A'}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 140px auto', gap: 8, alignItems: 'center' }}>
                  <input
                    value={it.title}
                    onChange={(e) => updateItem(idx, 'title', e.target.value)}
                    placeholder="Item title"
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(0,0,0,0.12)',
                      outline: 'none',
                    }}
                  />
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={it.hours}
                    onChange={(e) => updateItem(idx, 'hours', e.target.value)}
                    placeholder="Hours"
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(0,0,0,0.12)',
                      outline: 'none',
                    }}
                  />
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={it.cost}
                    onChange={(e) => updateItem(idx, 'cost', e.target.value)}
                    placeholder="Cost"
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(0,0,0,0.12)',
                      outline: 'none',
                    }}
                  />
                  <button type="button" className="btn btn-ghost" onClick={() => removeItem(idx)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Summary</div>
          <div className="text-muted">Total Hours: <b>{totalHours}</b></div>
          <div className="text-muted">Total Cost: <b>${totalCost}</b></div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? 'Creating…' : 'Create Estimate'}
          </button>
          <button className="btn btn-ghost" type="button" onClick={() => navigate('/estimates')}>
            Cancel
          </button>
        </div>
      </form>

      {showCatalog && (
        <div style={{ marginTop: 16 }}>
          <RequirementCatalog onSelect={(r) => addRequirement(r)} />
        </div>
      )}
    </div>
  );
}
