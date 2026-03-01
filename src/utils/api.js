import { headers } from "./auth";

export const BASE_URL = "https://api.nomoreparties.co";

export function getInfo(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",

    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`),
    )
    .catch(console.error);
}
