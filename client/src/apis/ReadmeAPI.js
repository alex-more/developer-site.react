import axios from "axios";
require("dotenv").config();

// TODO: Find way to make username a global variable

let readmeAxios = axios.create({
    baseURL: `http://localhost:4000/api/readme/`
})

export default readmeAxios;