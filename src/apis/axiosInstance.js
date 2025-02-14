import axios from "axios";

const TokenReq = axios.create({
  headers: {
    accept: "application/json",
  },
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASE_URL,
});

export { TokenReq };
