import axios from "axios";
const config = require('../config.json');

const port = config.server_url;

let readmeAxios = axios.create({
    baseURL: `${port}/api/readme/`
})

export default readmeAxios;