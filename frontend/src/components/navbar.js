import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios'
import Cookies from 'js-cookie';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
//import ModalDialog from './ModalDialog';

const useStyles = makeStyles(theme => ({
  root : {
    margin: "5px 0px"
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const Logout = ()  => {
    window.location.href = 'http://127.0.0.1:3000/logout'
  };

  const handleClose = () => {
  setOpen(false);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Welcome 
        </Typography>
        <List component="nav">
          <ListItem component="div">
            <ListItemText inset>
              <Typography variant = "h6" color = "inherit">
                <a href = "http://127.0.0.1:3000/dashboard/">Home</a>
              </Typography>
            </ListItemText>
            <ListItemText inset>
              <Typography variant = "h6" color = "inherit">
                <a href = "http://127.0.0.1:3000/users/">Users</a>
              </Typography>
            </ListItemText>
            <ListItemText inset>
              <Typography variant = "h6" color = "inherit">
                <a href = "http://127.0.0.1:3000/project/create/">Add Project</a>
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
        <ListItemText inset>
              <Typography variant = "h6" color = "inherit" align="right">
                <Button color="inherit" onClick={Logout} variant="h6">
                  Logout
                </Button>
              </Typography>
            </ListItemText>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;