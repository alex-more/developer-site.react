import axios from "axios";
require("dotenv").config();

const port = process.env.PORT;
//console.log(port)

export default axios.create({
    baseURL: `http://localhost:4000/api/login` // TODO: Dont hardcode port
});