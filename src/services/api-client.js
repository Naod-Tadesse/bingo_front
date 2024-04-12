import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

class APIClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getAll = (config) => {
    return axiosInstance.get(this.endpoint, config);
  };

  post = (config) => {
    return axiosInstance.post(this.endpoint, config);
  };

  put = (config) => {
    return axiosInstance.put(this.endpoint, config);
  };
}

export default APIClient;
