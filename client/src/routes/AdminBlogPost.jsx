import React, {useEffect, useContext, useState} from 'react'
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useParams, Link , useHistory} from 'react-router-dom'
import BlogAPI from "../apis/BlogAPI"
import { BlogContext } from '../context/BlogContext';

const AdminBlogPost = (props) => {

    const {id} = useParams()
    const history = useHistory();

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [content, setContent] = useState("")

    useEffect(() => {

        const checkLogin = async () => {
            try {
                await BlogAPI.get("/admin/authenticate", 
                { headers: {'Authorization': "Bearer " + window.localStorage.getItem('token')} })
            } catch (err) {
                history.push('/')
            }
        }
        
        // FIXME: Program crashes when going to localhost:3000/admin/blog/:ANYTHING
        const fetchData = async () => {
            const response = await BlogAPI.get(`/${id}`)

            setTitle(response.data.data.blogPost.title)
            setCategory(response.data.data.blogPost.category)
            setContent(response.data.data.blogPost.content)
        }

        checkLogin().then(fetchData());
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await BlogAPI.put(`/${id}`, {
            title,
            category,
            content
        });
        
        console.log(response)
        history.push("/admin/blog");
    };

    return (
        <div className="d-flex flex-column pageContainer">
            <Navbar />
            <div className="container-fluid">
                <h2 className="text-center my-4">Edit Post</h2>
                <div className="card-block">
                    <form action="">
                        <div className="form-group my-2">
                            <label htmlFor="title">Title</label>
                            <input
                                value={title}
                                id="title"
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group my-2">
                        <label htmlFor="category">Category</label>
                            <input
                                value={category}
                                id="category"
                                onChange={(e) => setCategory(e.target.value)}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group my-2">
                        <label htmlFor="content">Content</label>
                            <textarea
                                value={content}
                                id="content"
                                onChange={(e) => setContent(e.target.value)}
                                type="text"
                                className="form-control mb-4"
                                rows="19"
                            />
                        </div>
                        
                        <button onClick={handleSubmit} type="submit" className="btn btn-primary">
                            APPLY
                        </button>
                        
                        <Link to="/admin/blog">
                            <button className="btn btn-secondary mx-2">
                                CANCEL
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
            
            <Footer />
        </div>
    )
}

export default AdminBlogPost