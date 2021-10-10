import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chip } from "@material-ui/core";
import Cookies from "js-cookie";

export default function Userchip( props ){
    const [user, SetUser] = useState([]);

    // console.log(props.userid)

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        await axios.get(`http://127.0.0.1:8000/api/user/${props.userid}/`, {
            headers : {
                "Authorization": `Token ${Cookies.get("token")}` 
            }
        }).then(
            (res) => {
                SetUser(res.data)
            }
        ).catch( err => {
            alert(err)
        })
    };

    return (
        <>
            <Chip label={user.name} style = {{ width: 115, marginRight:10 }} />
        </>
    )
}