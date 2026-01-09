const API_URL = "http://localhost:4000/api";

export async function apiRequest(
  endpoint: string,
  method: string,
  body?: any
) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });

  return response.json();
}
