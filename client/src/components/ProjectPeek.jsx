import React, { useEffect, useState } from 'react'
import '../styles.css';
import ReadmeAPI from '../apis/ReadmeAPI'

const ProjectPeek = (props) => {

    // IF there is a README, then make a shorter version of it, otherwise
    // display default message "No README available at this time."
    let shortened = "";
    if(props.repo) {
        shortened = props.repo.substring(0, 120); // FIXME: Use this for the README
    }

    // TODO: Fetch the READMEs

    let repoName = ""
    let repoUrl = ""
    if(props.repo) {
        repoName = props.repo;
        repoUrl = "/repo/" + repoName;
    }

    const [readme, setReadme] = useState();

    useEffect(() => {
        // Gives me list of all repos
        const fetchData = async () => {
            try {
                console.log("Loading projects page...")
                const response = await ReadmeAPI.get(repoName)
                //const response = await ReadmeAPI.get("blog-manager/master/README.md")
                //const response = await axios.get("https://api.github.com/users/alex-more")
                //setBlogPosts(response.data.data.blog) Extract projects from response
                setReadme(response.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="card hover-darken my-3">
            <a className="card-block stretched-link text-decoration-none link-dark p-3" href={repoUrl}>
                <h5 className="card-title">{props.repo}</h5>
                <p className="card-text">{shortened}</p>
            </a>
        </div>
    )
}

export default ProjectPeek