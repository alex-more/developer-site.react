import React from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const AboutMe = () => {
    return (
        <div className="d-flex flex-column pageContainer">
            <Navbar />
            <div className="container-fluid">
                <br /><br /><br />
                <div className="aboutme">
                    <h1 className="text-center">
                        Hi, I'm Alex.
                    </h1>
                    <br />
                    <h5 className="text-start">
                        I'm a programmer currently studying Computer Science at UQAM.
                        My professional interests are web development and data analysis. I also occasionally work on small video games with friends and have some knowledge on image generation and processing, with OpenGL and Python.
                        <br /><br />
                        These days I am working on an AWS certification, and improving my web skills, with a focus on PostgreSQL, React, and Node.js.
                        <br /><br />
                        If you have something in mind, you can always message me at alexmore.tech@gmail.com
                    </h5>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AboutMe
