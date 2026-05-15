import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'
import $ from "jquery";

function LastBangerAlert(props) {
    const [lastCardData, setLastCardData] = useState(null);
    const [lastCardUser, setLastCardUser] = useState(null);
    const [newLastCardData, setNewLastCardData] = useState(null);
    const [newLastCardUser, setNewLastCardUser] = useState(null);
    const [newCard, setNewCard] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
            setInterval(() => {
                Axios.get("/api/getLastCard/")
                    .then(function(response){
                        setNewLastCardUser(response.data[0]);
                        setNewLastCardData(response.data[0]);
                    })
            }, 60000)
    }, []);

    useEffect(() => {
        if(newLastCardData != null){
            if(lastCardUser == null){
                if(newLastCardUser.stade == 3){
                }else if(newLastCardUser.stade == 4){
                    $('audio#omglebanger')[0].play()
                }
                setLastCardUser(newLastCardUser);
                document.getElementById("lastBangerContainer").style.animation = "bounceLastBangerAlert 9s forwards";
                setTimeout(() => {
                    setNewLastCardData(null);
                }, 9000);
            }else if(lastCardUser.user !== newLastCardUser.user || lastCardUser.card !== newLastCardUser.card){
                    if(newLastCardUser.stade == 3){
                    }else if(newLastCardUser.stade == 4){
                        $('audio#omglebanger')[0].play()
                    }
                    setLastCardUser(newLastCardUser);
                    document.getElementById("lastBangerContainer").style.animation = "bounceLastBangerAlert 9s forwards";
                    setTimeout(() => {
                        setNewLastCardData(null);
                    }, 9000);
            }else{

                setNewLastCardUser(null);
                setNewLastCardData(null);
            }
        }
    }, [newLastCardData])
    function errorImage(e){
        e.target.onerror = null;
        e.target.src = "https://assets.tcgdex.net/en/"+e.target.getAttribute("block")+"/"+e.target.getAttribute("booster")+"/"+e.target.getAttribute("number")+"/high.png";
    }
    return (
        <>
            {newLastCardData &&
                <div id={"lastBangerContainer"} className={"lastBangerContainer"}>
                    <p className={"lastCardUsername"}>{newLastCardUser.user}</p>
                    <div className="cardBangerAlert">
                        {
                        newLastCardData.booster.startsWith("sv") === true ?
                            <img onError={errorImage} number={newLastCardData.number} block={newLastCardData.block}
                                 booster={newLastCardData.booster} className={"shadowBangerCard"}
                                 style={{width: "350px", filter: "brightness(0.8)"}}
                                 src={"https://assets.tcgdex.net/en/" + newLastCardData.block + "/" + newLastCardData.booster + "/" + newLastCardData.number.toString().padStart(3, '0') + "/high.png"}/>

                        :
                            <img onError={errorImage} number={newLastCardData.number} block={newLastCardData.block}
                                 booster={newLastCardData.booster} className={"shadowBangerCard"}
                                 style={{width:"350px",filter:"brightness(0.8)"}}
                                 src={"https://assets.tcgdex.net/en/"+newLastCardData.block+"/"+newLastCardData.booster+"/"+newLastCardData.number+"/high.png"}/>

                        }
                    </div>
                </div>
            }
            <audio id="pasmal">
                <source src="sounds/pasmal.mp3" type="audio/mpeg"/>
            </audio>
            <audio id="omglebanger">
                <source src="sounds/omglebanger.mp3" type="audio/mpeg"/>
            </audio>
        </>
    )
}

export default LastBangerAlert
