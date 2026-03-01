export const BASE_URL = "https://api.nomoreparties.co";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const register = (username, email, password) => {
  return fetch(`${BASE_URL}/auth/local/register`, {
    method: "POST",
    headers,
    body: JSON.stringify({ username, password, email }),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`),
  );
};
