import React, { useEffect, useState } from "react"
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
                console.log(projects)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [])

    function compareDates(a, b) {
        if (a.updated_at < b.updated_at) {
            return 1;
        }
        if (a.updated_at > b.updated_at) {
            return -1;
        }

        return 0;
    }
    return (
        <div className="d-flex flex-column pageContainer">
            <Navbar />

            <div className="container-fluid">
                <div className="project-preview mb-5">
                    <h2 className="text-center m-5">Github Projects</h2>
                    <p className="text-center">This is an auto generated list of all my projects on Github.</p>
                    {projects && projects.map(project => {
                        return (
                            <ProjectPeek repo={project.name} url={project.html_url} key={project.name} />
                        )
                    })}
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Projects
