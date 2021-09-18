import axios from "axios";

const api = axios.create({
  baseURL: "https://unique-user-id.herokuapp.com/api",
});

export default api;
