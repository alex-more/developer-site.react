import React, { useEffect, useState } from 'react'
import '../styles.css';
import ReadmeAPI from '../apis/ReadmeAPI'

const config = require('../config.json');

const ProjectPeek = (props) => {

    let keygen = 0; // This is just to avoid a warning message

    const [readme, setReadme] = useState();

    useEffect(() => {
        // Gives me list of all repos
        const fetchData = async () => {
            try {
                const response = await ReadmeAPI.get(props.repo)

                if(response) {
                    setReadme(shorten(response.data.data))
                } else {
                    setReadme("Project does not have a README file.")
                }
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [props.repo])

    // If the first line of the README contains the title of the repo (like #my-website),
    // then the first 2 lines will be skipped to save space.
    function shorten(text) {
        
        let shortText = text.split("\n");

        if (shortText[0].includes(props.repo)) {
            shortText = shortText.slice(2,10)
        } else {
            shortText = shortText.slice(0,8)
        }

        return shortText;
    }

    return (
        <div>
            <div className="card cardHeader">
                <div className="card-block">
                    <div className="card-header">
                        <h5 className="card-title">{props.repo}</h5>
                    </div>
                </div>
            </div>

            <div className="card mb-4 hover-brighten" style={{backgroundImage: `url("https://raw.githubusercontent.com/${config.github_username}/${props.repo}/main/preview.jpg")`, backgroundSize: "cover", zIndex: 0 }}>
                <a className="card-block stretched-link text-decoration-none link-dark" href={props.url}>

                    <div className="p-3 cardContent">
                        {readme && readme.map(function(item) {
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
        </div>
    )
}

export default ProjectPeek