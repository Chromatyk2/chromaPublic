import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function UniqueBox(props) {
    if(props.console == "GB"){
        var max = 432
    }
    if(props.console == "GBA"){
        var max = 424
    }
    if(props.console == "GBC"){
        var max = 233
    }
    if(props.console == "MASTER SYSTEM"){
        var max = 194
    }
    if(props.console == "MEGADRIVE"){
        var max = 400
    }
    if(props.console == "N64"){
        var max = 133
    }
    if(props.console == "NDS"){
        var max = 488
    }
    if(props.console == "NES"){
        var max = 280
    }
    if(props.console == "NGC"){
        var max = 234
    }
    if(props.console == "PS1"){
        var max = 147
    }
    if(props.console == "PSP"){
        var max = 286
    }
    if(props.console == "SNES"){
        var max = 458
    }
    var randomNumber = Math.floor(Math.random()*max) + 1;
    var console = props.console;
    return(
        <li className="uniqueBox">
            <div id="one" className="button2">
                <p className="nbBox">{props.number}</p>
                <p>{props.console} : {max}</p>
                <img className="arrowImage" src={"/images/jaquettes/"+props.console+"Jaquette ("+randomNumber+").png"}></img>
                <div type="button" className="button2 box closed"></div>
            </div>
        </li>
    )
}
export default UniqueBox