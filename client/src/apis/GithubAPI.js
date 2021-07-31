import axios from "axios";
const config = require('../config.json');

const port = config.server_url;

const username = config.github_username;

let gitAxios = axios.create({
    baseURL: `${port}/api/github/${username}`
})

export default gitAxios;