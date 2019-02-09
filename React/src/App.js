import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// import Collapse       from './components/navigation/Collapse/Collapse';
// import JobForm        from './components/JobForm/JobForm';
import Header     	  from  './components/navigation/Header/Header';
import JobManagement  from  './components/JobManagement/JobManagement';
import Sobre          from  './components/About/About';
import NotFound       from  './components/navigation/NotFound/NotFound';
import Login          from  './components/Login/Login';

import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  state = {
    loggedUser: JSON.parse(window.localStorage.getItem('user')) || null
  }

  loginHandler = (paramEmail, paramPass) => {
    axios.post('/login', { 'email': paramEmail, 'password': paramPass })
          .then(response => {
            window.localStorage.setItem('user', JSON.stringify( response.data.user ));
            window.localStorage.setItem('token', JSON.stringify( response.data.token ));

            this.setState({ loggedUser: response.data.user });
          })
          .catch(error => {
            alert('Login inválido');
            console.error(error);
          })
  }

  logoutHandler = () => {
    window.localStorage.clear();
    this.setState({ loggedUser: null });
  }

  // render() {
  //   return (
  //     <div className="App">
  //       <Header/>
  //       <div className="container pt-3 mt-3">
  //         <JobManagement/>
  //       </div>
  //     </div>
  //   );
  // }

  render() {
    if (this.state.loggedUser) {
      return (
        <div className="App">
          <Header userName={ this.state.loggedUser.name }
            logout={ this.logoutHandler }/>
          <div className="container pt-3">
            <Switch>
              <Route path='/'           component={ JobManagement }/>
              <Route path='/dashboard'  component={ JobManagement }/>
              <Route path='/vagas'      component={ JobManagement }/>
              <Route path='/sobre'      component={ Sobre }/>
              <Route path='*'           component={ NotFound }/>
            </Switch>
          </div>
        </div>
      );
    }

    return (<Login login={ this.loginHandler }></Login>);
  }
}

export default App;
