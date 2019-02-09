
import React    from 'react';
import { Link } from 'react-router-dom';
import logo     from "../../../assets/logo-vagas.png";

const header = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            {/* <Link className="navbar-brand" to='/dashboard'>
                <img src={ logo } style={ { width: '100px' } }  alt="Logo" />
            </Link> */}
            <div>
                <Link className="navbar-brand" to='/dashboard'>
                    <img src={logo} style={{ width: '100px' }}  alt="Logo" />
                </Link>
            </div>
            {/* <a className="navbar-brand" href="../../../public/index.html">
                <img src={logo} style={{ width: "100px" }} alt="Logo" />
            </a> */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {/* <li className="nav-item active">
                        <a className="nav-link" href="../../../public/index.html">Vagas <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="../../../public/index.html">Sobre</a>
                    </li> */}
                    <Link className="nav-item nav-link active text-white" to='/vagas'>
                        Vagas
                    </Link>
                    <Link className="nav-item nav-link text-white" to='/sobre'>
                        Sobre
                    </Link>
                </ul>
            </div>
            <span className="nav-item nav-link text-white">
                { props.userName }
            </span>
            <button className="nav-item nav-link btn btn-link text-white" onClick={() => props.logout()}>
                <i className="fas fa-sign-out-alt"></i>
            </button>
        </nav>
    );
};

export default header;