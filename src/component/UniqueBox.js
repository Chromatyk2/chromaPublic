import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function UniqueBox(props) {
    return(
        <li className="col-4 uniqueBox">
            <div id="one" className="button2">
                <p className="nbBox">{props.number}</p>
                <object style={{position:"absolute",top:"50px",zIndex:"-2",left: "1130px"}} data="télécharger.svg" width="150" height="300"> </object>
            </div>
        </li>
    )
}
export default UniqueBox