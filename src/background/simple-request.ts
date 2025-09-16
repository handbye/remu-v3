// Simple fetch-based request utility for Service Worker
export const simpleRequest = {
  get: async (
    url: string,
    options: { headers?: Record<string, string> } = {},
  ) => {
    const response = await fetch(`https://api.github.com${url}`, {
      method: 'GET',
      headers: options.headers || {},
    });
    return { data: await response.json() };
  },

  post: async (
    url: string,
    data: any,
    options: { headers?: Record<string, string> } = {},
  ) => {
    const response = await fetch(`https://api.github.com${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
    });
    return { data: await response.json() };
  },

  patch: async (
    url: string,
    data: any,
    options: { headers?: Record<string, string> } = {},
  ) => {
    const response = await fetch(`https://api.github.com${url}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
    });
    return { data: await response.json() };
  },
};
