import React, { useEffect } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
  
const Login = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=> {
    loginstatus();
  })

  const loginstatus = () => {
    if(Cookies.get("token")!=null){
      window.location.href = 'http://127.0.0.1:3000/dashboard/'
    }
  }
  
  return (
    <div>
      <Button variant="outlined" 
              color="primary" onClick={handleClickOpen}>
        Open My Custom Dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
           Login 
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Login with Channeli?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
           Close
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
           <a href = 'https://channeli.in/oauth/authorise/?client_id=mXQdkJoyeVCKvVNz5wMhoZLakm6D2j05GC5OETYA&redirect_uri=http://127.0.0.1:3000/oauth/&state=RANDOM_STATE_STRING'>Yes</a>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Login