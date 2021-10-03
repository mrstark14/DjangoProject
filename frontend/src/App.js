import React from 'react';
//import './App.css';
import User from './components/users'
import Navbar from './components/navbar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ProjectDetail from './components/ind_project';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <h1>Login User</h1>
        <Route path="/project/:id" exact component={ProjectDetail} />
        <Route path="/users" exact component={User} />
      </div>
      </Router>
  );
}

export default App;
