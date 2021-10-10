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

const useStyle = makeStyles(theme =>({
    root:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(1),
        marginLeft: '30px',
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

const initialValues = {
    project_name: '',
    due_date: new Date(),
    project_members: '',
    project_leader: '',
    description: '',
}


export default function AddProject() {
    const [users, setUsers] = useState([]);
    const [values, setValues] = useState(initialValues)
    const classes = useStyle

    const [project_name, setProjectname] = useState([]);
    const [due_date, setDuedate] = useState(new Date());
    const [project_members, setProjectmembers] = useState([]);
    const [project_leader, setProjectleader] = useState([]);
    const [description, setDescription] = useState([]);

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

    const handleDateChange = (date) => {
        // console.log(date);
        setDuedate(date);
    };
    
    const handleClose = () => {
        window.location.href = 'http://127.0.0.1:3000/dashboard/'
    }
    
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(name, wiki, selected);
        // console.log(getproj)
        var formData = new FormData();
        formData.append("project_name", project_name);
        formData.append("due_date", formatDate(due_date));
        formData.append("description", description);
        formData.append("project_leader", project_leader);
        // console.log(formatDate(due_date))
        project_members.map(select => {
          formData.append("project_members", select)
        });

        await axios.post('http://localhost:8000/api/project/', formData, {
            headers : {
                "Authorization": `Token ${Cookies.get("token")}`
            }
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
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
                <h1>New Project</h1>
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input id="name" type="text" onChange={(e)=>{
                    setProjectname(e.target.value)
                    }}
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>

                        <KeyboardDatePicker
                        label="Due date of project"
                        value={due_date}
                        onChange={handleDateChange}
                        format="yyyy-MM-dd"
                        />

                    </MuiPickersUtilsProvider>
                </FormControl>
                    <div>
                        <br />
                        <h4>Description</h4>
                        <br />
                        <CKEditor
                            editor={ ClassicEditor }
                            onReady={(editor) => {
                                // You can store the "editor" and use when it is needed.
                                // console.log('Editor is ready to use!', editor);
                            }}
                            data=""
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setDescription(data);
                                // console.log(data);
                                // console.log(wiki)
                            }}
                        />
                    </div>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel> Members </InputLabel>
                        <Select 
                        multiple={true}
                        fullWidth
                        required
                        value={project_members}
                        onChange = {(e) => 
                            setProjectmembers(e.target.value)
                        }
                        >
                        {users.map(({id, username, name}, index) => {
                            return(
                            <MenuItem key={id} value={id}>
                            
                            {/* <Checkbox checked={checkedState[index]} onChange={handleCheckBox(index)} /> */}
                            {name}
                                            {/* <ListItemText primary={option.username} /> */}
                            </MenuItem>
                            )
                        })}
                        </Select>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel> Leader </InputLabel>
                        <Select 
                        multiple={false}
                        fullWidth
                        required
                        value={project_leader}
                        onChange = {(e) => 
                            setProjectleader(e.target.value)
                        }
                        >
                        {users.map(({id, username, name}, index) => {
                            return(
                            <MenuItem key={id} value={id}>
                            
                            {/* <Checkbox checked={checkedState[index]} onChange={handleCheckBox(index)} /> */}
                            {name}
                                            {/* <ListItemText primary={option.username} /> */}
                            </MenuItem>
                            )
                        })}
                        </Select>
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