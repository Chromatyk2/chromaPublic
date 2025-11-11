import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";
import $ from 'jquery';
import Modal from "react-modal";
import UniqueBoxV2 from "./uniqueBoxV2.js";
import Axios from "axios";
import OBSWebSocket, {EventSubscription} from 'obs-websocket-js';

function NostalBar(props) {
    return(
        <>
            <div id={"boxContainerId"} className="boxContainer">
                    <div className="barcontainer">
                        <div className="bar">
                        </div>
                    </div>
            </div>
        </>
    )
}

export default NostalBar
