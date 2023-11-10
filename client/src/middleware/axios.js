import axios from "axios";

// Create an instance of axios with custom configuration
const Axios = axios.create({
  baseURL: "http://localhost:3001", // Set the base URL for API requests

  headers: {
    "Content-Type": "application/json", // Set the request content type to JSON
  },

  withCredentials: true, // Enable sending cookies along with requests
});

export default Axios;
