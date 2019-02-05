
import React        from 'react';

import JobCard      from "./JobCard/JobCard.js";

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


class JobsList extends React.Component {
    state = {
        jobs: [
            { id:1, name:"Developer", description:"lorem ipsum - dev",    salary:1234,    area:"dev" },
            { id:2, name:"Tester",    description:"lorem ipsum - tester", salary:4321,    area:"test" },
            { id:3, name:"Design",    description:"lorem ipsum - Design", salary:9876,    area:"design" },
            { id:4, name:"Developer", description:"lorem ipsum - dev",    salary:1234,    area:"dev" },
            { id:5, name:"Tester",    description:"lorem ipsum - tester", salary:4321,    area:"test" },
            { id:6, name:"Design",    description:"lorem ipsum - Design", salary:9876,    area:"design" },
            { id:7, name:"Developer", description:"lorem ipsum - dev",    salary:1234,    area:"dev" },
            { id:8, name:"Tester",    description:"lorem ipsum - tester", salary:4321,    area:"test" },
            { id:9, name:"Design",    description:"lorem ipsum - Design", salary:9876,    area:"design" }
        ]
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

    componentWillMount() {
        console.log('COMPONENT WILL MOUNT');
    }

    componentDidMount() {
        console.log('COMPONENT DID MOUNT');
    }
    
    componentWillUpdate() {
        console.log('COMPONENT WILL UPDATE');
    }
    
    componentDidUpdate() {
        console.log('COMPONENT DID UPDATE');
    }

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
            <div className="row card-columns mt-3">
                {renderJobs}
            </div>
        );
    }
}


export default JobsList;