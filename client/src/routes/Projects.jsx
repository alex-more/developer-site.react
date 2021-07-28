import React, {useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProjectPeek from "../components/ProjectPeek"
import GithubAPI from "../apis/GithubAPI"

const Projects = () => {
    
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Gives me list of all repos
        const fetchData = async () => {
            try {
                const response = await GithubAPI.get()
                response.data.sort(compareDates)
                setProjects(response.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [])

    function compareDates(a, b) {
        if(a.updated_at < b.updated_at) {
            return 1;
        }
        if(a.updated_at > b.updated_at) {
            return -1;
        }

        return 0;
    }
return (
    <>
    <Navbar />

    {projects && projects.map(project => {
        return (
            <ProjectPeek repo={project.name} url={project.html_url} key={project.name}/> 
        )
    })}

    <Footer />
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