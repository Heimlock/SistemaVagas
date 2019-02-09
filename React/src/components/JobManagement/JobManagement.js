
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
    state = {   jobs: [],
                hasError: false,
                selectedId: '' }

    jobCreateHandler = (paramNewJob) => {
        let newList = this.state.jobs;
        newList.push(paramNewJob);
        this.setState({ jobs: newList });
    }

    jobEditHandler = (paramId) => {
        console.log(paramId);
        this.setState({ selectedId: paramId });
    }

    jobEditedHandler = (paramId, newJobData) => {
        const index = this.state.jobs.findIndex(job => job.id === paramId);
        let jobsList = this.state.jobs;
        jobsList[index] = newJobData;
        this.setState({ jobs: jobsList });
    }

    jobRemoveHandler = (paramId, paramName) => {        
        if( window.confirm(`Deseja realmente remover a vaga '${paramName}'?`) )
        {
            axios.delete(`/jobs/${paramId}`)
                .then( _ => {
                    const index = this.state.jobs.findIndex(job => job.id === paramId);
                    let newList = this.state.jobs;
                    newList.splice(index, 1);
                    this.setState({ jobs: newList });

                    window.alert('Removido com sucesso!');
                })
                .catch(error => {
                    console.error(error);
                })
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
        const axiosConfig = {
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(window.localStorage.getItem('token'))
            }
        }
      

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

    clearSelectedId = () => {
        this.setState({ selectedId: '' });
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
                        // removeHandler={ () => this.jobRemoveHandler(job.id, job.name) }
                        // editHandler={ () => this.jobEditHandler(job.name) }
                        panelId="newJobForm"
                        removeHandler={() => this.jobRemoveHandler(job.id, job.name)}
                        editHandler={() => this.jobEditHandler(job.id)} 
                    />;
        });

        return (
            <div>
                <Collapse buttonText="Nova Vaga" collapseID='newJobForm' btnClass='btn-primary'>
                    {/* <JobForm
                        addItemList={ this.jobCreateHandler }
                    /> */}
                    <JobForm panelId="newJobForm"
                             addItemList={ this.jobCreateHandler } 
                             editJobId={ this.state.selectedId } 
                             clearSelectedId={ this.clearSelectedId }
                             editedHandler={ this.jobEditedHandler }
                    />
                </Collapse>

                <div className="row card-columns mt-3">
                    {renderJobs}
                </div>
            </div>
        );
    }
}
