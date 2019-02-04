
import React from 'react';


const newJob = () => (
    <div>
        {/* Nova Vaga Button */}
        <div className="row">
            <div className="col">
                <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseNovaVaga"
                    aria-expanded="false" aria-controls="collapseNovaVaga">
                    Nova Vaga
                </button>
            </div>
        </div>

        {/* Form Nova Vaga */}
        <form>
            <div className="form-group">
                <label for="inputNome">Nome</label>
                <input type="text" className="form-control" id="inputNome" />
            </div>
            <div className="form-group">
                <label for="inputDesc">Descrição</label>
                <textarea className="form-control" id="inputDesc"></textarea>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label for="inputHab">Habilidades Necessárias</label>
                    <textarea className="form-control" id="inputHab"></textarea>
                </div>
                <div className="form-group col-md-6">
                    <label for="inputDiff">Diferenciais</label>
                    <textarea className="form-control" id="inputDiff"></textarea>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label for="inputSal">Salário Base</label>
                    <input type="text" className="form-control" id="inputSal" />
                </div>
                <div className="form-group col-md-6">
                    <label for="inputArea">Área</label>
                    <select id="inputArea" className="form-control">
                        <option selected>Desenvolvimento</option>
                        <option>Design</option>
                        <option>Testes</option>
                    </select>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" for="gridCheck">
                            Vaga para PCD
                        </label>
                    </div>
                </div>
            </div>
            <div className="form-group text-right">
                <button type="submit" className="btn btn-success">Criar Vaga</button>
            </div>
        </form>
    </div>
);

export default newJob;
