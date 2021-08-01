import React, {useEffect, useContext, useState} from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import BlogPeek from "../components/BlogPeek"
import ProjectPeek from "../components/ProjectPeek"
import BlogAPI from "../apis/BlogAPI"
import GithubAPI from "../apis/GithubAPI"
import { BlogContext } from '../context/BlogContext';

const Home = () => {
    
    const {blogPosts, setBlogPosts} = useContext(BlogContext)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projects = await GithubAPI.get()
                projects.data.sort(compareDates)
                setProjects(projects.data.slice(0, 4))

                const response = await BlogAPI.get("/peek/3")
                setBlogPosts(response.data.data.blog)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData();
    }, [setBlogPosts])

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
        <div className="d-flex flex-column pageContainer">
            <Navbar />
            <div className="container-fluid">

                <div className="intro mt-5">
                    <h1 className="bigtext intro-part mx-2">
                        Hi, I'm Alex.
                    </h1>

                    <h5 className="intro-part mx-2">
                        I'm a programmer currently studying Computer Science at UQAM. <br /><br />
                        This website was made using Node.js, PostgreSQL and React and connects to Github's API.
                    </h5>
                </div>

                <br /><br />
                <hr />
                <br />

                <div className="project-preview">
                    <h2 className="text-center m-5">Recent Projects</h2>
                    {projects && projects.map(project => {
                        return (
                            <ProjectPeek repo={project.name} url={project.html_url} key={project.name}/> 
                        )
                    })}
                </div>
                
                <br /><br />
                <hr />
                <br />

                <h2 className="text-center m-5">Recent Blog Posts</h2>

                <div className="blog-preview mb-5">
                    {blogPosts && blogPosts.map(post => {
                        return (
                            <BlogPeek post={post} key={post.id}/>
                        )
                    })}
                </div>
                
            </div>

            <Footer />
        </div>
    )
}

export default Home
