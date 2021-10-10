import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chip } from "@material-ui/core";
import Cookies from "js-cookie";

export default function ProjectList( props ){
    const [lists, SetLists] = useState([]);

    useEffect(() => {
        fetchLists();
    }, []);

    const fetchLists = async () => {
        await axios.get(`http://127.0.0.1:8000/api/projectlists/?projectid=${props.projectid}`, {
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

    return (
        <>
            {lists.map(list => {
                return (
                    <Chip label={list.list_name} style = {{ width: 100 }} />
                )
            })}
        </>
    )
}