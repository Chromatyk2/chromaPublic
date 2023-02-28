import React,{useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'

function PkmList(props) {
    return (
      <>
          <Pagination
            itemsPerPage={30}
            items={props.list}
          />
        </>
     );
}


export default PkmList
