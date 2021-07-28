import React, {useEffect, useState, useContext} from 'react'
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useParams } from 'react-router-dom'
import BlogAPI from "../apis/BlogAPI"
import { BlogContext } from '../context/BlogContext';

const BlogPost = (props) => {

    const {id} = useParams()

    const [blogPost, setBlogPost] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await BlogAPI.get("/" + id)
                console.log(response)
                console.log(response.data.data.blogPost)
                setBlogPost(response.data.data.blogPost)
            } catch (err) {
    
            }
        }

        fetchData();
    }, [])

    return (
        <div className="container-fluid">
            <Navbar />

                <div className="card-block">
                    <h2 className="text-center m-4">{blogPost && blogPost.title}</h2>
                    <h5 className="text-center m-4">Category : {blogPost && blogPost.category}</h5>
                    <p className="card-content text-center">{blogPost && blogPost.content}</p>
                </div>

            <Footer />
        </div>
    )
}

export default BlogPost