import React,{useState, useEffect} from 'react';
import { Cookies, useCookies } from 'react-cookie';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'

function NostalPick(props) {
const [list,setList] = useState([]);
const pseudo = props.cookies.user.data[0].login;
    return (
      <>
        <div id="odds">
          <p style="font-weight:bold;text-align:center">Taux :</p>
          <p style="font-weight:bold;color:green">Rare : 75% (1 Pokemon Random)</p>
          <p style="font-weight:bold;color:purple">Epic : 25% (1 Pokemon Taux Shiny x 2)</p>
          <p style="font-weight:bold;color:orange">Légendaire : 5% (1 Pokemon Légendaire)</p>
          <p class="rainbow-text" style="font-weight:bold;color:rgba(0,0,0,0.3)">Mythique : 0.5% (1 Pokemon Shiny)</p>
        </div>
      </>
    )
}

export default NostalPick
