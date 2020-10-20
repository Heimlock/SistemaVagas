import React from 'react';
import axios from 'axios';

import developerImg     from    '../../assets/developer.png'
import testerImg        from    '../../assets/tester.png'
import designerImg      from    '../../assets/designer.png'
import backDefault      from    '../../assets/background.jpg'
import Loading          from    '../navigation/Loading/Loading';

export default class JobDetails extends React.Component {

  state = {
    job: {},
    isLoading: false
  }

  componentDidMount() {
    if (this.props.match.params.jobId) {
      this.setState({isLoading:true});
      axios.get('/jobs/' + this.props.match.params.jobId, window.getAxiosConfig())
        .then(response => {
          this.setState({ job: response.data.data });
          this.setState({isLoading:false});
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

    if( !this.state.isLoading )
    {
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

          <hr/>

          <p><b>Diferenciais:</b><br/>
          {this.state.job.differentials}</p>

          <hr/>

          <p><b>Salário Base:</b><br/>
          R$ {this.state.job.salary}</p>

        </section>
      )
    }
    else {
      return <Loading/>
    }
  }
} 