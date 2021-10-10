import React, {useState, useEffect} from "react";
import '../App.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Card, CardActions, CardContent, Grid, Typography, Button } from "@material-ui/core";
import Userupdate from "./updaterole";

function User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    },[]);

    const fetchUsers = async () => {
        await axios.get('http://127.0.0.1:8000/api/user/', {
            headers : {
                "Authorization": `Token ${Cookies.get("token")}`,
            }
        }).then(
            (res) => {
                setUsers(res.data)
            }
        ).catch(err => {
            console.log("Error")
        })
    };

    console.log(users)

    return (
        <div style={{ marginTop: 20, padding: 30 }}>
            <div>
                <Typography variant='h4' style={{ marginLeft: '3%'}}>
                    Users: 
                </Typography>
            </div>
            <Grid container spacing={40} justify="center">
                {users.map(user => (
                    <Grid item key={user.username} style={{ margin: '3%', width: 400, marginTop: 20}} minWidth={70}>
                        <Card style={{marginLeft: '1%'}}>
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='h2'>
                                    {user.name}
                                </Typography>
                                <Typography  component='p'>
                                    username: {user.username}
                                </Typography>
                                <Typography  component='p'>
                                    Role: {user.role}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Userupdate userid={user.id} />
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default User;