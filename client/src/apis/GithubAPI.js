import axios from "axios";
require("dotenv").config();

const username = "alex-more" // Put your username here

// TODO: Find way to make username a global variable

let gitAxios = axios.create({
    baseURL: `http://localhost:4000/api/github/${username}`
})

export default gitAxios;