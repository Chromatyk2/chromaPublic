import React,{useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import Axios from 'axios'

function AuthService() {

  const [cookies, setCookie, removeCookie] = useCookies();
  const CLIENT_ID = "401m5gmmyoy4jme9jo4n7bzz5zzt8t";
  const REDIRECT_URI = "https://chromatyk.netlify.app/";
  const SCOPES = ['openid'];

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
        response_type: "code",
        scope: SCOPES,
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
      const params = getUrlParams();
      if(Object.keys(params).length > 0){
        setCookie('oauth', params.code);
        Axios.post(
        'https://id.twitch.tv/oauth2/token',
        {
          client_id:"401m5gmmyoy4jme9jo4n7bzz5zzt8t",
          client_secret:"mdbes44v9p9576ltwyed2041xwtnw4",
          code:params.code,
          grant_type:"authorization_code",
          redirect_uri:"https://chromatyk.netlify.app/"
        }
      )
      .then(
        (result) => {
            setCookie('token', result.data);
            Axios.get(
              'https://api.twitch.tv/helix/users',
              {
                headers:{
                  'Authorization': `Bearer ${result.data.access_token}`,
                  'Client-Id': '401m5gmmyoy4jme9jo4n7bzz5zzt8t'
                }
              }
            )
            .then(
              (result) => {
                setCookie('user', result.data );
              }
            )
          }
        );
      }
      return params["access_token"] !== undefined;
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
