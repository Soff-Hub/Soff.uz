import axios from "axios";

export const baseDomain = "https://api.soff.uz/api/v1/";

const clinet = axios.create({
  baseURL: baseDomain,
  headers: "Header",
});

export default clinet;
