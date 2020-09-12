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
            <h1 className={"title"}>Playlist Generator</h1>
            <p className={""}>Exploring a new genre? We've got you covered!</p>
            <SpotifyLogin
                className={"login-button"}
                clientId={clientId}
                redirectUri={redirectUri}
                scope={"user-read-currently-playing user-top-read user-library-read"}
                onSuccess={onSuccess}
                onFailure={onFailure}
            />
            <p></p>
            <img className={"spotify-logo"} src={spotifyLogo} />
        </div>

        )
}

export default Login;