import React,{useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import Axios from 'axios'
import env from "react-dotenv";
import {Navigate} from "react-router-dom";


function Log() {
    window.location.href = '/';
}
export default Log