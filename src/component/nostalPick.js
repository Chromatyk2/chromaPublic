import React,{useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import Axios from 'axios';
import '../App.css';
import UniqueBox from "./UniqueBox";
import moment from 'moment';
import $ from 'jquery';

function NostalPick(props) {
  var consoles = ["GB","GBA","GBC","MASTER SYSTEM","MEGADRIVE","N64","NDS","NES","NGC","PS1","PSP","SNES"];
  function PickBox(){
      console.log(consoles);
  }
  for (var i = 0; i<= 8;i++){
      return(
          <>
            <UniqueBox/>
          </>
      )
  }
}
export default NostalPick
