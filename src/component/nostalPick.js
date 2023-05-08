import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import CreateTrade from './createTrade.js';
import '../App.css'
import moment from 'moment';

function NostalPick(props) {
  return(
    <div id="odds">
      <p style="font-weight:bold;text-align:center">Taux :</p>
      <p style="font-weight:bold;color:green">Rare : 75% (1 Pokemon Random)</p>
      <p style="font-weight:bold;color:purple">Epic : 25% (1 Pokemon Taux Shiny x 2)</p>
      <p style="font-weight:bold;color:orange">Légendaire : 5% (1 Pokemon Légendaire)</p>
      <p class="rainbow-text" style="font-weight:bold;color:rgba(0,0,0,0.3)">Mythique : 0.5% (1 Pokemon Shiny)</p>
    </div>
  )
}
export default NostalPick
