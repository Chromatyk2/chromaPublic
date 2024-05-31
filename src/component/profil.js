import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";
import moment from "moment/moment";
function Profil(props) {
    const pseudo = props.cookies.user.data[0].login;
    const [profil, setProfil] = useState(null);
    useEffect(() => {
        Axios
            .get("/api/getProfil/"+pseudo)
            .then(function(response){
                setProfil(response.data);
            })
    }, [])

        const customStyles = {
            extBar: {
                backgroundColor: '#fc72a1',
                position: 'relative',
                zIndex: '1',
                borderRadius: '50px',
                margin:'auto',
                marginBottom: '15px',
                height:'30px',
                width:'300px'
            }
        };
    return (
        <>
            {profil &&
                profil.length > 0 ?
                <div className={"contentContainer"}>
                    <p className={"pseudoProfil"}>{profil[0].pseudo}</p>
                    <p className={"levelProfil"}>Niveau {profil[0].level}</p>
                    <div style={customStyles.extBar} className="fullProgressBar">
                        <div
                            style={{
                                width: parseFloat(profil[0].xp / (profil[0].level * 1000) * 100).toFixed(2) + "%",
                                position: 'relative',
                                background: '#74fbcf',
                                textWrap: 'nowrap',
                                color: 'black',
                                borderRadius: '50px 0 0 50px',
                                height: '30px'
                            }}>
                        </div>
                        <div className={"pourcentLevel"}>
                            {profil[0].xp + " / " + profil[0].level * 1000 + "(" + parseFloat(profil[0].xp / (profil[0].level * 1000) * 100).toFixed(2) + "%)"}
                        </div>
                    </div>
                    <div className={"titleTeam"}>
                        <p>Team</p>
                    </div>
                    <div className={"profilVisuals"}>
                        <div className={"profilPicture"}>
                            {profil[0].profil_picture ?
                                <img src={"/images/trainer/Trainer ("+profil[0].profil_picture+").png"}/>
                                :
                                <img src={"/images/random.png"} />
                            }
                        </div>
                        <div className={"profilTeam"}>
                            <div className="anchorTooltip uniquePokemonContainer">
                                {profil[0].first_pokemon ?
                                    <img src={profil[0].first_pokemon}/>
                                    :
                                    <img src={"/images/random.png"} />
                                }
                            </div>
                            <div className="anchorTooltip uniquePokemonContainer">
                                {profil[0].second_pokemon ?
                                    <img src={profil[0].second_pokemon}/>
                                    :
                                    <img src={"/images/random.png"} />
                                }
                            </div>
                            <div className="anchorTooltip uniquePokemonContainer">
                                {profil[0].third_pokemon ?
                                    <img src={profil[0].third_pokemon}/>
                                    :
                                    <img src={"/images/random.png"} />
                                }
                            </div>
                            <div className="anchorTooltip uniquePokemonContainer">
                                {profil[0].fourth_pokemon ?
                                    <img src={profil[0].fourth_pokemon}/>
                                    :
                                    <img src={"/images/random.png"} />
                                }
                            </div>
                            <div className="anchorTooltip uniquePokemonContainer">
                                {profil[0].fifth_pokemon ?
                                    <img src={profil[0].fifth_pokemon}/>
                                    :
                                    <img src={"/images/random.png"} />
                                }
                            </div>
                            <div className="anchorTooltip uniquePokemonContainer">
                                {profil[0].sixth_pokemon ?
                                    <img src={profil[0].sixth_pokemon}/>
                                    :
                                    <img src={"/images/random.png"} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className={"contentContainer"}>
                    <p className={"pseudoProfil"}>Capture ton premier pokémon pour débuter ton profil !</p>
                    <p className={"pseudoProfil"}>Pour ça, rendez-vous sur le stream de <a href={"twitch.tv/chromatyk"} target={"_blank"}>Chromatyk</a> quand il est en live !</p>
                </div>
            }
        </>
    );
}

export default Profil
