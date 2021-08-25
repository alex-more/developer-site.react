import React from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Container, Grid, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles((theme) => ({
    heading: {
        textAlign: "start",
        color: "#fefefe"
    },
    text: {
        textAlign: "start",
        color: "#fefefe"
    },
    link: {
        color: "inherit"
    },
    body: {
        minHeight: "calc(91vh - 4rem)"
    }
}));

const AboutMe = () => {

    const classes = useStyles();

    return (
        <Container maxWidth={false}>
            <div className={classes.body}>
                <Navbar highlight="about" />

                <Grid container spacing={4} justifyContent="center">
                    <Grid item>
                        <Container maxWidth="sm">
                            <Typography variant="h3" className={classes.heading} gutterBottom>
                                Alex Moreno
                            </Typography>

                            <Typography variant="body1" className={classes.text} gutterBottom>
                                I'm a programmer currently studying Computer Science at UQAM.
                                My main interest is web development, with a preference for the backend.
                                These days I am working on improving my portfolio, and learning more about working with cloud technologies.
                                <br /><br />
                                If you have something in mind, you can always message me at <a className={classes.link} href="mailto:alexmore.tech@gmail.com">alexmore.tech@gmail.com</a>
                            </Typography>
                        </Container>

                        <br />

                    </Grid>

                    <Grid item>
                        <Container maxWidth="sm">

                            <Typography variant="h3" className={classes.heading} gutterBottom>
                                Skills
                            </Typography>

                            <div>
                                <Typography variant="h6" className={classes.text}>BACKEND</Typography>
                                <Typography variant="body1" className={classes.text} gutterBottom>
                                    NodeJS, Express, C++, SQL, REST, NGINX, Jest, Python
                                </Typography>
                            </div>
                            <br />
                            <div>
                                <Typography variant="h6" className={classes.text}>FRONTEND</Typography>
                                <Typography variant="body1" className={classes.text} gutterBottom>
                                    React, HTML5, CSS3, JavaScript ES6, JSON
                                </Typography>
                            </div>
                            <br />
                            <div>
                                <Typography variant="h6" className={classes.text}>OTHER</Typography>
                                <Typography variant="body1" className={classes.text} gutterBottom>
                                    Git, Linux
                                </Typography>
                            </div>

                        </Container>
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </Container>

        /*
        <div className="d-flex flex-column pageContainer">
            <Navbar highlight="about" />
            <div className="container-fluid">
                <br /><br /><br />
                <div className="aboutme">
                    <h1 className="text-center">
                        Hi, I'm Alex.
                    </h1>
                    <br />
                    <h5 className="text-start">
                        I'm a programmer currently studying Computer Science at UQAM.
                        My main interest is web development, with a preference for the back end.
                        
                        These days I am working on improving my portfolio, and learning more about working with cloud technologies.
                        <br /><br />
                        If you have something in mind, you can always message me at alexmore.tech@gmail.com
                    </h5>
                </div>
            </div>
            <Footer />
        </div>
        */
    )
}

export default AboutMe
