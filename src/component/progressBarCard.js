import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';

function ProgressBarCard(props) {
    console.log(props.item.items.cardCount.total);
    return (
    <div className="fullProgressBar">
        <div>{props.getNb+" / "+props.item.items.cardCount.total+"("+parseFloat(props.getNb/props.item.items.cardCount.total*100).toFixed(2)+"%)"}</div>
    </div>
    )
}
export default ProgressBarCard
