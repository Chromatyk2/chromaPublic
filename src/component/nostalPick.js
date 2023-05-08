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
    <>
      <div>
        <h1 id="greenTitle">NOSTAL<br/>PICK</h1>
        <h1 id="pinkTitle">NOSTAL<br/>PICK</h1>
        <object style={{position:"absolute",top:"50px",zIndex:"-2",left: "1130px"}} data="télécharger.svg" width="150" height="300"> </object>
      </div>
      <div id="one boxContainer" className="button2">
        <p className="nbBox">1</p>
        <object data="télécharger.svg" width="150" height="300"> </object>
        <button type="button" className="button2 box closed"></button>
      </div>
    </>
  )
}
export default NostalPick
