import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import { Grid, makeStyles, Paper, TextField, Button, MenuItem, Select, FormControl, InputLabel, Box, Input } from '@material-ui/core';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { KeyboardDatePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CancelIcon from '@material-ui/icons/Cancel';

export default function Addlist( match ) {
    const [project, SetProject] = useState([])
    const [listname, SetListname] = useState([])

    useEffect(() => {
        loginCheck();
    },[])

    const loginCheck = () => {
        if (Cookies.get("token")==null) {
            window.location.href = 'http://127.0.0.1:3000/login/'
        }
    }

    useEffect(() => {
        fetchProject();
    },[]);

    const fetchProject = async () => {
        await axios.get(`http://127.0.0.1:8000/api/project/${match.match.params.id}`, {
            headers : {
                "Authorization": `Token ${Cookies.get("token")}`,
            }
        }).then(
            (res) => {
                SetProject(res.data)
            }
        ).catch(err => {
            console.log("Error")
        })
    };

    const handleClose = () => {
        window.location.href = `http://127.0.0.1:3000/project/${match.match.params.id}`
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        var formData = new FormData()
        formData.append("list_name", listname);
        formData.append("project", match.match.params.id)
        await axios.post('http://localhost:8000/api/projectlist/', formData, {
            headers : {
                "Authorization": `Token ${Cookies.get("token")}`
            }
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            alert(err)
        })

        handleClose();
    };

    return (
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 20,
          padding: 20
        }}
        >
        <Paper style={{ padding: 30, width: "50%"}}>
            <form onSubmit = {handleSubmit}>
                <h1>New List</h1>
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="name">List Name</InputLabel>
                    <Input id="name" type="text" onChange={(e)=>{
                    SetListname(e.target.value)
                    }}
                    />
                </FormControl>
                <div style={{float: 'right'}}>
                    <Button variant="contained" onClick={handleClose} margin="normal" startIcon={<CancelIcon />} disableElevation>
                    Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary" margin="normal" style={{ marginLeft: 10 }} startIcon={<AddBoxIcon />} disableElevation>
                        Add
                    </Button>
                </div>
            </form>

        </Paper>
        </div>
    )
}