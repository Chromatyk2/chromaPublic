import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'

function HomePage(props) {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

    useEffect(() => {
        const handler = e => {
            e.preventDefault();
            console.log("we are being triggered :D");
            setSupportsPWA(true);
            setPromptInstall(e);
        };
        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("transitionend", handler);
    }, []);

    function buyBoosterRandom(evt) {
        evt.preventDefault();
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
    };
    if (!supportsPWA) {
        return null;
    }
  return (
    <>
        <button
            className="link-button"
            id="setup_button"
            aria-label="Install app"
            title="Install app"
            onClick={onClick}
        >
            Install
        </button>
      <p style={{textAlign:"center"}}>Bienvenue, {props.cookies.user.data[0].login}</p>
      <div className="socialContainer">
        <p className="myNetworks">Mes reseaux</p>
        <a className="socialLink" target='_blank' href="https://discord.gg/8V6fyQdSCG"><i class="fa-brands fa-discord"></i>Discord</a>
        <a className="socialLink" target='_blank' href="https://twitch.tv/chromatyk"><i class="fa-brands fa-twitch"></i>Twitch</a>
        <a className="socialLink" target='_blank' href="https://twitter.com/Chromatyk_"><i class="fa-brands fa-twitter"></i>Twitter</a>
        <a className="socialLink" target='_blank' href="https://www.instagram.com/chromatyk_/"><i class="fa-brands fa-instagram"></i>Instagram</a>
      </div>
    </>
  )
}

export default HomePage
