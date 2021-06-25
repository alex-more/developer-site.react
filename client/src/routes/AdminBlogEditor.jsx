import React, {useEffect, useContext} from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import AdminBlogPeek from "../components/AdminBlogPeek"
import BlogAPI from "../apis/BlogAPI"
import { BlogContext } from '../context/BlogContext';

const AdminBlogEditor = (props) => {
    
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

            <a className="btn btn-primary mt-2" href="/admin/blog/new">NEW POST</a>
            
            {blogPosts.map(post => {
                return (
                    <AdminBlogPeek post={post} key={post.id}/> 
                )
            })}

            <Footer />
        </div>
    )
}

export default AdminBlogEditor
