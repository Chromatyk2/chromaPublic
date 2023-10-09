import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";
import $ from 'jquery';
import Modal from "react-modal";
import OpeningBooster from "./openingBooster";
import Axios from "axios";

function UniqueBoxV2(props) {
    return(
        <>
            <div className={"gettedBoxContainer"}>
                <img uConsole={props.consolePicked} className={"gettedBoxImg"} src={"/basicBox.png"}/>
            </div>
        </>
    )
}
export default UniqueBoxV2
