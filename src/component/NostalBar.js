import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";
import $ from 'jquery';
import Modal from "react-modal";
import UniqueBoxV2 from "./uniqueBoxV2.js";
import Axios from "axios";
import OBSWebSocket, {EventSubscription} from 'obs-websocket-js';

function NostalBar(props) {
    const [JouerBonusTrois, setJouerBonusTrois] = useState(1);
    const [JouerBonusDeux, setJouerBonusDeux] = useState(1);
    const [JouerBonusUn, setJouerBonusUn] = useState(1);
    window.addEventListener("Hauteur", (param) => {
        var obj = JSON.parse(param.detail.data)
        if(obj.recall > 0) {
            document.getElementById("bar").style.height = obj.recall+"%";
            if(obj.hauteur >= 100){
                document.getElementById("bar").style.height = "100%";
                document.getElementById("bonus").style.display = "block";
                document.getElementById("soluce").style.display = "block";
                document.getElementById("saveState").style.display = "block";
            }else{
                document.getElementById("bar").style.height = obj.hauteur+"%";
                if(obj.hauteur > 29 && obj.hauteur < 60){
                    document.getElementById("soluce").style.display = "block";
                }else if(obj.hauteur > 59){
                    document.getElementById("soluce").style.display = "block";
                    document.getElementById("saveState").style.display = "block";
                }
            }
        }
        if(obj.hauteur >= 100){
            document.getElementById("bar").style.height = "100%";
            document.getElementById("bonus").style.display = "block";
            document.getElementById("soluce").style.display = "block";
            document.getElementById("saveState").style.display = "block";
            if(JouerBonusTrois > 0){
                setJouerBonusTrois(0)
                document.getElementById('rainbowWin').play();
            }
        }else{
            document.getElementById("bar").style.height = obj.hauteur+"%";
            if(obj.hauteur > 29 && obj.hauteur < 60){
                document.getElementById("soluce").style.display = "block";
                if(JouerBonusUn > 0){
                    setJouerBonusUn(0)
                    document.getElementById('rainbowWin').play();
                }
            }else if(obj.hauteur > 59){
                document.getElementById("soluce").style.display = "block";
                document.getElementById("saveState").style.display = "block";
                if(JouerBonusDeux > 0){
                    setJouerBonusDeux(0)
                    document.getElementById('rainbowWin').play();
                }
            }else if (obj.hauteur === 0){
                setJouerBonusDeux(1)
                setJouerBonusUn(1)
                setJouerBonusTrois(1)
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
                <source src="sounds/powerUp.mp3" type="audio/mpeg"/>
            </audio>
        </>
    )
}

export default NostalBar
