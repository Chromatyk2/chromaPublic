import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";
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
            {profil.length > 0 ?
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
                </div>
                :

                <div className={"contentContainer"}>
                    <p>Capture ton premier pokémon pour débuter ton profil !</p>
                    <p>Pour ça, rendez-vous sur le stream de <a href={"twitch.tv/chromatyk"} target={"_blank"}>Chromatyk</a> quand il est en live !</p>
                </div>
            }
        </>
    );
}

export default Profil
