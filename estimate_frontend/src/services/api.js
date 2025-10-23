import { getApiBaseUrl } from '../config';

/**
 * Lightweight API client with in-memory stubs.
 * Switch endpoint implementations later by replacing stub calls with real fetch calls.
 */

const BASE_URL = getApiBaseUrl();

// In-memory stubbed data store
let __stub = {
  estimates: [
    {
      id: 'est-001',
      name: 'Initial Website Revamp',
      createdAt: new Date().toISOString(),
      totalCost: 5400,
      totalHours: 72,
      items: [
        { requirementId: 'REQ-UI-001', title: 'Landing page redesign', hours: 16, cost: 1200 },
        { requirementId: 'REQ-AUTH-001', title: 'User login & signup', hours: 20, cost: 1600 },
        { requirementId: 'REQ-API-002', title: 'REST API endpoints', hours: 36, cost: 2600 },
      ],
      notes: 'Client wants a clean modern UI with basic auth and CRUD endpoints.',
    },
  ],
  requirements: [
    { id: 'REQ-UI-001', category: 'UI', title: 'Landing page redesign', defaultHours: 16, description: 'Modern hero, features grid, responsive.' },
    { id: 'REQ-UI-002', category: 'UI', title: 'Dashboard page', defaultHours: 20, description: 'Stats, tables, quick actions.' },
    { id: 'REQ-AUTH-001', category: 'Auth', title: 'User login & signup', defaultHours: 20, description: 'Email/password, password reset.' },
    { id: 'REQ-API-001', category: 'API', title: 'CRUD for Entities', defaultHours: 24, description: 'Create, Read, Update, Delete endpoints.' },
    { id: 'REQ-API-002', category: 'API', title: 'REST API endpoints', defaultHours: 36, description: 'Public/Private endpoints with docs.' },
  ],
};

// Simulate network latency for stubbed calls
function delay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// PUBLIC_INTERFACE
export const RequirementsAPI = {
  /** Returns list of requirements from stub (or backend later). */
  async list() {
    // In future: return fetch(`${BASE_URL}/requirements`).then(r => r.json());
    await delay();
    return [...__stub.requirements];
  },
};

// PUBLIC_INTERFACE
export const EstimatesAPI = {
  /** Returns list of estimates with brief summary. */
  async list() {
    await delay();
    // In future: fetch(`${BASE_URL}/estimates`)
    return __stub.estimates.map((e) => ({
      id: e.id,
      name: e.name,
      createdAt: e.createdAt,
      totalCost: e.totalCost,
      totalHours: e.totalHours,
      itemsCount: e.items?.length || 0,
    }));
  },

  /** Returns estimate by id with details. */
  async getById(id) {
    await delay();
    // In future: fetch(`${BASE_URL}/estimates/${id}`)
    const found = __stub.estimates.find((e) => e.id === id);
    if (!found) {
      const err = new Error('Estimate not found');
      err.status = 404;
      throw err;
    }
    return { ...found };
  },

  /** Creates a new estimate and returns it. */
  async create(payload) {
    await delay();
    // In future: POST to `${BASE_URL}/estimates`
    const id = `est-${String(__stub.estimates.length + 1).padStart(3, '0')}`;
    const items = (payload.items || []).map((it) => ({
      requirementId: it.requirementId,
      title: it.title,
      hours: Number(it.hours || 0),
      cost: Number(it.cost || 0),
    }));
    const totalHours = items.reduce((sum, it) => sum + (Number(it.hours) || 0), 0);
    const totalCost = items.reduce((sum, it) => sum + (Number(it.cost) || 0), 0);

    const record = {
      id,
      name: payload.name || `Estimate ${id}`,
      notes: payload.notes || '',
      createdAt: new Date().toISOString(),
      items,
      totalHours,
      totalCost,
    };
    __stub.estimates.unshift(record);
    return { ...record };
  },
};

export default {
  BASE_URL,
  RequirementsAPI,
  EstimatesAPI,
};
