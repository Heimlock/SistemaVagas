
import React        from 'react';

import CardJob      from "./JobCard/JobCard.js";

import vagaDev      from "../../assets/developer.png";
import vagaDesigner from "../../assets/designer.png";
import vagaTester   from "../../assets/tester.png";

const jobsList = () => (
    <div className="row card-columns" id="cards">
        <CardJob/>
        <CardJob/>
        <CardJob/>
    </div>
);

export default jobsList;