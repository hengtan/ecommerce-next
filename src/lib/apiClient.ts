const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const apiClient = {
  get: async (url: string) => {
    const response = await fetch(`${API_URL}${url}`);
    if (!response.ok) throw new Error(`Erro na requisição GET: ${response.statusText}`);
    return response.json();
  },

  post: async (url: string, body: any) => {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`Erro na requisição POST: ${response.statusText}`);
    return response.json();
  },

  put: async (url: string, body: any) => {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`Erro na requisição PUT: ${response.statusText}`);
    return response.json();
  },

  delete: async (url: string) => {
    const response = await fetch(`${API_URL}${url}`, { method: 'DELETE' });
    if (!response.ok) throw new Error(`Erro na requisição DELETE: ${response.statusText}`);
    return response.json();
  },
};