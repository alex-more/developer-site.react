import React from 'react'
import { useParams } from 'react-router-dom'
import BlogAPI from "../apis/BlogAPI"
import '../styles.css';

const AdminBlogPeek = (props) => {

    let shortened = "";
    if(props.post.content) {
        shortened = props.post.content.substring(0, 120);
    }

    let postId = ""
    let postUrl = ""
    if(props.post.id) {
        postId = props.post.id;
        postUrl = "/blog/" + postId;
    }

    const {id} = useParams()

    const handleDelete = async () => {
        
        if(window.confirm("Are you sure you want to delete this blog post?")) {
            try {
                await BlogAPI.delete("/" + id)
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div className="card my-3">
            <div className="card-header text-end">
                {props.post.category}
            </div>
            <div className="card-block p-3">
                <h5 className="card-title">{props.post.title}</h5>
                <p className="card-text">{shortened}</p>
                <a href={"/admin/blog/" + postId} className="btn btn-warning">EDIT</a>
                <button className="btn btn-danger mx-2" onClick={handleDelete}>DELETE</button>
            </div>
        </div>
    )
}

export default AdminBlogPeek