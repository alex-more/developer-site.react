import React, { useEffect, useContext, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import FeaturedProject from "../components/FeaturedProject"
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core'

const Home = () => {

    const desc_project1 = "Portfolio website built with React and NodeJS, used to link to various projects."
    const desc_project2 = "Blog managing app that connects to a MongoDB database remotely."

    const useStyles = makeStyles((theme) => ({
        heading: {
            textAlign: "center",
            color: "#fefefe"
        }
    }));

    const classes = useStyles();

    return (
        <Container maxWidth="xl">
            <Navbar />

            <Grid>
                <Typography variant="h3" className={classes.heading} gutterBottom>Featured Projects</Typography>
            </Grid>

            <Grid container spacing={4} justifyContent="center">
                <Grid item>
                    <FeaturedProject repo="developer-site.react" url="https://alex-more.com" desc={desc_project1} />
                </Grid>

                <Grid item>
                    <FeaturedProject repo="blog-manager" url="#" desc={desc_project2} />
                </Grid>
            </Grid>

            <Footer />
        </Container>
    )
}

export default Home
