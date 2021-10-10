import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import ProjectList from "./Projectlist";
import CancelIcon from '@material-ui/icons/Cancel';
// import { differenceInCalendarMonths } from "date-fns/esm";

function Dashboard( props ) {
    const [user, setUser] = useState([]);
    const [projects, setProjects] = useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
      
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchUser();
    }, [])

    const fetchUser = async () => {
        await axios.get(`http://127.0.0.1:8000/api/user/${Cookies.get("username")}`,{
            headers : {
                "Authorization": `Token ${Cookies.get('token')}`,
            }
        }).then(
            (res) => {
                setUser(res.data)
            }
        ).catch(err => {
            console.log("Error")
        })
    };

    useEffect(() => {
        fetchProjects();
    }, [])

    const fetchProjects = async () => {
        await axios.get('http://127.0.0.1:8000/api/userproject/', {
            headers : {
                "Authorization": `Token ${Cookies.get('token')}`,
            }
        }).then(
            (res) => {
                setProjects(res.data)
                // console.log(res)
                // const PROJECTS = res.data
            }
        ).catch(err => {
            console.log("Error")
        })
    };
    // const projectMembers = project.project_members
    console.log(projects)

    function Navigate(id) {
        window.location.href = `http://127.0.0.1:3000/project/${id}`
    }

    return (
        <div style={{ marginTop: 20, padding: 30 }}>
            <div>
                <Typography variant='h4' style={{ marginLeft: '3%'}}>
                    Hello {user.name}! 
                </Typography>
            </div>
            <Grid container spacing={40} justify="center">
                {projects.map(project => (
                    <Grid item key={project.id} style={{ margin: '3%', width: 350 }} minWidth={70}>
                        <Card>
                            <CardActionArea onClick={handleClickOpen}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {project.project_name}
                                    </Typography>
                                    <Typography component="p" dangerouslySetInnerHTML={{__html: project.description}}></Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" onClick={()=>{
                                    window.location.href = `http://127.0.0.1:3000/project/${project.id}`
                                }}>
                                    Learn More
                                </Button>
                            </CardActions>
                            <Dialog item key={project.id} open={open} onClose={handleClose} style={{ width: 400 }}>
                                <DialogTitle>
                                    {project.project_name}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Due Date: {project.due_date}
                                        <br />
                                        <Typography component="p" dangerouslySetInnerHTML={{__html: project.description}}></Typography>
                                        Lists : <ProjectList projectid={project.id} />
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <div style={{float:'right'}}>
                                        <Button variant="contained" onClick={handleClose} margin="normal" startIcon={<CancelIcon />} disableElevation>
                                            Close
                                        </Button>
                                    </div>
                                </DialogActions>
                            </Dialog>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Dashboard;