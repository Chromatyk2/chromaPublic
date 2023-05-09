import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function UniqueBox(props) {
    return(
        <li className="uniqueBox">
            <div id="one" className="button2">
                <p className="nbBox">{props.number}</p>
                <p>{props.console}</p>
                <div type="button" className="button2 box closed"></div>
            </div>
        </li>
    )
}
export default UniqueBox