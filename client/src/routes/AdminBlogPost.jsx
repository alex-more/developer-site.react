import React, {useContext, useState} from 'react'
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useParams, Link , useHistory} from 'react-router-dom'
import BlogAPI from "../apis/BlogAPI"
import { BlogContext } from '../context/BlogContext';

const AdminBlogPost = (props) => {

    const { addBlogPosts } = useContext(BlogContext);

    const {id} = useParams() // FIXME: Use this for update, not new
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [content, setContent] = useState("")
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await BlogAPI.post("/", {
                title,
                category,
                content
            });

            addBlogPosts(response.data.data.blogPost)
            history.push("/admin/blog");
        } catch (err) {
            console.log(err)
        }
    };

    // TODO: Edit this return
    return (
        <div className="container-fluid">
            <Navbar />
            <h2 className="my-4">New Post</h2>
            <div className="card-block">
                        <form action="">
                            <div className="form-row my-2">
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="title"
                            />
                            </div>
                            <div className="form-row my-2">
                            <input
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="category"
                            />
                            </div>
                            <div className="form-row my-2">
                            <input
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="enter blog content here..."
                            />
                            </div>
                            <Link to="/admin/blog">
                                <button onClick={handleSubmit} type="submit" className="btn btn-primary">
                                    Add
                                </button>
                            </Link>
                        </form>
                    </div>
            <Footer />
        </div>
    )
}

export default AdminBlogPost