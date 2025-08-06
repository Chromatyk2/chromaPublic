import React,{useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import Axios from 'axios'
import env from "react-dotenv";
import {Navigate} from "react-router-dom";


function AuthService() {

  const [cookies, setCookie, removeCookie] = useCookies();
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = "https://chromatyk.fr/";
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET

  const encodeQueryString = (params) => {
      const queryString = new URLSearchParams();
      for (let paramName in params) {
          queryString.append(paramName, params[paramName]);
      }
      return queryString.toString();
  };

  const authentication = () => {
    const params = {
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: "token"
    };
      const queryString = encodeQueryString(params);
      const authenticationUrl = `https://id.twitch.tv/oauth2/authorize?${queryString}`;
      window.location.href = authenticationUrl;
  };

  const decodeQueryString = (string) => {
      const params = {};
      const queryString = new URLSearchParams(string);
      for (let [paramName, value] of queryString) {
          params[paramName] = value;
      }
      return params;
  };

  const getUrlParams = () => {
      const queryParameters = new URLSearchParams(window.location.search);
      return decodeQueryString(queryParameters);
  };

  const isAuthenticated = () => {
      const params = {
          client_id: CLIENT_ID,
          redirect_uri: REDIRECT_URI,
          response_type: "token"
      };
      const queryString = encodeQueryString(params);
        Axios.get('https://id.twitch.tv/oauth2/authorize?'+queryString)
    .then(
        (result) => {
            Axios.get(
                'https://id.twitch.tv/oauth2/validate',
                {
                    headers:{
                        'Authorization': `Bearer ${result.data.access_token}`
                    }
                }
            )
                .then(
                    (result) => {
                        Axios.get(
                            'https://api.twitch.tv/helix/users?id='+result.data.user_id,
                            {
                                headers:{
                                    'Authorization': `Bearer ${result.data.access_token}`,
                                    'Client-Id': CLIENT_ID
                                }
                            }
                        )
                            .then(
                                (result) => {
                                    setCookie('user', result.data,{days:1} );
                                }
                            )
                    }
                )
        }
    );
  }

  useEffect(() => {
    isAuthenticated();
  }, []);

  return(
    <div className="loginContainer">
      <p className="welcome">Bienvenue !</p>
      <p className="pleaseLogin">Pour commencer connecte toi avec ton compte Twitch !</p>
      <button className="loginButton" onClick={authentication}><i class="fa-brands fa-twitch"></i>Se connecter avec twitch</button>
    </div>
  )
}
export default AuthService;
