import React, { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProjectPeek from "../components/ProjectPeek"
import GithubAPI from "../apis/GithubAPI"
import { Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const Projects = () => {

    const [projects, setProjects] = useState([]);

    const useStyles = makeStyles((theme) => ({
        heading: {
            textAlign: "center",
            color: "#fefefe"
        }
    }));

    const classes = useStyles();

    useEffect(() => {
        // Gives me list of all repos
        const fetchData = async () => {
            try {
                const response = await GithubAPI.get()

                response.data.sort(compareDates)
                setProjects(response.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [])

    function compareDates(a, b) {
        if (a.updated_at < b.updated_at) {
            return 1;
        }
        if (a.updated_at > b.updated_at) {
            return -1;
        }

        return 0;
    }
    return (
        <Container maxWidth="xl">
            <Navbar />

            <Grid>
                <Typography variant="h3" className={classes.heading} gutterBottom>Projects</Typography>
                <Typography variant="subtitle1" className={classes.heading} gutterBottom>This is an auto generated list of all my projects on Github.</Typography>
            </Grid>

            <br />
            
            <Grid container spacing={4} justifyContent="center">
                {projects && projects.map(project => {
                    return (
                        <Grid item>
                            <ProjectPeek repo={project.name} url={project.html_url} key={project.name} />
                        </Grid>
                    )
                })}
            </Grid>

            <Footer />
        </Container>
        /*
        <div className="d-flex flex-column pageContainer">
            <Navbar />

            <div className="container-fluid">
                <div className="project-preview mb-5">
                    <h2 className="text-center m-5">Github Projects</h2>
                    <p className="text-center">This is an auto generated list of all my projects on Github.</p>
                    {projects && projects.map(project => {
                        return (
                            <ProjectPeek repo={project.name} url={project.html_url} key={project.name} />
                        )
                    })}
                </div>
            </div>

            <Footer />
        </div>*/
    )
}

export default Projects
