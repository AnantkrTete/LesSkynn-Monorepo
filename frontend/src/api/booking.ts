export async function initBookingFromBackend(data: {
  influencer_id: string;
  influencer_name: string;
  user_name: string;
  user_location: string;
  payment_screenshot_url: string;
  quiz_response_id: string;
}) {
  const resp = await fetch("http://localhost:8000/booking/init", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(err || "Failed to init booking");
  }

  return await resp.json();
}
