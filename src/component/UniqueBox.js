import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function UniqueBox(props) {
    return(
        <li className="col-4 uniqueBox">
            <div id="one" className="button2">
                <p className="nbBox">{props.number}</p>
            </div>
        </li>
    )
}
export default UniqueBox