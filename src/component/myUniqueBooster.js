import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import MyCardsSet from './myCardSet.js';
import SmallProgressBarCard from "./smallProgressBar";

function MyUniqueBooster(props) {

    const [booster, setBooster] = useState([typeof props.boosterList.find((uc) => uc.name == props.nbCard.booster) === "undefined" ? props.boosterList.find((uc) => uc.nameGuru == props.nbCard.booster) : props.boosterList.find((uc) => uc.name == props.nbCard.booster)]);
    const [customStyles, setCustomStyles] = useState(null);
    const [stadeToDisplay, setStadeToDisplay] = useState(-1);
    function displayPage(e) {
        var page = e.target.value;
        var nbCard = e.target.getAttribute("nbCard")
        var guruName = e.target.getAttribute("guruName")
        props.change(page,nbCard, guruName);
    }

    useEffect(() => {
                    if(typeof props.badges.find((item) => item.stade === 4 && item.booster == booster[0].name) !== "undefined"){
                        setStadeToDisplay(4)
                        setCustomStyles({
                            shadow: {
                                boxShadow: "-15px 15px 50px #0000ff, 15px -15px 50px #ffd700, 15px 15px 50px #fe015b, -15px -15px 50px #00ff78"
                            }
                        })
                    }else if(typeof props.badges.find((item) => item.stade === 3 && item.booster == booster[0].name) !== "undefined"){
                        setStadeToDisplay(3)
                        setCustomStyles({
                            shadow: {
                                filter : 'drop-shadow(0px 0px 10px orange) drop-shadow(0px 0px 0 yellow)'
                            }
                        })
                    }else if(typeof props.badges.find((item) => item.stade === 2 && item.booster == booster[0].name) !== "undefined"){
                        setStadeToDisplay(2)
                        setCustomStyles({
                            shadow: {
                                filter : 'drop-shadow(0px 0px 10px blue) drop-shadow(0px 0px 0 blue)'
                            }
                        })
                    }else if(typeof props.badges.find((item) => item.stade === 1 && item.booster == booster[0].name) !== "undefined"){
                        setStadeToDisplay(1)
                        setCustomStyles({
                            shadow: {
                                filter : 'drop-shadow(0px 0px 10px lightgreen) drop-shadow(0px 0px 0 lightgreen)'
                            }
                        })
                    }else if(typeof props.badges.find((item) => item.stade === 0 && item.booster == booster[0].name) !== "undefined"){
                        setStadeToDisplay(0)
                        setCustomStyles({
                            shadow: {
                                filter : 'drop-shadow(0px 0px 5px white) drop-shadow(0px 0px 0 white)'
                            }
                        })
                    }else if(!props.badges.find((item) => item.stade === 0 && item.booster == booster[0].name)){
                        setStadeToDisplay(-1)
                        setCustomStyles({
                            shadow: {
                                filter : 'drop-shadow(0px 0px 0 transparent) drop-shadow(0px 0px 0 transparent)'
                            }
                        })
                    }
    }, []);
    return (
        <>
            {customStyles &&
                <div
                    className="uniqueMyCardContainer">
                    {stadeToDisplay > -1 &&
                        <img style={{zIndex:1}} className={"done"} src={"/Ribbon/" + booster[0].name + "_"+stadeToDisplay+".png"}/>
                    }
                    <div className={"containerImgBooster"}>
                        <img style={customStyles.shadow} className="fit-picture" src={"/Boosters/" + booster[0].name + ".png"}
                             alt="Grapefruit slice atop a pile of other slices"/>
                    </div>
                    <SmallProgressBarCard getNb={props.nbCard.nbCard} item={props.maxBooster}/>
                    <button guruName={booster[0].nameGuru} value={booster[0].name} onClick={displayPage}
                            className="guessTradeButton">Voir toute mes cartes
                    </button>
                </div>
            }
        </>
)
}

export default MyUniqueBooster
