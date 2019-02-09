
import React from 'react';
import axios from 'axios';


//  StateFull Component
export default class JobForm extends React.Component
{
    //  Modelo vazio
    objModel = Object.freeze({
        name: '',
        description: '',
        skills: '',
        salary:'',
        area: '',
        isPcd:false
    });

    state = {
        newJob: {...this.objModel},
        isEditing: false
    }

    //  Envia Dados ao Servidor (Adição/Modificação)
    postJobHandler  =   ( event ) => {
        let objID = '';

        //  Previnir que a Página atualize
        event.preventDefault();

        //  Verifica se é uma Edição ou Adição
        if(this.state.newJob.id){
            axios.put('/jobs/' + this.state.newJob.id, this.state.newJob)
            .then(response => {
              this.props.editedHandler(this.state.newJob.id, this.state.newJob);
              this.setState({ newJob: { ...this.objModel } }); //limpar form
            })
            .catch(error => {
              alert('Erro ao Atualizar! (Put - Server)');
              console.error(error);
            });
        }
        else{
            //  Submit to Database
            axios.post('/jobs', this.state.newJob)
            .then( response => {
                objID = response.data.data;
                
                this.props.addItemList( {id:objID, ...this.state.newJob} );
                this.setState( {newJob:{...this.objModel}, validated:false} );
            })
            .catch( error => {
                console.error(error);
            } );
        }
    }

    //  Recupera o InformaçÕes do Job para Edição
    componentDidUpdate() {
        console.log('did update - id: ' + this.props.editJobId);
        if (this.props.editJobId && !this.state.isEditing) {
          axios.get('/jobs/' + this.props.editJobId)
            .then(response => {
                this.setState({ newJob: response.data.data, isEditing: true });
                console.info( `${response.data.message} Ready to be Edit!` );
            })
            .catch(error => {
                alert('Erro ao Ler! (Get - Server)');
                console.error(error);
            });
          }
      }

    //  Verifica se há alterações(?!)   --  DUVIDA
    shouldComponentUpdate(nextProps, nextState) {
        let hasChanged = false;
        if (this.props.editJobId !== nextProps.editJobId) {
            hasChanged = true;
        }
        Object.keys(nextState.newJob).forEach(key => {
            if (this.state.newJob[key] !== nextState.newJob[key]) {
                hasChanged = true;
            }
        });
        return hasChanged;
    }

    //  Possibilita Alterações no Formulário
    onValueChangeHandler = ( attrName, value ) => {
        let currentJob      =   {...this.state.newJob};
        currentJob[attrName]=   value;
        this.setState({newJob: currentJob});
    }

    //  Função que Restaura os Valores Iniciais do Formulário
    clearFormHandler = () => {
        this.setState({ newJob: { ...this.objModel }, isEditing: false }); //limpar form
        this.props.clearSelectedId();
    }

    //  Função de Renderização do Componente
    render()
    {
        // Form Nova Vaga
        return (
            <form onSubmit={ this.postJobHandler }>
                {/* Name */}
                <div className="form-group">
                    <label htmlFor="inputNome">Nome(*)</label>
                    <input  type="text" className="form-control" id="inputNome" name="name" required
                            value={this.state.newJob.name}  
                            onChange={ (event) => this.onValueChangeHandler( event.target.name, event.target.value) }/>
                </div>

                {/* Description */}
                <div className="form-group">
                    <label htmlFor="inputDesc">Descrição(*)</label>
                    <textarea   className="form-control" id="inputDesc" name="description" required
                                value={this.state.newJob.description}  
                                onChange={ (event) => this.onValueChangeHandler( event.target.name, event.target.value) }>
                    </textarea>
                </div>

                {/* Skills & Differentials */}
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputHab">Habilidades Necessárias</label>
                        <textarea   className="form-control" id="inputHab"  name="skills"
                                    value={this.state.newJob.skills}  
                                    onChange={ (event) => this.onValueChangeHandler( event.target.name, event.target.value) }>
                        </textarea>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="inputDiff">Diferenciais</label>
                        <textarea   className="form-control" id="inputDiff" name="differentials"
                                    value={this.state.newJob.differentials}  
                                    onChange={ (event) => this.onValueChangeHandler( event.target.name, event.target.value) }></textarea>
                    </div>
                </div>

                {/* Salary & Area */}
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputSal">Salário Base(*)</label>
                        <input  type="text" className="form-control" id="inputSal"  name="salary" required
                                value={this.state.newJob.salary}  
                                onChange={ (event) => this.onValueChangeHandler( event.target.name, event.target.value) }/>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="inputArea">Área</label>
                        <select id="inputArea" className="form-control" name="area"
                                value={this.state.newJob.area} required
                                onChange={ (event) => this.onValueChangeHandler( event.target.name, event.target.value) }>
                            <option value='' defaultValue>Selecione...</option>
                            <option value='dev'>Desenvolvimento</option>
                            <option value='design'>Design</option>
                            <option value='test'>Testes</option>
                        </select>
                    </div>
                </div>

                {/* isPcd */}
                <div className="form-row">
                    <div className="form-group">
                        <div className="form-check">
                            <input  className="form-check-input" type="checkbox" id="gridCheck"  name="isPcd"
                                    value={this.state.newJob.isPcd}  
                                    onChange={ (event) => this.onValueChangeHandler( event.target.name, event.target.checked) }/>
                            <label className="form-check-label" htmlFor="gridCheck">
                                Vaga para PCD
                            </label>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="form-group col-12 text-right mb-0">
                    <button onClick={this.clearFormHandler} className="btn btn-danger mr-1" 
                            data-toggle="collapse"          data-target={'#' + this.props.panelId}>
                            Cancelar
                    </button>
                    <button type="submit" className="btn btn-success" 
                            data-toggle="collapse" data-target={'#' + this.props.panelId}>
                            Salvar vaga
                    </button>
                </div>
            </form>
        )
    }
}
