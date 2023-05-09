import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import CreateTrade from './createTrade.js';
import '../App.css'
import moment from 'moment';
import $ from 'jquery';


// function PickBox() {
//   console.log(consoles);
// }
function NostalPick(props) {
  var consoles = ["GB","GBA","GBC","MASTER SYSTEM","MEGADRIVE","N64","NDS","NES","NGC","PS1","PSP","SNES"];
  function PickBox(){
      console.log(consoles);
  }
  return(
    <>
        <div onclick={PickBox}>Test</div>
    </>
  )
}
export default NostalPick
