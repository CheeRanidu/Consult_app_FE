import axios from "axios";
export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*", // Replace '*' with your allowed origin if needed
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json", // Set your content type here
  },
});
//axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
