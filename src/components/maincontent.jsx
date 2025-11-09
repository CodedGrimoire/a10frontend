import React from 'react';
import HBan from "./herobanner"
import Topss from "./TopGenres"
import Aboo from "./About"
import './main.css';  // Import the external CSS file
const maincontent = () => {
    return (
        <div>
<HBan/>
<div>
<Topss/></div>
<Aboo/>
            
        </div>
    );
};

export default maincontent;