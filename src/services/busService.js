const BASE_URL = "http://127.0.0.1:8000";

export const getAllBuses = async () => {
  const res = await fetch(`${BASE_URL}/buses`);
  return res.json();
};

export const getActiveBuses = async () => {
  const res = await fetch(`${BASE_URL}/active-buses`);
  return res.json();
};

export const getGhostBuses = async () => {
  const res = await fetch(`${BASE_URL}/ghost-buses`);
  return res.json();
};
