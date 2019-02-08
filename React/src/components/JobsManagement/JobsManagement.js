
import React        from 'react';
import axios        from 'axios';

import JobCard      from "./JobCard/JobCard.js";
import JobForm      from '../JobForm/JobForm';
import Collapse     from '../navigation/Collapse/Collapse';

// import vagaDev      from "../../assets/developer.png";
// import vagaDesigner from "../../assets/designer.png";
// import vagaTester   from "../../assets/tester.png";

// const jobsList = () => (
//     <div className="row card-columns" id="cards">
//         <CardJob/>
//         <CardJob/>
//         <CardJob/>
//     </div>
// );


export default class JobsManagement extends React.Component {
    state = { jobs: [] }

    jobCreateHandler = (paramNewJob) => {
        let newList = this.state.jobs;
        newList.push(paramNewJob);
        this.setState({ jobs: newList });
    }

    jobRemoveHandler = (paramID, paramName) => {        
        if( window.confirm(`Deseja realmente remover a vaga '${paramName}'?`) )
        {
            const index = this.state.jobs.findIndex( job => job.id === paramID );
            let newList = this.state.jobs;
            newList.splice( index, 1 );
            this.setState({jobs:newList});
    
            window.alert('Removido com Sucesso!');
        }
    }

    jobEditHandler = (name) => {
        console.log(name);
    }

    // componentWillMount() {
    //     console.log('COMPONENT WILL MOUNT');
    // }

    componentDidMount() {
        console.log('COMPONENT DID MOUNT');
        axios.get('/jobs')
            .then( response => {
                this.setState( {jobs: response.data.data} );
            }
            )
            .catch(
                error => {
                    console.error(error);
                }
            );
    }
    
    // componentWillUpdate() {
    //     console.log('COMPONENT WILL UPDATE');
    // }
    
    // componentDidUpdate() {
    //     console.log('COMPONENT DID UPDATE');
    // }

    render() {
        console.log('RENDER');
        
        const renderJobs = this.state.jobs.map( job => {
            return <JobCard 
                        key={job.id} 
                        name={job.name} 
                        description={job.description} 
                        salary={job.salary} 
                        area={job.area}
                        removeHandler={ () => this.jobRemoveHandler(job.id, job.name) }
                        editHandler={ () => this.jobEditHandler(job.name) }
                    />;
        });

        return (
            <div>
                <Collapse buttonText="Nova Vaga" collapseID='newJobForm' btnClass='btn-primary'>
                    <JobForm
                        addItemList={ this.jobCreateHandler }
                    />
                </Collapse>

                <div className="row card-columns mt-3">
                    {renderJobs}
                </div>
            </div>
        );
    }
}
