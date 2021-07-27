import React, { useEffect, useState } from 'react'
import '../styles.css';
import ReadmeAPI from '../apis/ReadmeAPI'

const ProjectPeek = (props) => {

    // IF there is a README, then make a shorter version of it, otherwise
    // display default message "No README available at this time."

    // TODO: Add link to the repo

    let keygen = 0; // This is just to avoid a warning message

    let repoName = ""
    let repoUrl = ""
    if(props.repo) {
        repoName = props.repo;
        repoUrl = props.url;
    }

    const [readme, setReadme] = useState();

    useEffect(() => {
        // Gives me list of all repos
        const fetchData = async () => {
            try {
                console.log("Loading projects page...")
                const response = await ReadmeAPI.get(repoName)
                setReadme(shorten(response.data.data))
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [])

    function shorten(text) {
        let shortened = "";
        if(text) {
            shortened = text.substring(0, 360);
            if(text.length !== shortened.length) {
                shortened = shortened + " ...\n(Click for more details)"
            }
        }
        return shortened;
    }

    return (
        <div className="card hover-darken my-3">
            <a className="card-block stretched-link text-decoration-none link-dark p-3" href={repoUrl}>
                <h5 className="card-title">{props.repo}</h5>
                {readme && readme.split("\n").map(function(item) {
                    return (
                        <span key={++keygen}>
                            {item}
                            <br />
                        </span>
                    )
                })}
            </a>
        </div>
    )
}

export default ProjectPeek