import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function UniqueBox(props) {
    const [max, setMax] = useState(null);
    const [console, setConsole] = useState(props.console);
    if(props.console == "GB"){
        setMax( 432);
    }
    if(props.console == "GBA"){
        setMax(424);
    }
    if(props.console == "GBC"){
        setMax(233);
    }
    if(props.console == "MASTER SYSTEM"){
        setMax(194);
    }
    if(props.console == "MEGADRIVE"){
        setMax(400);
    }
    if(props.console == "N64"){
        setMax(133);
    }
    if(props.console == "NDS"){
        setMax(488);
    }
    if(props.console == "NES"){
        setMax(280);
    }
    if(props.console == "NGC"){
        setMax(234);
    }
    if(props.console == "PS1"){
        setMax(147);
    }
    if(props.console == "PSP"){
        setMax(286);
    }
    if(props.console == "SNES"){
        setMax(458);
    }
    if(max !== null){
        var randomNumber = Math.floor(Math.random()*max) + 1;
        return(
            <li className="uniqueBox">
                <div id="one" className="button2">
                    <p className="nbBox">{props.number}</p>
                    <p>{props.console} : {max}</p>
                    <img className="arrowImage" src={'/images/jaquettes/'+{console}+'Jaquette ('+{randomNumber}+').png'}></img>
                    <div type="button" className="button2 box closed"></div>
                </div>
            </li>
        )
    }
}
export default UniqueBox