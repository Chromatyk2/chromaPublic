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
            <p>© 2025 Pokémon. © 1995–2025 Nintendo/Creatures Inc./GAME FREAK Inc. est une marque déposée par The Pokémon Company International, Game Freak et Nintendo</p>
            <p>© Chromatyk 2023</p>
            <p>Les images appartiennent à leur auteur respectif. Site fait par un fan pour des fans.</p><Link className="navLink mentionLink" to="/Mentions">Mentions légales</Link>
          </div>
        </>
      );
  }
export default Footer
