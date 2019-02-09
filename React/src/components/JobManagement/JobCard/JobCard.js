
import  React from 'react';

import vagaDev      from "../../../assets/developer.png";
import vagaDesigner from "../../../assets/designer.png";
import vagaTester   from "../../../assets/tester.png";
import backDefault  from "../../../assets/background.jpg";


const   jobCard = (props) => {
    let img;

    // Image Selection
    switch(props.area)
    {
        case 'dev':
        {
            img = vagaDev;
            break;
        }
        case 'test':
        {
            img = vagaTester;
            break;
        }
        case 'design':
        {
            img = vagaDesigner;
            break;
        }
        default:
        {
            img = backDefault;
            break;
        }
    }


    // Função de Renderização
    return (
        <div className="col-sm-12 col-md-6 col-lg-4">
        <div className="card">
            <img className="card-img-top" src={img} alt="JobCard"/>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>

                {/* <!-- Card Desc --> */}
                <label htmlFor="descCard" className="col-form-label col-form-label-sm font-weight-bold">
                    Descrição:
                </label>
                <p className="card-text" id="descCard">
                    {props.description}
                </p>
                {/* <!-- End Card Desc --> */}
        
                {/* <!-- Card Salario --> */}
                <label htmlFor="salCard" className="col-form-label col-form-label-sm font-weight-bold">
                    Salário Base:
                </label>
                <p className="card-text" id="salCard">
                    R$ {props.salary}
                </p>
                {/* <!-- End Card Salario --> */}
        
                {/* <!-- Card Buttons --> */}
                <button className="btn btn-warning mr-1"    onClick={props.editHandler} 
                        data-toggle="collapse"              data-target={'#' + props.panelId}>
                    <i className="far fa-edit"></i>
                </button>
                <span> </span>
                <button type="button" className="btn btn-danger" onClick={props.removeHandler}>
                    <i className="far fa-trash-alt"></i>
                </button>
                {/* <!-- End Card Buttons --> */}
            </div>
        </div>
    </div>
    );
}

export  default jobCard;