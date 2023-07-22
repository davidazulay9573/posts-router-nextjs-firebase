import axios from "axios";


const API_URL = "http://localhost:3000/api";

axios.defaults.baseURL = API_URL;

export function setCommonHeader(key, value) {
  axios.defaults.headers.common[key] = value;
}

axios.interceptors.response.use(null, (error) => {
  if (error.code === "ERR_NETWORK") {
    toast.error("Check your Internet connection");
  } else if (error.response && error.response.status === 403) {
    toast.error("An unexpected error occurred");
  }
  return Promise.reject(error);
});

const httpService = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.put,
  delete: axios.delete,
  setCommonHeader,
};

export default httpService;
