import axios from "axios";

const TokenReq = axios.create({
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    accept: "application/json",
  },
  baseURL: import.meta.env.VITE_BASE_URL,
});

export { TokenReq };
