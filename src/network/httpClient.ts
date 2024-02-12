import axios from "axios";

const baseURL = "http://localhost:8000";
console.log("baseURL", baseURL);
const HttpClient = axios.create({
  baseURL: baseURL,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFTOKEN",
});

// interceptors
HttpClient.interceptors.request.use(async (config) => {
  try {
  } catch (error) {}
  return config;
});

HttpClient.interceptors.response.use();

export default HttpClient;
