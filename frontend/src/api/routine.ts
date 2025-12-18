const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchRoutineFromBackend(data: {
  skinType: string;
  concern: string;
  commitment: string;
  preference: string;
}) {
  const resp = await fetch(`${API_BASE_URL}/routine`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!resp.ok) {
    throw new Error("Failed to fetch routine");
  }

  return await resp.json();
}
