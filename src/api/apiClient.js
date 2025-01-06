import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://fauques.freeboxos.fr:3000/",
});

apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
