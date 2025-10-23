 // PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /** Returns API base URL from environment, defaulting to http://localhost:3001. 
   * Requires env var REACT_APP_API_BASE_URL to be set in deployment environments.
   */
  const url = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
  return url.replace(/\/+$/, '');
}
