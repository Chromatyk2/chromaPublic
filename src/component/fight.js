import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";
import moment from "moment/moment";
import card from "../cards.png"
import $ from 'jquery';
function Fight(props) {
    return (
        <div className={"fightContainer"}>
            <img src={props.shiny == 1 ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/" + props.compagnon + ".png" : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/" + props.compagnon + ".png"} />
        </div>
    );
}

export default Fight
