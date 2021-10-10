import React, {useState, useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "@material-ui/core";

export default function Userupdate( props ){
    const [user, setuser] = useState([])

    useEffect(()=>{
        fetchUser();
    }, [])

    const fetchUser = async () => {
        await axios.get(`http://127.0.0.1:8000/api/user/${props.userid}/`, {
            headers : {
                "Authorization": `Token ${Cookies.get("token")}` 
            }
        }).then(
            (res) => {
                setuser(res.data)
            }
        ).catch( err => {
            alert(err)
        })
    };

    const updaterole = () => {
        var formData = new FormData();
        formData.append("username", user.username);
        formData.append("name", user.name);
        if(user.role=='Member'){
            formData.append("role", 'Admin')
        }
        else{
            formData.append("role", 'Member')
        }

        axios.put(`http://127.0.0.1:8000/api/user/${props.userid}/`, formData, {
            headers : {
                "Authorization": `Token ${Cookies.get("token")}`
            }
        }).then(
            (res) => {
                console.log("Done")
                window.location.href = 'http://127.0.0.1:3000/users/'
            }
        ).catch ( err => {
            alert(err)
        })
    }

    return (
        <Button size="small" color="primary" onClick={updaterole}>
            Update Role
        </Button>
    )
}