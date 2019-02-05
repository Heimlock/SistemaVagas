import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Header   from './components/navigation/Header/Header';
import Collapse from './components/navigation/Collapse/Collapse';
import JobsList from './components/JobsList/JobsList';
import JobForm  from './components/JobForm/JobForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <div className="container pt-3 mt-3">
          <Collapse buttonText="Nova Vaga" collapseID='newJobForm' btnClass='btn-primary'>
            <JobForm/>
          </Collapse>
          <JobsList/>
        </div>
      </div>
    );
  }
}

export default App;
