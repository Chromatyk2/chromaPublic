import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";
import $ from 'jquery';
import Modal from "react-modal";
import UniqueBoxV2 from "./uniqueBoxV2.js";
import Axios from "axios";
import OBSWebSocket, {EventSubscription} from 'obs-websocket-js';

function DonationBox(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [pickConsole, setPickConsole] = React.useState("null");
    const [randomConsoles, setRandomConsoles] = React.useState(null);
    useEffect(() => {
        var consoles = ["GBA","GBC","MEGADRIVE","N64","NDS","NGC","PS1","PSP","SNES","NES","MASTER SYSTEM"];
        setRandomConsoles(consoles.sort(() => Math.random() - 0.5));
    }, []);
    const customStyles = {
        content: {
            position:'initial',
            border: 'none',
            background: 'transparent!important',
            borderRadius: '4px',
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', overflow:'hidden'
        },
        textModal: {
            fontSize:'30px',
            textAlign:'center'
        },
    };
    function openModal(e) {
        var uConsole = e.target.getAttribute("uConsole");
        var buttonClick = document.getElementById("buttonBox");
        setPickConsole(uConsole);
        buttonClick.classList.toggle("getBox");
        setTimeout(function() { //Start the timer
            setIsOpen(true);
            document.getElementById("boxContainerId").style.visibility = "hidden";
        }.bind(this), 800)
    }
    function handleState() {
        setIsOpen(false);
        document.getElementById("boxContainerId").style.visibility = "visible";
    }
    return(
        <>
            <div id={"boxContainerId"} className="boxContainer">
                    {randomConsoles &&
                        <button id={"buttonBox"} onClick={openModal} className={"uniqueBoxContainerDonation"}>
                            <img uConsole={randomConsoles[Math.floor(Math.random() * randomConsoles.length)]}
                                 className={"imgBox"} src={"/basic.png"}/>
                        </button>
                    }
            </div>
            <Modal overlayClassName={"OverlayNostal"} isOpen={modalIsOpen} style={customStyles.content} contentLabel="Example Modal" id={"modalBoxNostal"}>
                    <UniqueBoxV2 consolePicked = {pickConsole} change={handleState} />
                </Modal>
        </>
    )
}
export default DonationBox
