
import React from 'react';
import axios from 'axios';


//  StateFull Component
export default class JobForm extends React.Component
{
    objModel = Object.freeze({
        name: '',
        description: '',
        skills: '',
        salary:'',
        area: '',
        isPcd:false
    });

    state = {
        newJob: {...this.objModel}
    }

    postJobHandler  =   ( event ) => {
        let objID = '';

        //  Previnir que a Página atualize
        event.preventDefault();

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

    onValueChangeHandler = ( attrName, value ) => {
        let currentJob      =   this.state.newJob;
        currentJob[attrName]=   value;
        this.setState({newJob: currentJob});
    }

    render()
    {
        return (
            <form onSubmit={ this.postJobHandler }>
                {/* Form Nova Vaga */}
                <div className="form-group">
                    <label htmlFor="inputNome">Nome(*)</label>
                    <input  type="text" className="form-control" id="inputNome" name="name" required
                            value={this.state.newJob.name}  
                            onChange={ (event) => this.onValueChangeHandler( event.target.name, event.target.value) }/>
                </div>

                <div className="form-group">
                    <label htmlFor="inputDesc">Descrição(*)</label>
                    <textarea   className="form-control" id="inputDesc" name="description" required
                                value={this.state.newJob.description}  
                                onChange={ (event) => this.onValueChangeHandler( event.target.name, event.target.value) }></textarea>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputHab">Habilidades Necessárias</label>
                        <textarea   className="form-control" id="inputHab"  name="skills"
                                    value={this.state.newJob.skills}  
                                    onChange={ (event) => this.onValueChangeHandler( event.target.name, event.target.value) }></textarea>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputDiff">Diferenciais</label>
                        <textarea   className="form-control" id="inputDiff" name="differentials"
                                    value={this.state.newJob.differentials}  
                                    onChange={ (event) => this.onValueChangeHandler( event.target.name, event.target.value) }></textarea>
                    </div>
                </div>

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

                <div className="form-group text-right">
                    <button type="submit" className="btn btn-success">Criar Vaga</button>
                </div>
            </form>
        )
    }
}
