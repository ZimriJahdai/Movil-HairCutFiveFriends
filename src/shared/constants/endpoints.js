const resolveUrl = (preferred, fallback) => {
  const value = preferred;
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
};

const stripPath = (url) => {
  try {
    const parsed = new URL(url);
    parsed.pathname = '';
    return parsed.toString().replace(/\/$/, '');
  } catch {
    return url;
  }
};

const ensureBasePath = (url, basePath) => {
  try {
    const parsed = new URL(url);
    if (parsed.pathname === '/' || !parsed.pathname || parsed.pathname === '') {
      parsed.pathname = basePath;
    } else if (!parsed.pathname.endsWith(basePath)) {
      parsed.pathname = basePath;
    }
    return parsed.toString().replace(/\/$/, '');
  } catch {
    return url;
  }
};

export const ENDPOINTS = {
  AUTH: stripPath(
    resolveUrl(process.env.EXPO_PUBLIC_AUTH_URL, 'http://localhost:3005')
  ),
  API: ensureBasePath(
    resolveUrl(process.env.EXPO_PUBLIC_API_URL, 'http://localhost:3006'),
    '/HaircutFiveFriends/api/v1'
  ),
};
