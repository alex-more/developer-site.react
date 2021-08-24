import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button, Box } from '@material-ui/core'

const Navbar = (props) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        activeMenuButton: {
            marginRight: theme.spacing(2),
            color: "#b39ddb"
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

            <Button className={ props.highlight === "home"? classes.activeMenuButton : classes.menuButton } href="/">
                Home
            </Button>
            
            <Button className={ props.highlight === "about"? classes.activeMenuButton : classes.menuButton } href="/about">
                About
            </Button>

            <Button className={ props.highlight === "projects"? classes.activeMenuButton : classes.menuButton } href="/projects">
                Projects
            </Button>
        </Box>
    )
}

export default Navbar
