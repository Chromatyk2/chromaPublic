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
                    if(result.datadatararity == "Ultra Rare"  || result.datadatararity == "Trainer Gallery Rare Holo"  || result.datadatararity == "Special Illustration"  || result.datadatararity == "Special Illustration Rare"  || result.datadatararity == "Rare BREAK" || result.datadatararity == "Illustration Rare" || result.datadatararity == "Hyper Rare"  || result.datadatararity == "LEGEND" || result.datadatararity == "Promo" || result.datadatararity == "Rare Holo GX" || result.datadatararity == "Rare Holo V" || result.datadatararity == "Rare Holo VMAX" || result.datadatararity == "Rare Rainbow" || result.datadatararity == "Rare Secret" || result.datadatararity == "Rare Shiny GX" || result.datadatararity == "Rare Ultra"){
                        setGlow("bigImageRainbow")
                    }else if(result.datadatararity == "Classic Collection"  || result.datadatararity == "Promo"  || result.datadatararity == "Radiant Rare"  || result.datadatararity == "Double Rare"  || result.datadatararity == "Amazing Rare" || result.datadatararity == "Promo" || result.datadatararity == "Rare ACE" || result.datadatararity == "Rare Holo" || result.datadatararity == "Rare Holo Star" || result.datadatararity == "Rare Holo LV.X" || result.datadatararity == "Rare Holo" || result.datadatararity == "Rare Holo EX" || result.datadatararity == "Rare Prime" || result.datadatararity == "Rare Prism Star" || result.datadatararity == "Rare Shining" || result.datadatararity == "Rare Shiny"){
                        setGlow("bigImageGold")
                    }else if(result.datadatararity == "Rare"){
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
