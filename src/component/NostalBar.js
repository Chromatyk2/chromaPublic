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
        }else if(obj.recall > 0) {
            setHauteur(obj.recall);
        }else{
            setHauteur(hauteur + obj.hauteur);
        }
    });
    useEffect(() => {
        if(hauteur > 100){
            document.getElementById("bar").style.height = "100%";
        }else{
            document.getElementById("bar").style.height = hauteur+"%";

        }
        if(hauteur > 29 && hauteur < 59){

        }else if(hauteur > 59 && hauteur < 99){

        }else if(hauteur > 99){

        }
    }, [hauteur]);
    return(
        <>
            <div id={"boxContainerId"} className="boxContainer">
                <div style={{display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    position: "absolute",
                    top: "200px",
                    left: "470px"}}>
                    <i style={{color:"white",marginLeft: "-6px", marginTop: "4px"}}
                       className="fa-solid fa-pen-to-square"></i>
                    <i style={{color:"white",marginLeft: "-6px", marginTop: "4px"}}
                       className="fa-solid fa-floppy-disk"></i>
                    <i style={{color:"white",marginLeft: "-6px", marginTop: "4px"}}
                       className="fa-solid fa-pencil"></i>
                </div>
                <div className="barcontainer">
                    <div id={"bar"} className="bar">
                    </div>
                </div>
            </div>
        </>
    )
}

export default NostalBar
