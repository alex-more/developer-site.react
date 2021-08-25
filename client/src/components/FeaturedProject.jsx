import React from 'react'
import '../styles.css';
import { Grid, Card, Button, ButtonGroup } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const config = require('../config.json');

const useStyles = makeStyles({
    root: {
        width: 645,
    },
    red: {
        backgroundColor: 'red'
    },
    gutterBottom: {
        marginBottom: "6px"
    }
});

const FeaturedProject = (props) => {

    const classes = useStyles();

    return (
        <Card variant="outlined" className={classes.root}>

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
                    {props.desc}
                </Typography>
            </CardContent>

            <Grid className={classes.gutterBottom} container justifyContent="center">
                <ButtonGroup variant="contained">
                    <Button target="_blank" startIcon={<PlayCircleFilledIcon />} href={props.url} color="primary">
                        Live Version
                    </Button>

                    <Button target="_blank" startIcon={<GitHubIcon />} href={`https://github.com/${config.github_username}/${props.repo}`} color="secondary">
                        Github Link
                    </Button>
                </ButtonGroup>
            </Grid>
        </Card>
    )
}

export default FeaturedProject