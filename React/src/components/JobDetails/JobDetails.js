import React from 'react';
import axios from 'axios';

import developerImg     from    '../../assets/developer.png'
import testerImg        from    '../../assets/tester.png'
import designerImg      from    '../../assets/designer.png'
import backDefault      from    '../../assets/background.jpg'

export default class JobDetails extends React.Component {

  state = {
    job: {}
  }

  componentDidMount() {
    if (this.props.match.params.jobId) {
      axios.get('/jobs/' + this.props.match.params.jobId, window.getAxiosConfig())
        .then(response => {
          this.setState({ job: response.data.data });
        })
        .catch(error => {
          alert('Deu erro no servidor!');
          console.error(error);
        });
    }

  }

  render() {
    let img = null;

    switch (this.state.job.area) {
      case 'dev':
        img = developerImg;
        break;
      case 'test':
        img = testerImg;
        break;
      case 'design':
        img = designerImg;
        break;
      default:
        img = backDefault;
        break;
    }

    return (
      <section>
        <div className="p-5 pt-5" style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', width: '100%', height: '200px' }}>
          <h2 className="text-white shadow ">{this.state.job.name}</h2>
        </div>

        <hr/>

        <p><b>Descrição:</b><br/>
        {this.state.job.description}</p>

        <hr/>

        <p><b>Habilidades:</b><br/>
        {this.state.job.skills}</p>

      </section>
    )
  }
} 