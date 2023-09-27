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
                    console.log(result);
                    if(result.rarity == "Ultra Rare"  || result.rarity == "Trainer Gallery Rare Holo"  || result.rarity == "Special Illustration"  || result.rarity == "Special Illustration Rare"  || result.rarity == "Rare BREAK" || result.rarity == "Illustration Rare" || result.rarity == "Hyper Rare"  || result.rarity == "LEGEND" || result.rarity == "Promo" || result.rarity == "Rare Holo GX" || result.rarity == "Rare Holo V" || result.rarity == "Rare Holo VMAX" || result.rarity == "Rare Rainbow" || result.rarity == "Rare Secret" || result.rarity == "Rare Shiny GX" || result.rarity == "Rare Ultra"){
                        setGlow("bigImageRainbow")
                    }else if(result.rarity == "Classic Collection"  || result.rarity == "Promo"  || result.rarity == "Radiant Rare"  || result.rarity == "Double Rare"  || result.rarity == "Amazing Rare" || result.rarity == "Promo" || result.rarity == "Rare ACE" || result.rarity == "Rare Holo" || result.rarity == "Rare Holo Star" || result.rarity == "Rare Holo LV.X" || result.rarity == "Rare Holo" || result.rarity == "Rare Holo EX" || result.rarity == "Rare Prime" || result.rarity == "Rare Prism Star" || result.rarity == "Rare Shining" || result.rarity == "Rare Shiny"){
                        setGlow("bigImageGold")
                    }else if(result.rarity == "Rare"){
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
