import React, {useState, useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';
import Userchip from "./userchip";
import DeleteIcon from '@material-ui/icons/Delete';
import Checklogin from "./checklogin";

export default function Listdetail( match ){
    const [list, SetList] = useState([]);
    const [cards, SetCards] = useState([]);

    useEffect(() => {
        fetchList();
    }, []);

    const fetchList = async () => {
        await axios.get(`http://127.0.0.1:8000/api/projectlist/${match.match.params.id}`, {
            headers : {
                "Authorization": `Token ${Cookies.get("token")}` 
            }
        }).then(
            (res) => {
                SetList(res.data)
            }
        ).catch( err => {
            alert(err)
        })
    };

    useEffect(() => {
        fetchCards();
    },[]);

    const fetchCards = async () => {
        await axios.get(`http://127.0.0.1:8000/api/card/?list=${match.match.params.id}`, {
            headers : {
                "Authorization": `Token ${Cookies.get("token")}`
            }
        }).then(
            (res) => {
                SetCards(res.data)
            }
        ).catch(err => {
            alert(err)
        })
    };

    const addcard = () => {
        window.location.href = `http://127.0.0.1:3000/${match.match.params.projectid}/${match.match.params.id}/createcard`
    }

    const deletelist = () => {
        axios.delete(`http://127.0.0.1:8000/api/projectlist/${match.match.params.id}`, {
            headers : {
                "Authorization": `Token ${Cookies.get("token")}`
            }
        }).then(
            (res) => {
                window.location.href = `http://127.0.0.1:3000/project/${match.match.params.projectid}`
            }
        ).catch(err => {
            alert(err)
        })
    }

    // const deleteCard = (id) => {
    //     axios.delete(`http://127.0.0.1:8000/api/projectcard/${id}`, {
    //         headers : {
    //             "Authorization" : `Token ${Cookies.get("token")}`
    //         }
    //     })
    // }

    return (
        <div style = {{ marginTop: 20, padding: 30 }}>
            <Checklogin />
            <div>
                <Typography variant='h3' style={{ marginLeft: '3.2%' }}>
                    List: {list.list_name}
                </Typography>
            </div><br />
            <Button variant="contained" color="primary" margin="normal" style={{ marginLeft: '3.2%' }} startIcon={<AddBoxIcon />} disableElevation onClick={addcard}>
                Add Card
            </Button>
            <Button variant="contained" color="primary" margin="normal" style={{ marginLeft: 10 }} startIcon={<DeleteIcon />} disableElevation onClick={deletelist}>
                Delete 
            </Button>
            <div style={{float:'center'}}>
                <Grid container spacing={40} justify="center">
                    {cards.map(card => (
                        <Grid item key={card.id} style={{ margin: '3%', width: 400, marginTop: 20}} minWidth={70}>
                            <Card style={{marginLeft: '1%'}}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {card.card_name}
                                    </Typography>
                                    <Typography component="p" dangerouslySetInnerHTML={{__html: card.description}}></Typography>
                                    <Typography component="p">Card Members: 
                                        {card.card_members.map(member => (
                                            <Userchip userid={member} />
                                        ))}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={() => {
                                        window.location.href=`http://127.0.0.1:3000/${match.match.params.projectid}/list/${match.match.params.id}/updatecard/${card.id}`
                                    }}>
                                        Update
                                    </Button>
                                    <Button size="small" color="primary" onClick = {() => {
                                        window.location.href=`http://127.0.0.1:3000/${match.match.params.projectid}/${match.match.params.id}/deletecard/${card.id}`
                                    }}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    )

}