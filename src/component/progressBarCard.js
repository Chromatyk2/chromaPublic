import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';

function ProgressBarCard(props) {
    return (
    <div className="fullProgressBar">
        <div>{props.item.cardCount.total}</div>
    </div>
    )
}
export default ProgressBarCard
