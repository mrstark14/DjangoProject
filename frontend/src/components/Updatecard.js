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


export default function Updatecard( match ) {
    const [users, setUsers] = useState([]);
    const [values, setValues] = useState(initialValues)
    const classes = useStyle

    const [project_name, setProjectname] = useState([]);
    const [listid, setlistid] = useState(match.match.params.id);
    const [description, setDescription] = useState([]);
    const [project_members, setProjectmembers] = useState([]);

    useEffect(() => {
        loginCheck();
    },[])

    const loginCheck = () => {
        if (Cookies.get("token")==null) {
            window.location.href = 'http://127.0.0.1:3000/login/'
        }
    }
    
    useEffect(() => {
        fetchCard();
    })

    const fetchCard = async () => {
        await axios.get(`http://127.0.0.1:8000/api/projectcard/${match.match.params.cardid}`, {
            headers : {
                "Authorization": `Token ${Cookies.get("token")}`,
            }
        }).then(
            (res)  => {
                setProjectname(res.data.card_name)
                setProjectmembers(res.data.card_members)
                setDescription(res.data.description)
            }
        ).catch(err=>{
            alert(err);
        })
    }

    const handleClose = () => {
        window.location.href = `http://127.0.0.1:3000/${match.match.params.projectid}/list/${match.match.params.id}`
    }

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

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(name, wiki, selected);
        // console.log(getproj)
        var formData = new FormData();
        formData.append("card_name", project_name);
        // formData.append("due_date", formatDate(due_date));
        formData.append("description", description);
        formData.append("list", listid);
        // console.log(formatDate(due_date))
        project_members.map(select => {
          formData.append("card_members", select)
        });

        await axios.put('http://localhost:8000/api/projectcard/', formData, {
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
                <form className={classes.root} onSubmit = {handleSubmit}>
                        <TextField
                        fullWidth
                        variant = 'outlined'
                        label = 'Card name'
                        value = {project_name}
                        onChange={(e)=>{
                            setProjectname(e.target.value)
                        }}
                        />
                        <br/>
                        <br/>
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
                                data={description}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setDescription(data);
                                    // console.log(datasetProject);
                                    // console.log(wiki)
                                }}
                            />
                        </div>
                        <br/>
                        <FormControl margin="normal" className={classes.formControl} fullWidth>
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
                        <br />
                        <div style={{float:'right'}}>
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