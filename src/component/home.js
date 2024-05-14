import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'
import OnStream from "./onStream";

function HomePage(props) {
  return (
    <>
        <div className="socialContainer">
            <img style={{width: "35%"}} src={"images/logoSofk.png"}/>
            <a className="socialLink" target='_blank' href="https://twitch.tv/chromatyk">Faire un Don</a>
        </div>
    </>
  )
}

export default HomePage
