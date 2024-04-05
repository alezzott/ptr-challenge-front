import axios from "axios";


export const api = axios.create({
    baseURL: "http://localhost:3333"
})

api.interceptors.response.use(
  (response) => response,
  (error: any) => {
    return Promise.reject(error);
  }
)