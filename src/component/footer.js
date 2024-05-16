import React,{useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import CreateTrade from './createTrade.js';
import NbProposition from './nbProposition.js';
import '../App.css'
import moment from 'moment';

function Footer(props) {
      return (
        <>
          <div className={"footerContainer"}>
            <p>©StreamOnForKids</p>
              <p>Site développé par <a href={"https://twitch.tv/chromatyk"}>Chromatyk</a></p>
          </div>
        </>
      );
  }
export default Footer
