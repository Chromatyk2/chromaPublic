import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';

function ProgressBarCard(props) {
    const [purcents, setPurcents] = useState([]);
    Axios.get("/api/getMyCardsBySet/"+props.user+"/"+props.idBooster)
        .then(function(response){
            setPurcents([{one:response.filter((item) => item.stade == 1).length, two :response.filter((item) => item.stade == 2).length, three:response.filter((item) => item.stade == 3).length, four:response.filter((item) => item.stade == 4).length}])
        })
    const customStyles = {
    extBar: {
        width: '75%',
        backgroundColor: '#00368a',
        position: 'relative',
        zIndex: '1',
        borderRadius: '50px',
        margin:'auto',
        marginBottom: '50px'
    },
    intBar: {
        width: parseFloat(props.getNb/props.item*100).toFixed(2)+"%",
        position: 'relative',
        background: '#120747',
        textWrap: 'nowrap',
        color: 'white',
        padding: '15px',
        borderRadius: '50px 50px 50px 50px',
        filter: "drop-shadow(0px 0px 6px blue)"
    },
        rainbowBar: {
            width: parseFloat(props.getNb/props.item*100).toFixed(2)+"%",
            position: 'relative',
            textWrap: 'nowrap',
            padding: '15px',
            borderRadius: '50px 50px 50px 50px',
            background: "linear-gradient(90deg, red 0%, yellow 15%, lime 30%, cyan 50%, blue 65%, magenta 80%, red 100%)",
            backgroundSize: "200%",
            animation: "moveGradient 5s linear infinite",
            color: "#120747",
            letterSpacing:0,
            textShadow: "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff",
            textAlign:"center"
        },
        ribbonClear:{
            position: "absolute",
            top: "-35px",
            right: "-40px",
            width: "130px"
        },
        ribbonUnclear:{
            display:"none"
        }
};
console.log(purcents);
    return (
    <div style={customStyles.extBar} className="fullProgressBar">
        <div style={props.getNb == props.item ? customStyles.rainbowBar :customStyles.intBar}>{props.getNb+" / "+props.item+"("+parseFloat(props.getNb/props.item*100).toFixed(2)+"%)"}</div>
        {props.booster && <img style={props.getNb == props.item ? customStyles.ribbonClear :customStyles.ribbonUnclear} src={"/Ribbon/"+props.booster+".png"}/>}
    </div>
    )
}
export default ProgressBarCard
