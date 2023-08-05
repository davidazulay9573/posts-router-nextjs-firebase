import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api" ;

export function setCommonHeader(key, value) {
  axios.defaults.headers.common[key] = value;
}

const httpService = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.put,
  delete: axios.delete,
  setCommonHeader,
};

export default httpService;
