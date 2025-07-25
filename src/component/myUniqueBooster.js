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
    const [badges, setBadges] = React.useState(null);
    const [customStyles, setCustomStyles] = useState(null);
    const [stadeToDisplay, setStadeToDisplay] = useState(null);
    function displayPage(e) {
        var page = e.target.value;
        var nbCard = e.target.getAttribute("nbCard")
        var guruName = e.target.getAttribute("guruName")
        props.change(page,nbCard, guruName);
    }

    useEffect(() => {
            Axios.get("/api/getBadgesByUserAndSet/" + props.user + "/" + booster[0].name)
                .then(function (response) {
                    setBadges(response.data);
                })
    }, []);
    useEffect(() => {
        if(typeof badges.find((item) => item.stade === 4) !== "undefined"){
            setStadeToDisplay(4)
            setCustomStyles({
                shadow: {
                    filter : 'drop-shadow(5px 5px 4px #FF0000) \n' +
                        '        drop-shadow(5px 5px 4px #FF7F00)  \n' +
                        '        drop-shadow(5px 5px 4px #FFFF00)  \n' +
                        '        drop-shadow(5px 5px 4px #00FF00)  \n' +
                        '        drop-shadow(5px 5px 4px #0000FF)  \n' +
                        '        drop-shadow(5px 5px 4px #2E2B5F)  \n' +
                        '        drop-shadow(5px 5px 4px #8B00FF) '
                }
            })
        }else if(typeof badges.find((item) => item.stade === 3) !== "undefined"){
            setStadeToDisplay(3)
            setCustomStyles({
                shadow: {
                    filter : 'drop-shadow(0px 0px 10px orange) drop-shadow(0px 0px 0 yellow)'
                }
            })
        }else if(typeof badges.find((item) => item.stade === 2) !== "undefined"){
            setStadeToDisplay(2)
            setCustomStyles({
                shadow: {
                    filter : 'drop-shadow(0px 0px 10px lightblue) drop-shadow(0px 0px 0 white)'
                }
            })
        }else if(typeof badges.find((item) => item.stade === 1) !== "undefined"){
            setStadeToDisplay(1)
            setCustomStyles({
                shadow: {
                    filter : 'drop-shadow(0px 0px 10px green) drop-shadow(0px 0px 0 white)'
                }
            })
        }else if(typeof badges.find((item) => item.stade === 0) !== "undefined"){
            setStadeToDisplay(0)
            setCustomStyles({
                shadow: {
                    filter : 'drop-shadow(0px 0px 10px gray) drop-shadow(0px 0px 0 white)'
                }
            })
        }
    }, []);
    return (
        <>
            {badges &&
                <div
                    style={customStyles.shadow}
                    className="uniqueMyCardContainer">
                    {props.maxBooster == props.nbCard.nbCard &&
                        <img className={"done"} src={"/Ribbon/" + booster[0].name + "_"+stadeToDisplay+".png"}/>
                    }
                    <div className={"containerImgBooster"}>
                        <img className="fit-picture" src={"/Boosters/" + booster[0].name + ".png"}
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
