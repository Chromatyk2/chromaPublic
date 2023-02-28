import React,{useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'

function PkmList(props) {
    return (
      <>
        <div className="stats">
          <p className="labelStats">Shiny : <span className="valueStats">{nbShiny}</span></p>
          <p className="labelStats">Total : <span className="valueStats">{nbTotal}</span></p>
        </div>
        <div className="pokemonGlobalContainer">
          <Pagination
            itemsPerPage={25}
            items={props.list}
          />
          </div>
        </>
     );
}


export default PkmList
