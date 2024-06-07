import axios from "axios";

export const baseDomain = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/`

const clinet = axios.create({
  baseURL: baseDomain,
  headers: "Header",
});

export default clinet;
