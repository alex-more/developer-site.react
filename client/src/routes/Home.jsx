import React, { useEffect, useContext, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import FeaturedProject from "../components/FeaturedProject"
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Grid, Typography } from '@material-ui/core'

const Home = () => {

    const desc_project1 = "Portfolio website built with React and NodeJS, used to link to various projects."
    const desc_project2 = "Blog managing app that connects to a MongoDB database remotely."

    const useStyles = makeStyles((theme) => ({
        heading: {
            textAlign: "center",
            color: "#fefefe"
        },
        body: {
            minHeight: "calc(91vh - 4rem)"
        },
        textblock: {
            width: 300,
            color: "#fefefe"
        }
    }));

    const classes = useStyles();

    return (
        <Container maxWidth={false}>
            <div className={classes.body}>

                <Navbar highlight="home" />

                <Grid container justifyContent="center" alignItems="flex-start">
                    <Grid item>
                        <Typography className={classes.textblock} variant="h3" gutterBottom>
                            Hi, I'm Alex.
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography className={classes.textblock} variant="body1" gutterBottom>
                            I'm a programmer currently studying Computer Science at UQAM.
                            <br /><br />
                            I develop web applications, mainly using NodeJS and React.
                        </Typography>
                    </Grid>

                </Grid>
                <br /><br />
                <br /><hr /><br />
                <br /><br />
                <Grid>
                    <Typography variant="h3" className={classes.heading} gutterBottom>Featured Projects</Typography>
                </Grid>
                <br />
                <Grid container spacing={4} justifyContent="center">
                    <Grid item>
                        <FeaturedProject repo="developer-site.react" url="https://alex-more.com" desc={desc_project1} />
                    </Grid>

                    <Grid item>
                        <FeaturedProject repo="blog-manager" url="#" desc={desc_project2} />
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </Container>
    )
}

export default Home
