import React, { useEffect, useState } from 'react'
import '../styles.css';
import ReadmeAPI from '../apis/ReadmeAPI'
import { Button, ButtonGroup } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import '@fontsource/roboto';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const config = require('../config.json');

const useStyles = makeStyles({
  root: {
    width: 645,
  },
});

const FeaturedProject = (props) => {

    const classes = useStyles();

    return (

        <Card className={classes.root}>
            <CardActionArea>
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
      </CardActionArea>
      <CardActions>
      <ButtonGroup target="_blank" variant="contained">
                            <Button startIcon={<PlayCircleFilledIcon/>} href={props.url} color="secondary">
                                Live Version
                            </Button>

                            <Button endIcon={<GitHubIcon/>} href={`https://github.com/${config.github_username}/${props.repo}`} color="primary">
                                Github Link
                            </Button>  
                        </ButtonGroup>
      </CardActions>
    </Card>

        /*<div className="card d-flex flex-row featuredProject mb-5">
            <div className="card-block d-flex flex-column justify-content-end halfCard" style={{backgroundImage: `url("https://raw.githubusercontent.com/${config.github_username}/${props.repo}/main/preview.jpg")`}}>
                
                
            </div>

            <div className="card-block position-relative d-flex flex-column justify-content-between halfCard">
                    
                    <div className="p-3">
                        <h5 className="card-title" style={{color: "var(--accent)", fontWeight: "bold"}}>{props.repo}</h5>

                        <div className="projectDescription">
                            {props.desc}
                        </div>
                    </div>

                    <div className="d-flex flex-row justify-content-center"
                    style={{bottom: 0}}>
                        <ButtonGroup target="_blank" variant="contained">
                            <Button startIcon={<PlayCircleFilledIcon/>} href={props.url} color="secondary">
                                Live Version
                            </Button>

                            <Button endIcon={<GitHubIcon/>} href={`https://github.com/${config.github_username}/${props.repo}`} color="primary">
                                Github Link
                            </Button>  
                        </ButtonGroup>
                    </div>
            </div>
        </div>*/
    )
}

export default FeaturedProject