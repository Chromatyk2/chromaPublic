import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";
import $ from 'jquery';
import Modal from "react-modal";
import UniqueBoxV2 from "./uniqueBoxV2.js";
import Axios from "axios";
import OBSWebSocket, {EventSubscription} from 'obs-websocket-js';

function NostalBar(props) {
    const [hauteur, setHauteur] = useState(0);
    window.addEventListener("", (param) => {
        var obj = JSON.parse(param.detail.data)
        if(obj.hauteur == 0){
            setHauteur(0);
        }else{
            setHauteur(hauteur + 2);
        }
    });
    useEffect(() => {
        document.getElementById("bar").style.height = hauteur+"%";
    }, [hauteur]);
    return(
        <>
            <div id={"boxContainerId"} className="boxContainer">
                    <div className="barcontainer">
                        <div id={"bar"} className="bar">
                        </div>
                    </div>
            </div>
        </>
    )
}

export default NostalBar
