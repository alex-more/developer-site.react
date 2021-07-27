import React, {useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProjectPeek from "../components/ProjectPeek"
import GithubAPI from "../apis/GithubAPI"
import ReadmeAPI from "../apis/ReadmeAPI"

const Projects = () => {
    
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Gives me list of all repos
        const fetchData = async () => {
            try {
                console.log("Loading projects page...")
                const response = await GithubAPI.get()
                //const response = await ReadmeAPI.get("blog-manager/master/README.md")
                //const response = await axios.get("https://api.github.com/users/alex-more")
                //setBlogPosts(response.data.data.blog) Extract projects from response
                setProjects(response.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [])

return (
    <>
    <Navbar />

    {projects && projects.map(project => {
        return (
            <ProjectPeek repo={project.name} key={project.name}/> 
        )
    })}
    </>

)
    /*
    return (
        <div className="container-fluid">
            <Navbar />
            <h2 className="text-center m-4">All Blog Posts</h2>

            {blogPosts.map(project => {
                return (
                    <ProjectPeek project={project} key={project.id}/> 
                )
            })}

            <Footer />
        </div>
    )*/
}

export default Projects