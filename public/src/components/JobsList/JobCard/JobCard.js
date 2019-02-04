
import  React from 'react';

import vagaDev      from "../../../assets/developer.png";

const   cardJob = () => (
    <div className="col-sm-12 col-md-6 col-lg-4">
        <div className="card">
            <img className="card-img-top" src={vagaDev} alt="JobCard"/>
            <div className="card-body">
                <h5 className="card-title">Desenvolvedor Front-end JR</h5>

                {/* <!-- Card Desc --> */}
                <label for="descCard01" className="col-form-label col-form-label-sm font-weight-bold">
                    Descrição:
                </label>
                <p className="card-text" id="descCard01">
                    Profissional que goste de trabalhar em um ambiente dinâmico com desenvolvimento de software
                    e que tenha experiência em desenvolvimento full stack.
                </p>
                {/* <!-- End Card Desc --> */}
        
                {/* <!-- Card Salario --> */}
                <label for="salCard01" className="col-form-label col-form-label-sm font-weight-bold">
                    Salário Base:
                </label>
                <p className="card-text" id="salCard01">
                    R$ 10,00
                </p>
                {/* <!-- End Card Salario --> */}
        
                {/* <!-- Card Buttons --> */}
                <button type="button" className="btn btn-warning"><i className="far fa-edit"></i></button>
                <button type="button" className="btn btn-danger"><i className="far fa-trash-alt"></i></button>
                {/* <!-- End Card Buttons --> */}
            </div>
        </div>
    </div>
)

export  default cardJob;