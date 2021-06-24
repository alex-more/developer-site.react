import React from 'react'
import '../styles.css';

const BlogPeek = (props) => {

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

    return (
        <div className="card hover-darken my-3">
            <div className="card-header text-end">
                {props.post.category}
            </div>
            <a className="card-block stretched-link text-decoration-none link-dark p-3" href={postUrl}>
                <h5 className="card-title">{props.post.title}</h5>
                <p className="card-text">{shortened}</p>
            </a>
        </div>
    )
}

export default BlogPeek
