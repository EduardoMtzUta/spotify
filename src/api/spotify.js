import axios from "axios";
import qs from "qs";
import Cookies from "universal-cookie";
import { Buffer } from "buffer";
const cookies = new Cookies();

//You need to create this .env file with the following variables
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SECRET_ID = process.env.REACT_APP_SPOTIFY_SECRET_ID;

//Turning our keys into a token
const AUTH_TOKEN = Buffer(`${CLIENT_ID}:${SECRET_ID}`, "utf-8").toString(
  "base64"
);

export const getSpotifyToken = async () => {
  try {
    //make post request to SPOTIFY API for access token, sending relavent info
    const token_url = "https://accounts.spotify.com/api/token";
    const data = qs.stringify({ grant_type: "client_credentials" });

    const response = await axios.post(token_url, data, {
      headers: {
        Authorization: `Basic ${AUTH_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(response.data);
    //return access token
    cookies.set("token", response.data.access_token, { path: "/" });
  } catch (error) {
    //on fail, log the error in console
    console.log(error);
  }
};

export const spotifySearch = async (type = "artist", query = "The Beatles") => {
  //request token using getAuth() function
  const access_token = cookies.get("token");
  if (type === "all") {
    type = ["album", "artist", "track"];
  }
  const api_url = `https://api.spotify.com/v1/search?type=${type}&q=${query}&include_external=audio`;
  try {
    const { data } = await axios.get(api_url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};