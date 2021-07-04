import React, { useState } from 'react'
import { Link , useHistory} from 'react-router-dom'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import LoginAPI from "../apis/LoginAPI"

const Login = () => {

    const history = useHistory();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await LoginAPI.post("/", {
                username,
                password
            });
            
            if(response) {
                window.localStorage.setItem('token', response.data.accessToken)
                
                if(window.localStorage.getItem('token') === 'invalid_token') {
                    history.go(0)
                } else {
                    history.push("/admin/blog");
                }
            }
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="container-fluid">
            <Navbar />
            <h2 className="text-center m-4">Admin Login</h2>

            <form className="m-2" action="">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    value={username}
                                    id="username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group my-2">
                            <label htmlFor="password">Password</label>
                                <input
                                    value={password}
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    className="form-control"
                                />
                            </div>
                            
                            <button onClick={handleLogin} type="submit" className="btn btn-primary">
                                LOG IN
                            </button>
                            
                            <Link to="/">
                                <button className="btn btn-secondary mx-2">
                                    CANCEL
                                </button>
                            </Link>
                        </form>
            <Footer />
        </div>
    )
}

export default Login