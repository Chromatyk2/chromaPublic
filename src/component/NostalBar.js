import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";
import $ from 'jquery';
import Modal from "react-modal";
import UniqueBoxV2 from "./uniqueBoxV2.js";
import Axios from "axios";
import OBSWebSocket, {EventSubscription} from 'obs-websocket-js';

function NostalBar(props) {
    const [JouerBonusTrois, setJouerBonusTrois] = useState(true);
    const [JouerBonusDeux, setJouerBonusDeux] = useState(true);
    const [JouerBonusUn, setJouerBonusUn] = useState(true);
    window.addEventListener("Hauteur", (param) => {
        var obj = JSON.parse(param.detail.data)
        if(obj.recall > 0) {
            document.getElementById("bar").style.height = "0%";
        }
        if(obj.hauteur >= 100){
            document.getElementById("bar").style.height = "100%";
            document.getElementById("bonus").style.display = "block";
            document.getElementById("soluce").style.display = "block";
            document.getElementById("saveState").style.display = "block";
            if(JouerBonusTrois === true){
                setJouerBonusTrois(false)
                $('audio#rainbowWin')[0].pause();
                $('audio#rainbowWin')[0].currentTime = 0;
            }
        }else{
            document.getElementById("bar").style.height = obj.hauteur+"%";
            if(obj.hauteur > 29){
                document.getElementById("soluce").style.display = "block";
                if(JouerBonusUn === true){
                    setJouerBonusUn(false)
                    $('audio#rainbowWin')[0].pause();
                    $('audio#rainbowWin')[0].currentTime = 0;
                }
            }else if(obj.hauteur > 59){
                document.getElementById("soluce").style.display = "block";
                document.getElementById("saveState").style.display = "block";
                if(JouerBonusDeux === true){
                    setJouerBonusDeux(false)
                    $('audio#rainbowWin')[0].pause();
                    $('audio#rainbowWin')[0].currentTime = 0;
                }
            }else if (obj.hauteur == 0){
                setJouerBonusDeux(true)
                setJouerBonusUn(true)
                setJouerBonusTrois(true)
            }else
            {
                document.getElementById("soluce").style.display = "none";
                document.getElementById("saveState").style.display = "none";
                document.getElementById("bonus").style.display = "none";
            }
        }
    });
    return(
        <>
            <div id={"boxContainerId"} className="boxContainer">
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    position: "absolute",
                    top: "200px",
                    left: "470px"
                }}>
                    <i id={"soluce"} style={{display: "none", color: "white", marginLeft: "-6px", marginTop: "4px"}}
                       className="fa-solid fa-pen-to-square"></i>
                    <i id={"saveState"} style={{display: "none", color: "white", marginLeft: "-6px", marginTop: "4px"}}
                       className="fa-solid fa-floppy-disk"></i>
                    <i id={"bonus"} style={{display: "none", color: "white", marginLeft: "-6px", marginTop: "4px"}}
                       className="fa-solid fa-pencil"></i>
                </div>
                <div className="barcontainer">
                    <div id={"bar"} className="bar">
                    </div>
                </div>
            </div>
            <audio id="rainbowWin">
                <source src="sounds/RainbowWin.mp3" type="audio/mpeg"/>
            </audio>
        </>
    )
}

export default NostalBar
