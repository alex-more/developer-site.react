import React from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const Login = () => {
    return (
        <div className="container-fluid">
            <Navbar />
            <h2 className="text-center m-4">Admin Login</h2>

            <div className="text-center">*Insert Form Here* 
                <a href="/admin/blog" className="mx-2">Edit Blog</a>
            </div>
            <Footer />
        </div>
    )
}

export default Login