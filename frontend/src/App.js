import React, {useEffect, useState} from 'react';
import axios from 'axios'
//import './App.css';
import User from './components/users'
import Navbar from './components/navbar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ProjectDetail from './components/ind_project';
import Cookies from 'js-cookie'
import Login from './components/login';
import Dashboard from './components/Dashboard';
import AddProject from './components/Addprojects';
import UpdateProject from './components/Updateprojects';
import Oauth from './components/oauth';
import Contact from './components/testform';
import ProjectList from './components/Projectlist';
import Addlist from './components/Addlist';
import Checklogin from './components/checklogin';
import AddCard from './components/Addcard';
import Listdetail from './components/listdetail';
import Deletecard from './components/carddelete';
import Updatecard from './components/Updatecard';

function App() {
  // const [token, setToken] = useState('')
  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const auth = params.get("code");

  //   axios.get(`http://127.0.0.1:8000/?code=${auth}&state=RANDOM_STATE_STRING`, {withCredentials: true})
  //   .then((response) => {
  //     Cookies.set('token', response.data['token'], {path:"/"})
  //     Cookies.set('username', response.data['username'], {path:"/"})
  //     console.log(response.data)})
  // }, [])
  // console.log(user)
  // payload = {username:user}
  // axios({
  //   method: 'post',
  //   url: 'http://127.0.0.1:8000/token/obtain',
  //   data: payload, // you are sending body instead
  //   headers: {
  //    // 'Authorization': `bearer ${token}`,
  //   'Content-Type': 'application/json'
  //   }, 
  // })
  
  return (
    <Router>
      <div className="App">
        <Checklogin />
        <Navbar />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/project/create" exact component={AddProject} />
          <Route path="/project/:id" exact component={ProjectDetail} />
          <Route path="/users" exact component={User} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/project/create" exact component={AddProject} />
          <Route path="/project/:id/update" exact component={UpdateProject} />
          <Route path="/oauth/" exact component={Oauth} />
          <Route path="/project/:id/createlist" exact component={Addlist} />
          <Route path="/:id/createcard" exact component={AddCard} />
          <Route path="/list/:id" exact component={Listdetail} />
          <Route path="/:listid/deletecard/:cardid" exact component={Deletecard} />
          <Route path="/list/:id/updatecard/:cardid" exact component={Updatecard} />
          {/* <Route path="/test/" exact component={Contact} /> */}
        </Switch>
      </div>
      </Router>
  );
};

export default App;
