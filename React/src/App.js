import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Header   from './components/navigation/Header/Header';
import JobsList from './components/JobsList/JobsList';
import NewJob from './components/NewJob/NewJob';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <div className="container">
          <NewJob/>
          <JobsList/>
        </div>
      </div>
    );
  }
}

export default App;
