
import React    from 'react';


const collapse = ( props ) => (
    <div className='mt-3'>
        <button className={`btn ${props.btnClass}`} type="button" 
                data-toggle="collapse"      data-target={`#${props.collapseID}`}
                aria-expanded="false"       aria-controls={props.collapseID}>
        {props.buttonText}
        </button>
        
        <div className="collapse card card-body mb-3 mt-3" id={props.collapseID}>
            {props.children}
        </div>

    </div>
)

export default collapse;