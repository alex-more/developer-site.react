import React from 'react'

import { Box, BottomNavigation, Container, Grid, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles((theme) => ({
    footer: {
        height: "4rem",
        marginTop: "4rem",
    },
    footerButton: {
        color: "#9575cd"
    }
}));

const Footer = () => {

    const classes = useStyles();

    return (
        <Box display="flex" justifyContent="center" className={classes.footer}>
            <Grid item>
                <IconButton target="_blank" href="https://github.com/alex-more" className={classes.footerButton} aria-label="link to github">
                    <GitHubIcon fontSize="large" />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton target="_blank" href="https://linkedin.com/in/i-am-alex/" className={classes.footerButton} aria-label="send email to alex">
                    <LinkedInIcon fontSize="large" />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton href="mailto:alexmore.tech@gmail.com" className={classes.footerButton} aria-label="send email to alex">
                    <MailIcon fontSize="large" />
                </IconButton>
            </Grid>
        </Box>

        /*
        <footer className="footer mt-auto py-3">
            <h5 className="font-weight-light mx-3">&copy; Alex Moreno</h5>
            <a href={"/login"} className="font-weight-light mx-3 subtle-link">Admin Panel</a>
        </footer>*/
    )
}

export default Footer
