import React, { useEffect, useState } from 'react'
import '../styles.css';
import ReadmeAPI from '../apis/ReadmeAPI'
import { Grid, Card, Button, CardActionArea } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';

const config = require('../config.json');

const ProjectPeek = (props) => {

    let keygen = 0; // This is just to avoid a warning message

    const [readme, setReadme] = useState();

    const useStyles = makeStyles({
        root: {
            width: 645,
        },
        link: {
            textDecoration: "none",
            color: "inherit"
        }
    });

    const classes = useStyles();

    useEffect(() => {
        // Gives me list of all repos
        const fetchData = async () => {
            try {
                const response = await ReadmeAPI.get(props.repo)

                if (response) {
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
            shortText = shortText.slice(2, 4)
        } else {
            shortText = shortText.slice(0, 3)
        }

        shortText.push("(. . .) click for more details");

        return shortText;
    }

    return (
        <Card variant="outlined" className={classes.root}>

            <CardActionArea>
                <a rel='noreferrer' target="_blank" className={classes.link} href={`https://github.com/${config.github_username}/${props.repo}`}>
                    <CardMedia
                        component="img"
                        alt="Project Preview"
                        height="240"
                        image={`https://raw.githubusercontent.com/${config.github_username}/${props.repo}/main/preview.jpg`}
                        title={props.repo}
                    />

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.repo}
                        </Typography>

                        <Typography variant="body2" color="textSecondary" component="p">
                            {readme && readme.map(function (item) {
                                return (
                                    <span key={++keygen}>
                                        {item}
                                        <br />
                                    </span>
                                )
                            })}
                        </Typography>
                    </CardContent>
                </a>
            </CardActionArea>
        </Card>
    )
}

export default ProjectPeek