const baseUrl = "http://localhost:4000/";
const makeUrl = (url: string, params?: any) => {
  if (url.startsWith("http")) return url;
  let _url = baseUrl + url;
  return _url;
};

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: Record<string, any>;
};

const parsentError = (err: any) => {
  console.error("Error:", err);
};

export const makeRequest = async (
  url: string,
  { method, body, ...opitons }: RequestOptions
) => {
  const path = makeUrl(url);
  const res = await fetch(path, {
    method: method ?? "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    ...opitons,
  });

  try {
    if (res.ok) {
      return res.json();
    }
  } catch (e) {
    parsentError(e);
  }
};

export const getRequest = (url: string, { ...options }: RequestOptions) => {
  return makeRequest(url, { method: "GET", ...options });
};

export const updateRequest = (url: string, { ...options }: RequestOptions) => {
  return makeRequest(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
};

export const deleteRequest = (url: string, { ...options }: RequestOptions) => {
  return makeRequest(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
};
