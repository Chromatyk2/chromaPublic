import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";
import $ from 'jquery';
import Modal from "react-modal";
import UniqueBoxV2 from "./uniqueBoxV2.js";
import Axios from "axios";
import OBSWebSocket, {EventSubscription} from 'obs-websocket-js';

function NostalBar() {
    window.addEventListener("Hauteur", (param) => {
        var obj = JSON.parse(param.detail.data)
        if(obj.achievement >= 100){
            if(document.getElementById("trophy").style.display != "block") {
                document.getElementById("barAchievement").style.height = "100%";
                document.getElementById("trophy").style.display = "block";
                document.getElementById('bonusAchievement').play();
            }
        }else{
            document.getElementById("barAchievement").style.height = obj.achievement+"%";
            document.getElementById("trophy").style.display = "none";
        }
    });

    window.addEventListener("Recall", (param) => {
        var obj = JSON.parse(param.detail.data)
        if(obj.achievement >= 100){
            if(document.getElementById("trophy").style.display != "block"){
            document.getElementById("barAchievement").style.height = "100%";
            document.getElementById("trophy").style.display = "block";
            }
        }else{
            document.getElementById("barAchievement").style.height = obj.achievement+"%";
            document.getElementById("trophy").style.display = "none";
        }
    });
    window.addEventListener("Reset", (param) => {
        document.getElementById("barAchievement").style.height = "0%";
        document.getElementById("trophy").style.display = "none";
    });
    return(
        <>
            <div id={"boxContainerId"} className="boxContainer">
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    position: "absolute",
                    top: "170px",
                    left: "455px",
                    flexWrap:"wrap",
                    width:"103px"
                }}>
                    <i id={"trophy"} className="fa-solid fa-trophy" style={{display: "none", color: "#FFD43B",width:"100%",textAlign:"center"}}></i>
                </div>
                <div className="barcontainer">
                    <div id={"barAchievement"} className="barAchievement">
                    </div>
                </div>
            </div>
            <audio id="bonusAchievement">
                <source src="sounds/zelda.mp3" type="audio/mpeg"/>
            </audio>
        </>
    )
}

export default NostalBar
