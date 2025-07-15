import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';

function ProgressBarCard(props) {
    const [purcents, setPurcents] = useState([]);
    const [customStyles, setCustomStyles] = useState(null);
    useEffect(() => {
        Axios.get("/api/getMyCardsBySet/"+props.user+"/"+props.booster)
            .then(function(response) {
                setPurcents([{stade: 1, nb: response.data.filter((item) => item.stade == "1").length}, {
                    stade: 2,
                    nb: response.data.filter((item) => item.stade == "2").length
                }, {stade: 3, nb: response.data.filter((item) => item.stade == "3").length}, {
                    stade: 4,
                    nb: response.data.filter((item) => item.stade == "4").length
                }])
                setCustomStyles({
                    extBar: {
                        width: '75%',
                        backgroundColor: '#00368a',
                        position: 'relative',
                        zIndex: '1',
                        borderRadius: '50px',
                        margin: 'auto',
                        marginBottom: '50px'
                    },
                    intBar: {
                        width: parseFloat(props.getNb / props.item * 100).toFixed(2) + "%",
                        position: 'relative',
                        background: '#cecaca',
                        textWrap: 'nowrap',
                        color: 'white',
                        padding: '15px',
                        borderRadius: '50px 50px 50px 50px',
                        filter: "drop-shadow(0px 0px 6px blue)"
                    },
                    yellowBar: {
                        width: parseFloat(response.data.filter((item) => item.stade == "3").length / props.item * 100).toFixed(2) + "%",
                        position: 'absolute',
                        background: '#e5d330',
                        textWrap: 'nowrap',
                        color: 'white',
                        padding: '15px',
                        borderRadius: '50px 50px 50px 50px',
                        filter: "drop-shadow(0px 0px 6px blue)",
                        top: 0,
                        zIndex: 1
                    },
                    blueBar: {
                        width: parseFloat(response.data.filter((item) => item.stade == "2").length / props.item * 100).toFixed(2) + "%",
                        position: 'absolute',
                        background: '#81adef',
                        textWrap: 'nowrap',
                        color: 'white',
                        padding: '15px',
                        borderRadius: '50px 50px 50px 50px',
                        filter: "drop-shadow(0px 0px 6px blue)",
                        top: 0,
                        zIndex: 1
                    },
                    greenBar: {
                        width: parseFloat(response.data.filter((item) => item.stade == "1").length / props.item * 100).toFixed(2) + "%",
                        position: 'absolute',
                        background: '#40b24b',
                        textWrap: 'nowrap',
                        color: 'white',
                        padding: '15px',
                        borderRadius: '50px 50px 50px 50px',
                        filter: "drop-shadow(0px 0px 6px blue)",
                        top: 0,
                        zIndex: 1
                    },
                    rainbowBar: {
                        width: parseFloat(response.data.filter((item) => item.stade == "4").length / props.item * 100).toFixed(2) + "%",
                        position: 'absolute',
                        textWrap: 'nowrap',
                        padding: '15px',
                        borderRadius: '50px 50px 50px 50px',
                        background: "linear-gradient(90deg, red 0%, yellow 15%, lime 30%, cyan 50%, blue 65%, magenta 80%, red 100%)",
                        backgroundSize: "200%",
                        animation: "moveGradient 5s linear infinite",
                        color: "#120747",
                        letterSpacing: 0,
                        textShadow: "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff",
                        textAlign: "center",
                        top: 0,
                        zIndex: 1
                    },
                    ribbonClear: {
                        position: "absolute",
                        top: "-35px",
                        right: "-40px",
                        width: "130px"
                    },
                    ribbonUnclear: {
                        display: "none"
                    }
                })
            })
    }, []);
    return (
        customStyles &&
        <>
            <div>
                <div>
                    <div></div>
                    <p>Stade 0 : {props.getNb + " / " + props.item + "(" + parseFloat(props.getNb / props.item * 100).toFixed(2) + "%)"}</p>                </div>
                <div>
                    <div></div>
                    <p>Stade 1 : {purcents.filter((item) => item.stade == 1).nb + " / " + props.item + "(" + parseFloat(purcents.filter((item) => item.stade == 1).nb / props.item * 100).toFixed(2) + "%)"}</p>
                </div>
                <div>
                    <div></div>
                    <p>Stade 2 : {purcents.filter((item) => item.stade == 2).nb + " / " + props.item + "(" + parseFloat(purcents.filter((item) => item.stade == 2).nb / props.item * 100).toFixed(2) + "%)"}</p>
                </div>
                <div>
                    <div></div>
                    <p>Stade 3 : {purcents.filter((item) => item.stade == 3).nb + " / " + props.item + "(" + parseFloat(purcents.filter((item) => item.stade == 3).nb / props.item * 100).toFixed(2) + "%)"}</p>
                </div>
                <div>
                    <div></div>
                    <p>Stade 4 : {purcents.filter((item) => item.stade == 4).nb + " / " + props.item + "(" + parseFloat(purcents.filter((item) => item.stade == 4).nb / props.item * 100).toFixed(2) + "%)"}</p>
                </div>
            </div>
            <div style={customStyles.extBar} className="fullProgressBar">
                <div
                    style={customStyles.intBar}>{props.getNb + " / " + props.item + "(" + parseFloat(props.getNb / props.item * 100).toFixed(2) + "%)"}</div>

                {purcents.length > 0 &&
                    props.global === false &&
                    purcents.sort((a, b) => b.nb - a.nb).map((val, key) => {
                        return (
                            <div
                                style={val.stade == 4 ? customStyles.rainbowBar : val.stade == 3 ? customStyles.yellowBar : val.stade == 2 ? customStyles.blueBar : customStyles.greenBar}>{props.getNb + " / " + props.item + "(" + parseFloat(props.getNb / props.item * 100).toFixed(2) + "%)"}</div>
                        )
                    })
                }
                {props.booster &&
                    <img style={props.getNb == props.item ? customStyles.ribbonClear : customStyles.ribbonUnclear}
                         src={"/Ribbon/" + props.booster + ".png"}/>}
            </div>
        </>
    )
}

export default ProgressBarCard
