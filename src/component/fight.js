import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";
import moment from "moment/moment";
import card from "../cards.png"
import $ from 'jquery';
function Fight() {
    return (
        <div className={"fightContainer"}>
            <img src={"/fight.jpg"} style={{width: "100%"}}/>
        </div>
    );
}

export default Fight
