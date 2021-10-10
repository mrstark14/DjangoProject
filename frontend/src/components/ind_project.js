import React, {useState, useEffect} from "react";
import axios from 'axios'
import Cookies from 'js-cookie'
import {Button, Typography, Chip, Grid, Paper} from "@material-ui/core";
import Userchip from "./userchip";
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Checklogin from "./checklogin";

function ProjectDetail( match ) {
    const [projects, setProject] = useState([]);
    const [project__members, setProjectMembers] = useState([]);
    const [project_leader, SetProjectleader] = useState('')
    const [user, SetUser] = useState([]);
    const [lists, SetLists] = useState([]);


    useEffect(() => {
        fetchProject();
    },[]);

    const fetchProject = () => {
        axios.get(`http://127.0.0.1:8000/api/project/${match.match.params.id}`, {
            headers : {
                "Authorization": `Token ${Cookies.get("token")}`,
            }
        }).then(
            (res) => {
                setProject(res.data)
                setProjectMembers(res.data.project_members)
                SetProjectleader(res.data.project_leader)
            }
        ).catch(err => {
            console.log("Error")
        })
    };
    //console.log(JSON.stringify(projects.project_members))

    const deleteProduct = async () => {
        await axios.delete(`http://127.0.0.1:8000/api/project/${match.match.params.id}`, {
            headers : {
                "Authorization": `Token ${Cookies.get("token")}`,
            }
        })
        window.location.href = "http://127.0.0.1:3000/dashboard"
    };

    // useEffect(() => {
    //     fetchUser();
    // }, []);

    // const fetchUser = async () => {
    //     await axios.get(`http://127.0.0.1:8000/api/user/${project_leader}/`, {
    //         headers : {
    //             "Authorization": `Token ${Cookies.get("token")}` 
    //         }
    //     }).then(
    //         (res) => {
    //             SetUser(res.data)
    //         }
    //     ).catch( err => {
    //         alert(err)
    //     })
    // };

    console.log(projects.project_leader)

    const addlist = () => {
        window.location.href = `http://127.0.0.1:3000/project/${projects.id}/createlist/`
    }

    useEffect(() => {
        fetchLists();
    }, []);

    const fetchLists = async () => {
        await axios.get(`http://127.0.0.1:8000/api/projectlists/?projectid=${match.match.params.id}`, {
            headers : {
                "Authorization": `Token ${Cookies.get("token")}` 
            }
        }).then(
            (res) => {
                SetLists(res.data)
            }
        ).catch( err => {
            alert(err)
        })
    };

    console.log(lists)

    const updateProduct = () => {
        window.location.href = `http://127.0.0.1:3000/project/${projects.id}/update/`
    }


    return (
        <div style = {{ marginTop: 20, padding: 30 }}>
            <Checklogin />
            <div>
                <Typography variant='h4' style={{ marginLeft: '3%'}}>
                    Project: {projects.project_name}
                </Typography><br/>
                <Typography variant='subtitle' component="p" dangerouslySetInnerHTML={{__html: projects.description}} style={{ marginLeft: '3%'}}></Typography>
                <br />
                <Typography variant='subtitle' style={{ marginLeft: '3%' }}>
                    Due by: {projects.due_date}
                </Typography><br/><br />
                <Typography variant='title' style={{ marginLeft: '3%' }}>
                    Members:  
                    {project__members.map(member => {
                        return (
                            <Userchip userid={member} />
                        )
                    })}
                </Typography><br/><br />
                <Typography variant='title' style={{ marginLeft:'3%' }}>
                    Project Leader: <Userchip userid='20112099' />
                </Typography><br /><br />
                <Button variant="contained" color="primary" margin="normal" style={{ marginLeft: '3%' }} startIcon={<AddBoxIcon />} disableElevation onClick={addlist}>
                    Add List
                </Button>
                <Button variant="contained" margin="normal" style={{ marginLeft: 10 }} startIcon={<DeleteIcon />} disableElevation onClick={deleteProduct}>
                    Delete
                </Button>
                <Button variant="contained" margin="normal" style={{ marginLeft: 10 }} startIcon={<UpdateIcon />} disableElevation onClick={updateProduct}>
                    Update
                </Button>
            </div>
            <Grid container spacing={40} justify="flex-start">
                {lists.map(list => (
                    <Grid item key={list.id} style={{ margin: '3%', width: 400, marginTop: 20}} minWidth={70}>
                        <Card style={{marginLeft: '1%'}}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {list.list_name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => {
                                    window.location.href=`http://127.0.0.1:3000/${match.match.params.id}/list/${list.id}/`
                                }}>
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </div>
    );
}

export default ProjectDetail;