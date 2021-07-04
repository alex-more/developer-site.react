import axios from "axios";
require("dotenv").config();

const port = process.env.PORT;
//console.log(port)

axios.defaults.baseURL = `http://localhost:4000/api/blog`
axios.defaults.headers.common = { 'Authorization': "Bearer " + window.localStorage.getItem('token') }

export default axios;