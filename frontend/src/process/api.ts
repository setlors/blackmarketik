export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const baseUrl = "http://localhost:5000";
  const fullUrl = baseUrl + endpoint;
  const token = localStorage.getItem("bm_token");

  let requestHeaders: Record<string, string>;

  if (token) {
    requestHeaders = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
  } else {
    requestHeaders = {
      "Content-Type": "application/json",
    };
  }

  return fetch(fullUrl, {
    method: options.method,
    body: options.body,
    headers: requestHeaders,
  });
};
