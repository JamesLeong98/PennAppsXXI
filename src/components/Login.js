import SpotifyLogin from "react-spotify-login";
import {clientId, redirectUri} from "../settings";
import React from "react";
import "./Login.css";
import spotifyLogo from "../spotify_logo.png";

function Login(props) {
    const onSuccess = response => props.history.push({pathname: './home', state: response});
    const onFailure = () => props.history.push({pathname: './error'});

    return (
        <div className={"login-page"}>
            <h1 className={"title"}>{`<Vibe/>`}</h1>
            <p className={""}>A vibe filter for your Spotify songs, powered by Wolfram AI</p>
            <SpotifyLogin
                className={"login-button"}
                clientId={clientId}
                redirectUri={redirectUri}
                scope={"user-read-currently-playing user-top-read user-library-read playlist-modify-public playlist-modify-private"}
                onSuccess={onSuccess}
                onFailure={onFailure}
            />
            <p></p>
            <img className={"spotify-logo"} src={spotifyLogo} alt={"spotify logo"}/>
            <div className={"footer"}>
                <p>{`Built with ❤ by James Leong & Ryan Chang, Duke University`}</p>
            </div>
        </div>

        )
}

export default Login;