import React, {useEffect, useContext} from 'react'
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useParams } from 'react-router-dom'
import BlogAPI from "../apis/BlogAPI"
import { BlogContext } from '../context/BlogContext';

const BlogPost = (props) => {

    const {id} = useParams()
    
    const {blogPosts, setBlogPosts} = useContext(BlogContext)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await BlogAPI.get("/" + id)
                setBlogPosts(response.data.data.blog)
            } catch (err) {
    
            }
        }

        fetchData();
    }, [])

    return (
        <div className="container-fluid">
            <Navbar />
            {blogPosts.map(post => {
                return (
                    <div className="card-block">
                        <h2 className="text-center m-4">{post.title}</h2>
                        <h5 className="text-center m-4">Category : {post.category}</h5>
                        <p className="card-content text-center">{post.content}</p>
                    </div>
                )
            })}

            <Footer />
        </div>
    )
}

export default BlogPost