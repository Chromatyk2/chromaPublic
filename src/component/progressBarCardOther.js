import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import {Tooltip} from "react-tooltip";
import PokedexTeam from "./pokedexTeam";
import Modal from "react-modal";
import $ from "jquery";

function OtherProgressBarCard(props) {
    const [purcents, setPurcents] = useState([]);
    const [customStyles, setCustomStyles] = useState(null);
    const [badges, setBadges] = useState(null);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [badgeToWinStade, setBadgeToWinStade] = React.useState(null);
    const [boosterName, setBoosterName] = React.useState(null);
    useEffect(() => {
            Axios.get("/api/getMyCardsBySet/"+props.user+"/"+props.booster)
                .then(function(response) {

                    Axios.get("/api/getMyCardsBySetAndStade/"+props.user+"/"+props.booster)
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
                                    zIndex: 1,
                                    height:"100%"
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
                                    zIndex: 1,
                                    height:"100%"
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
                                    zIndex: 1,
                                    height:"100%"
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
                                    zIndex: 1,
                                    height:"100%"
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
                            Axios.get("/api/getBadgesByUserAndSet/"+props.user+"/"+props.booster)
                                .then(function(response) {
                                    setBadges(response.data);
                                })
                        })
                })

    }, []);
    return (
        customStyles &&
            purcents.length > 0 &&
            <>
                <div style={{color: "white",display: "flex",gap: "5px",flexWrap: "wrap",justifyContent: "center"}}>
                    {purcents.length > 0 &&
                        props.global === false &&
                        purcents.sort((a, b) => a.nb - b.nb).map((val, key) => {
                            return (
                                <div style={{width: "260px", justifyContent: "center", display: "flex", alignItems: "baseline", gap: "5px"}}>
                                    <div style={{ width: "10px", height: "10px", background: val.stade == 1 ? "#40b24b" : val.stade == 2 ? "#81adef" : val.stade == 3 ? "#e5d330" : "linear-gradient(\n" +
                                            "        90deg,\n" +
                                            "        rgba(255, 0, 0, 1) 0%,\n" +
                                            "        rgba(255, 154, 0, 1) 10%,\n" +
                                            "        rgba(208, 222, 33, 1) 20%,\n" +
                                            "        rgba(79, 220, 74, 1) 30%,\n" +
                                            "        rgba(63, 218, 216, 1) 40%,\n" +
                                            "        rgba(47, 201, 226, 1) 50%,\n" +
                                            "        rgba(28, 127, 238, 1) 60%,\n" +
                                            "        rgba(95, 21, 242, 1) 70%,\n" +
                                            "        rgba(186, 12, 248, 1) 80%,\n" +
                                            "        rgba(251, 7, 217, 1) 90%,\n" +
                                            "        rgba(255, 0, 0, 1) 100%\n" +
                                            "    )"}}></div>
                                    <p>Stade {val.stade} : {purcents.find((item) => item.stade == val.stade).nb + " / " + props.item + "(" + parseFloat(purcents.find((item) => item.stade == val.stade).nb / props.item * 100).toFixed(2) + "%)"}</p>
                                </div>
                            )
                        })
                    }
                    {purcents.length > 0 &&
                        props.global === false &&
                        <div style={{display: "flex", alignItems: "baseline", gap: "5px"}}>
                            <div style={{width: "10px", height: "10px", background: "#cecaca"}}></div>
                            <p>Global
                                : {props.getNb + " / " + props.item + "(" + parseFloat(props.getNb / props.item * 100).toFixed(2) + "%)"}</p>
                        </div>
                    }
                </div>
                <div style={customStyles.extBar} className="fullProgressBar">
                    <div
                        style={customStyles.intBar}>{props.getNb + " / " + props.item + "(" + parseFloat(props.getNb / props.item * 100).toFixed(2) + "%)"}</div>

                    {purcents.length > 0 &&
                        props.global === false &&
                        purcents.sort((a, b) => b.nb - a.nb).map((val, key) => {
                            return (
                                <div
                                    style={val.stade == 4 ? customStyles.rainbowBar : val.stade == 3 ? customStyles.yellowBar : val.stade == 2 ? customStyles.blueBar : customStyles.greenBar}>{props.global === true && props.getNb + " / " + props.item + "(" + parseFloat(props.getNb / props.item * 100).toFixed(2) + "%)"}</div>
                            )
                        })
                    }
                </div>
            </>
    )
}

export default OtherProgressBarCard
