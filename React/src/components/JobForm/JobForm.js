
import React from 'react';


const newJob = () => (
    <form>        {/* Form Nova Vaga */}
        <div className="form-group">
            <label htmlFor="inputNome">Nome</label>
            <input type="text" className="form-control" id="inputNome" />
        </div>
        <div className="form-group">
            <label htmlFor="inputDesc">Descrição</label>
            <textarea className="form-control" id="inputDesc"></textarea>
        </div>
        <div className="form-row">
            <div className="form-group col-md-6">
                <label htmlFor="inputHab">Habilidades Necessárias</label>
                <textarea className="form-control" id="inputHab"></textarea>
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="inputDiff">Diferenciais</label>
                <textarea className="form-control" id="inputDiff"></textarea>
            </div>
        </div>
        <div className="form-row">
            <div className="form-group col-md-6">
                <label htmlFor="inputSal">Salário Base</label>
                <input type="text" className="form-control" id="inputSal" />
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="inputArea">Área</label>
                <select id="inputArea" className="form-control">
                    <option defaultValue>Desenvolvimento</option>
                    <option>Design</option>
                    <option>Testes</option>
                </select>
            </div>
        </div>
        <div className="form-row">
            <div className="form-group">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck" />
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
);

export default newJob;
