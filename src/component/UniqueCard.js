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
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPkm(result);
                    if(result.data.datararity == "Ultra Rare"  || result.data.datararity == "Trainer Gallery Rare Holo"  || result.data.datararity == "Special Illustration"  || result.data.datararity == "Special Illustration Rare"  || result.data.datararity == "Rare BREAK" || result.data.datararity == "Illustration Rare" || result.data.datararity == "Hyper Rare"  || result.data.datararity == "LEGEND" || result.data.datararity == "Promo" || result.data.datararity == "Rare Holo GX" || result.data.datararity == "Rare Holo V" || result.data.datararity == "Rare Holo VMAX" || result.data.datararity == "Rare Rainbow" || result.data.datararity == "Rare Secret" || result.data.datararity == "Rare Shiny GX" || result.data.datararity == "Rare Ultra"){
                        setGlow("bigImageRainbow")
                    }else if(result.data.datararity == "Classic Collection"  || result.data.datararity == "Promo"  || result.data.datararity == "Radiant Rare"  || result.data.datararity == "Double Rare"  || result.data.datararity == "Amazing Rare" || result.data.datararity == "Promo" || result.data.datararity == "Rare ACE" || result.data.datararity == "Rare Holo" || result.data.datararity == "Rare Holo Star" || result.data.datararity == "Rare Holo LV.X" || result.data.datararity == "Rare Holo" || result.data.datararity == "Rare Holo EX" || result.data.datararity == "Rare Prime" || result.data.datararity == "Rare Prism Star" || result.data.datararity == "Rare Shining" || result.data.datararity == "Rare Shiny"){
                        setGlow("bigImageGold")
                    }else if(result.data.datararity == "Rare"){
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
