import React, {useEffect, useContext} from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import BlogPeek from "../components/BlogPeek"
import BlogAPI from "../apis/BlogAPI"
import { BlogContext } from '../context/BlogContext';

const BlogPage = () => {
    
    const {blogPosts, setBlogPosts} = useContext(BlogContext)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await BlogAPI.get("/")
                setBlogPosts(response.data.data.blog)
            } catch (err) {
    
            }
        }

        fetchData();
    }, [])

    return (
        <div className="container-fluid">
            <Navbar />
            <h2 className="text-center m-4">All Blog Posts</h2>

            {blogPosts.map(post => {
                return (
                    <BlogPeek post={post}/> 
                )
            })}

            <Footer />
        </div>
    )
}

export default BlogPage
