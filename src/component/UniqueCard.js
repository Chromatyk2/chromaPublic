import React,{useState, useEffect} from 'react';
import '../App.css'

function UniqueCard(props) {
    const [items, setItems] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [tenCards, setTenCards] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(true);
    const [pkm, setPkm] = React.useState(null);
    let [state, setState] = useState("Initial");
    const [glow, setGlow] = React.useState(null);
    const customStyles = {
        content: {
            position: 'relative',
            bottom: '107px',
            zIndex: 1,
            fontSize: '100px',
            height: 'inherit',
            right: '-7px'
        },
        image: {
            width:'100%'
        }
    };
    useEffect(() => {
        fetch("https://api.pokemontcg.io/v2/cards/"+props.cardId)
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPkm(result);
                    console.log(result.data);
                    if(result.datararity == "Ultra Rare"  || result.datararity == "Trainer Gallery Rare Holo"  || result.datararity == "Special Illustration"  || result.datararity == "Special Illustration Rare"  || result.datararity == "Rare BREAK" || result.datararity == "Illustration Rare" || result.datararity == "Hyper Rare"  || result.datararity == "LEGEND" || result.datararity == "Promo" || result.datararity == "Rare Holo GX" || result.datararity == "Rare Holo V" || result.datararity == "Rare Holo VMAX" || result.datararity == "Rare Rainbow" || result.datararity == "Rare Secret" || result.datararity == "Rare Shiny GX" || result.datararity == "Rare Ultra"){
                        setGlow("bigImageRainbow")
                    }else if(result.datararity == "Classic Collection"  || result.datararity == "Promo"  || result.datararity == "Radiant Rare"  || result.datararity == "Double Rare"  || result.datararity == "Amazing Rare" || result.datararity == "Promo" || result.datararity == "Rare ACE" || result.datararity == "Rare Holo" || result.datararity == "Rare Holo Star" || result.datararity == "Rare Holo LV.X" || result.datararity == "Rare Holo" || result.datararity == "Rare Holo EX" || result.datararity == "Rare Prime" || result.datararity == "Rare Prism Star" || result.datararity == "Rare Shining" || result.datararity == "Rare Shiny"){
                        setGlow("bigImageGold")
                    }else if(result.datararity == "Rare"){
                        setGlow("bigImageRare")
                    }else{
                        setGlow("")
                    }
                    console.log(glow);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);
    function errorImage(e){
        e.target.onerror = null;
        e.target.src = "https://images.pokemoncard.io/images/"+props.idBooster+"/"+props.cardId+".png";
    }
        return (
            <>
                {pkm &&
                    pkm.category == "Pokemon" ?
                    <div className="card">
                        <div className={"wrapper "+glow}>
                            <p className={"nbCardHover"}>{"X "+props.cardNb}</p>
                            <img src={"https://images.pokemoncard.io/images/"+props.idBooster+"/"+props.cardId+"_hiresopt.jpg" } onError={errorImage}
                                 className={"cover-image "+glow}/>
                        </div>
                        <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+pkm.dexId[0]+".png"} className="character"/>
                    </div>
                    :
                    <div className="card">
                        <div className={"wrapper "+glow}>
                            <img src={"https://images.pokemoncard.io/images/"+props.idBooster+"/"+props.cardId+"_hiresopt.jpg" } onError={errorImage}
                                 className={"cover-image "+glow}/>
                        </div>
                    </div>
                }
            </>
        )
}
export default UniqueCard
