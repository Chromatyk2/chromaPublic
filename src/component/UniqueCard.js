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
                    fetch("https://pokeapi.co/api/v2/pokemon/"+result.dexId[0])
                        .then(res => res.json())
                        .then(
                            (result) => {
                                setIsLoaded(true);
                                setItems(result);
                            },
                            (error) => {
                                setIsLoaded(true);
                                setError(error);
                            }
                        )
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);
    useEffect(() => {
        if(pkm !== null){
            if(pkm.rarity == "Ultra Rare"  || pkm.rarity == "Trainer Gallery Rare Holo"  || pkm.rarity == "Special Illustration"  || pkm.rarity == "Special Illustration Rare"  || pkm.rarity == "Rare BREAK" || pkm.rarity == "Illustration Rare" || pkm.rarity == "Hyper Rare"  || pkm.rarity == "LEGEND" || pkm.rarity == "Promo" || pkm.rarity == "Rare Holo GX" || pkm.rarity == "Rare Holo V" || pkm.rarity == "Rare Holo VMAX" || pkm.rarity == "Rare Rainbow" || pkm.rarity == "Rare Secret" || pkm.rarity == "Rare Shiny GX" || pkm.rarity == "Rare Ultra"){
                setGlow("bigImageRainbow")
            }else if(pkm.rarity == "Classic Collection"  || pkm.rarity == "Promo"  || pkm.rarity == "Radiant Rare"  || pkm.rarity == "Double Rare"  || pkm.rarity == "Amazing Rare" || pkm.rarity == "Promo" || pkm.rarity == "Rare ACE" || pkm.rarity == "Rare Holo" || pkm.rarity == "Rare Holo Star" || pkm.rarity == "Rare Holo LV.X" || pkm.rarity == "Rare Holo" || pkm.rarity == "Rare Holo EX" || pkm.rarity == "Rare Prime" || pkm.rarity == "Rare Prism Star" || pkm.rarity == "Rare Shining" || pkm.rarity == "Rare Shiny"){
                setGlow("bigImageGold")
            }else{
                setGlow("bigImageRare")
            }
        }
    }, [pkm]);
    function errorImage(e){
        e.target.onerror = null;
        e.target.src = "https://images.pokemoncard.io/images/"+props.idBooster+"/"+props.cardId+".png";
    }
    console.log(pkm);
        return (
            <>
                {pkm.supertype == "Pokémon" ?
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
