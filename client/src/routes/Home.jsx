import React, {useEffect, useContext, useState} from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import FeaturedProject from "../components/FeaturedProject"

const Home = () => {
    
    const desc_project1 = "Portfolio website built with React and NodeJS, used to link to various projects."
    const desc_project2 = "Blog managing app that connects to a MongoDB database remotely."

    return (
        <div className="d-flex flex-column pageContainer">
            <Navbar />
            <div className="container-fluid">

            <h2 className="text-center m-5">Featured Projects</h2>
                <div className="project-feature">
                    <FeaturedProject repo="developer-site.react" url="https://alex-more.com" desc={desc_project1}/> 
                    <FeaturedProject repo="blog-manager" url="#" desc={desc_project2} />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Home
