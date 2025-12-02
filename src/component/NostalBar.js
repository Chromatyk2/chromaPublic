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
        if(obj.hauteur >= 100){
            document.getElementById("bar").style.height = "100%";
            if(document.getElementById("bonus").style.display != "block"){
                document.getElementById("bonus").style.display = "block";
                document.getElementById("soluce").style.display = "block";
                document.getElementById("saveState").style.display = "block";
                document.getElementById('bonusTrois').play();
            }
        }else{
            document.getElementById("bar").style.height = obj.hauteur+"%";
            if(obj.hauteur > 29 && obj.hauteur < 60){
                if(document.getElementById("soluce").style.display != "block"){
                    document.getElementById("soluce").style.display = "block";
                    document.getElementById('bonusUn').play();
                }
            }else if(obj.hauteur > 59){
                if(document.getElementById("saveState").style.display != "block"){
                    document.getElementById("soluce").style.display = "block";
                    document.getElementById("saveState").style.display = "block";
                    document.getElementById('bonusDeux').play();
                }
            }else if (obj.hauteur === 0){
                document.getElementById("soluce").style.display = "none";
                document.getElementById("saveState").style.display = "none";
                document.getElementById("bonus").style.display = "none";
            }
        }
        if(obj.achievement >= 100){
            document.getElementById("barAchievement").style.height = "100%";
            document.getElementById("trophy").style.display = "block";
            document.getElementById('bonusAchievement').play();
        }else{
            document.getElementById("barAchievement").style.height = obj.achievement+"%";
            document.getElementById("trophy").style.display = "none";
        }
    });

    window.addEventListener("Recall", (param) => {
        var obj = JSON.parse(param.detail.data)
        if(obj.recall >= 100){
            document.getElementById("bar").style.height = "100%";
            document.getElementById("bonus").style.display = "block";
            document.getElementById("soluce").style.display = "block";
            document.getElementById("saveState").style.display = "block";
        }else{
            document.getElementById("bar").style.height = obj.recall+"%";
            if(obj.recall > 29 && obj.recall < 60){
                document.getElementById("soluce").style.display = "block";
            }else if(obj.recall > 59){
                document.getElementById("soluce").style.display = "block";
                document.getElementById("saveState").style.display = "block";
            }
        }
        if(obj.achievement >= 100){
            if(document.getElementById("trophy").style.display != "block") {
                document.getElementById("barAchievement").style.height = "100%";
                document.getElementById("trophy").style.display = "block";
            }
        }else{
            document.getElementById("barAchievement").style.height = obj.achievement+"%";
            document.getElementById("trophy").style.display = "none";
        }
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
                    <i id={"soluce"} style={{display: "none", color: "white", marginTop: "4px"}}
                       className="fa-solid fa-pen-to-square"></i>
                    <i id={"saveState"} style={{display: "none", color: "white", marginTop: "4px"}}
                       className="fa-solid fa-floppy-disk"></i>
                    <i id={"bonus"} style={{display: "none", color: "white", marginTop: "4px"}}
                       className="fa-solid fa-star"></i>
                </div>
                <div className="barcontainer">
                <div id={"bar"} className="bar">
                    </div>
                    <div id={"barAchievement"} className="barAchievement">
                    </div>
                </div>
            </div>
            <audio id="bonusUn">
                <source src="sounds/powerUp.mp3" type="audio/mpeg"/>
            </audio>
            <audio id="bonusDeux">
                <source src="sounds/powerUp.mp3" type="audio/mpeg"/>
            </audio>
            <audio id="bonusTrois">
                <source src="sounds/powerUp.mp3" type="audio/mpeg"/>
            </audio>
            <audio id="bonusAchievement">
                <source src="sounds/zelda.mp3" type="audio/mpeg"/>
            </audio>
        </>
    )
}

export default NostalBar
