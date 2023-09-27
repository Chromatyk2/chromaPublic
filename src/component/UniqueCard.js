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
                    if(result.data.rarity == "Ultra Rare"  || result.data.rarity == "Trainer Gallery Rare Holo"  || result.data.rarity == "Special Illustration"  || result.data.rarity == "Special Illustration Rare"  || result.data.rarity == "Rare BREAK" || result.data.rarity == "Illustration Rare" || result.data.rarity == "Hyper Rare"  || result.data.rarity == "LEGEND" || result.data.rarity == "Promo" || result.data.rarity == "Rare Holo GX" || result.data.rarity == "Rare Holo V" || result.data.rarity == "Rare Holo VMAX" || result.data.rarity == "Rare Rainbow" || result.data.rarity == "Rare Secret" || result.data.rarity == "Rare Shiny GX" || result.data.rarity == "Rare Ultra"){
                        setGlow("bigImageRainbow")
                    }else if(result.data.rarity == "Classic Collection"  || result.data.rarity == "Promo"  || result.data.rarity == "Radiant Rare"  || result.data.rarity == "Double Rare"  || result.data.rarity == "Amazing Rare" || result.data.rarity == "Promo" || result.data.rarity == "Rare ACE" || result.data.rarity == "Rare Holo" || result.data.rarity == "Rare Holo Star" || result.data.rarity == "Rare Holo LV.X" || result.data.rarity == "Rare Holo" || result.data.rarity == "Rare Holo EX" || result.data.rarity == "Rare Prime" || result.data.rarity == "Rare Prism Star" || result.data.rarity == "Rare Shining" || result.data.rarity == "Rare Shiny"){
                        setGlow("bigImageGold")
                    }else if(result.data.rarity == "Rare"){
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
