import axios from "axios";
const config = require('../config.json');

const port = config.server_url;

axios.defaults.baseURL = `${port}/api/blog`
axios.defaults.headers.common = { 'Authorization': "Bearer " + window.localStorage.getItem('token') }

export default axios;