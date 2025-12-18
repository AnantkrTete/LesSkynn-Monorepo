export async function fetchRoutineFromBackend(data: {
  skinType: string;
  concern: string;
  commitment: string;
  preference: string;
}) {
  const resp = await fetch("http://localhost:8000/routine", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!resp.ok) {
    throw new Error("Failed to fetch routine");
  }

  return await resp.json();
}
 