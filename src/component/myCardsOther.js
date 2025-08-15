import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import MyCardsSet from './myCardSet.js';
import MyUniqueBooster from "./myUniqueBooster";
import ProgressBarCard from "./progressBarCard";
import OtherMyCardsSet from "./myCardSetOther";

function OtherMyCards(props) {
    const [nbCards, setNbCards] = useState(null);
    const [nbCard, setNbCard] = useState(null);
    const [totalCard, setTotalCard] = useState(null);
    const [totalCardUser, setTotalCardUser] = useState(null);
    const [boosterList, setBoosterList] = useState(null);
    const [page, setPage] = useState(null);
    const [guruName, setGuruName] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [powder,setPowder] = useState(0);
    const [badges,setBadges] = useState(null);
    function displayPage(e,f,g,h) {
        setPage(e);
        setNbCard(f);
        setGuruName(g);
        setFullName(h);
    }
    function backPage() {
        setPage(null)
    }
    useEffect(() => {
        Axios.get("/api/getBadgesByUser/"+props.user)
            .then(function(response){
                setBadges(response.data)
                Axios
                    .get("/api/getNbCards/"+props.user)
                    .then(function(response){
                        setNbCards(response.data);
                        let sum = (response.data.reduce(function(prev, current) {
                            return prev + +current.nbCard
                        }, 0));
                        setTotalCardUser(sum);
                        Axios.get("/api/getBoosterTotalCard")
                            .then(function(response){
                                setBoosterList(response.data);
                                let sumBooster = (response.data.reduce(function(prev, current) {
                                    return prev + +current.totalCards
                                }, 0));
                                setTotalCard(sumBooster);
                                Axios.get("/api/getProfil/"+props.user)
                                    .then(function(response) {
                                        setPowder(response.data[0].powder)
                                    })
                            })
                    })
         })
    }, [])
    return (
        <>
            {totalCard &&
                !page &&
                <>
                    <ProgressBarCard getNb={totalCardUser} item={totalCard} global={true}/>
                </>
            }
            <div id={"cardsContainer"}>
                {totalCard &&
                page ?
                    <>
                        <button style={{color: "white", width: "100%", margin: "0", padding: "0", marginTop: "30px"}}
                                onClick={backPage} className="backButton">Retour
                        </button>
                        <OtherMyCardsSet badges={badges} myPseudo={props.myPseudo} powder={powder} user={props.user} card={nbCard} idBooster={page}
                                    guruName={guruName}/>
                    </>
                    :
                    nbCards &&
                    totalCard &&
                    nbCards.sort((a, b) => b.nbCard - a.nbCard).map((val, key) => {
                        return (
                            <MyUniqueBooster badges={badges} user={props.user} page={val.booster} change={displayPage} nbCard={val}
                                             boosterList={boosterList}
                                             maxBooster={typeof boosterList.find((uc) => uc.name == val.booster) === "undefined" ? boosterList.find((uc) => uc.nameGuru == "sm3.5" ? "sm35" : uc.nameGuru == val.booster).totalCards
                                                 : boosterList.find((uc) => uc.name == val.booster).totalCards}/>
                        )
                    })
                }
            </div>
        </>
    )
}

export default OtherMyCards
