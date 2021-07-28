import React, {useEffect, useContext, useState} from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import BlogPeek from "../components/BlogPeek"
import ProjectPeek from "../components/ProjectPeek"
import BlogAPI from "../apis/BlogAPI"
import GithubAPI from "../apis/GithubAPI"
import { BlogContext } from '../context/BlogContext';

const Home = () => {
    
    //TODO: Add 3 project peeks to home page

    const {blogPosts, setBlogPosts} = useContext(BlogContext)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await BlogAPI.get("/peek/3")
                setBlogPosts(response.data.data.blog)

                const projects = await GithubAPI.get()
                projects.data.sort(compareDates)
                setProjects(projects.data.slice(0, 3))
            } catch (err) {
    
            }
        }

        fetchData();
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
        <div className="container-fluid">
            <Navbar />
            <h2 className="text-center m-4">Recent Blog Posts</h2>
            
            {projects && projects.map(project => {
                return (
                    <ProjectPeek repo={project.name} url={project.html_url} key={project.name}/> 
                )
            })}

            {blogPosts && blogPosts.map(post => {
                return (
                    <BlogPeek post={post} key={post.id}/>
                )
            })}

            <Footer />
        </div>
    )
}

export default Home
