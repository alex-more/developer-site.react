import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button, Box } from '@material-ui/core'

const Navbar = () => {

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            color: "#fefefe"
        },
        bar: {
            marginBottom: "6vh"
        }
    }));

    const classes = useStyles();

    return (
        <Box className={classes.bar} display="flex">
                <Typography className={classes.title} variant="h4">
                    Alex Moreno
                </Typography>

                <Button className={classes.menuButton} href="/">
                    Home
                </Button>
                <Button className={classes.menuButton} href="/projects">
                    Projects
                </Button>
                <Button className={classes.menuButton} href="/about">
                    About
                </Button>
        </Box>
        /*
        <nav className="navbar navbar-dark text-light mb-4">
            <h2 className="mx-4">Alex Moreno</h2>
            <div className="text-end mx-4">
                <a href="/" className="link-info text-decoration-none m-2">Home</a>
                <a href="/projects" className="link-info text-decoration-none m-2">Projects</a>
                <a href="/about" className="link-info text-decoration-none m-2">About</a>
                <a href="/blog" className="link-info text-decoration-none m-2">Blog</a>
            </div>
        </nav>
        */
    )
}

export default Navbar
