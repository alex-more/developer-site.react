import React, { useEffect, useState } from 'react'
import '../styles.css';
import ReadmeAPI from '../apis/ReadmeAPI'

const ProjectPeek = (props) => {

    // IF there is a README, then make a shorter version of it, otherwise
    // display default message "No README available at this time."

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
                const response = await ReadmeAPI.get(repoName)
                setReadme(shorten(response.data.data))
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [repoName])

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
        <div className="card hover-darken my-4">
            <a className="card-block stretched-link text-decoration-none link-dark" href={repoUrl}>
                <div className="card-header">
                    <h5 className="card-title project-title">{props.repo}</h5>
                </div>

                <div className="p-3">
                    {readme && readme.split("\n").map(function(item) {
                        return (
                            <span key={++keygen}>
                                {item}
                                <br />
                            </span>
                        )
                    })}
                </div>
                
            </a>
        </div>
    )
}

export default ProjectPeek