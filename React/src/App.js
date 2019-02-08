import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Header   from './components/navigation/Header/Header';
// import Collapse from './components/navigation/Collapse/Collapse';
import JobsManagement from './components/JobsManagement/JobsManagement';
// import JobForm  from './components/JobForm/JobForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <div className="container pt-3 mt-3">
          <JobsManagement/>
        </div>
      </div>
    );
  }
}

export default App;
