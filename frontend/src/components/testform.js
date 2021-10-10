import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField,
  Paper,
  Typography
} from "@material-ui/core";
import { KeyboardDatePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class Contact extends React.Component {
  render() {
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
            <form>
            <h1>New Project</h1>

            <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input id="name" type="text" />
            </FormControl>

            <FormControl margin="normal" fullWidth>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
              label="Due Date"
              format="yyyy-MM-dd"
              />
            </MuiPickersUtilsProvider>
            </FormControl>

            {/* <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" type="email" />
            </FormControl> */}

            <FormControl margin="normal" fullWidth>
                <Typography style={{ marginBottom: 15 }} variant='title'>Project description</Typography>
                <CKEditor
                    id="description"
                    name="description"
                    editor={ ClassicEditor }
                    onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    // console.log('Editor is ready to use!', editor);
                    }}
                    data=""
                    multiline rows={10}        
                  />
            </FormControl>

            <Button variant="contained" color="primary" size="medium" margin="normal">
                Send
            </Button>
            </form>
        </Paper>
      </div>
    );
  }
}

export default Contact;
