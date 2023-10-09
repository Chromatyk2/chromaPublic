import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";
import $ from 'jquery';
import Modal from "react-modal";
import OpeningBooster from "./openingBooster";
import Axios from "axios";

function UniqueBoxV2(props) {
    const [randomNumber, setRandomNumber] = React.useState(null);
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
    function openBox(e) {
        setRandomNumber(Math.floor(Math.random()*max) + 1);
    }
    return(
        <>
            <div className={"gettedBoxContainer"}>
                <img className={"gettedGameImg"} src={"/images/jaquettes/"+props.consolePicked+"/jaquette("+randomNumber+").png"}/>
                <img onClick={openBox} uConsole={props.consolePicked} className={"gettedBoxImg"} src={"/basicBox.png"}/>
            </div>
        </>
    )
}
export default UniqueBoxV2
