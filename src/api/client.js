// export const localApi = "https://koolsoft-hocthongminh.onrender.com/";
export const localApi = "http://localhost:3001/";

export async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = {
    "Content-Type": "application/json",
  };

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await fetch(endpoint, config).catch((err) => {
      console.log("catch err: ", err);
    });
    data = await response.json();
    if (response.ok) {
      // Return a result object similar to Axios
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      };
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(localApi + endpoint, { ...customConfig, method: "GET" });
};

client.post = function (endpoint, body, customConfig = {}) {
  return client(localApi + endpoint, { ...customConfig, body });
};
