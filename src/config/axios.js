import axios from "axios";
export default axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });
//axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;