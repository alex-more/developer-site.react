import React from 'react'

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark text-light mb-4">
            <h2 className="mx-4">Alex Moreno</h2>
            <div className="text-end mx-4">
                <a href="/" className="link-info text-decoration-none m-2">Home</a>
                <a href="/blog" className="link-info text-decoration-none m-2">Blog</a>
                <a href="/projects" className="link-info text-decoration-none m-2">Projects</a>
            </div>
        </nav>
    )
}

export default Navbar
