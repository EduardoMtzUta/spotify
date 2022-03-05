import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Cookies from "universal-cookie";
import { getSpotifyToken, spotifySearch } from "../../api/spotify";
import { Card } from "../../components/Card";
import { CardAlbum } from "../../components/CardAlbum";
import { CardArtist } from "../../components/CardArtist";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
const cookies = new Cookies();

function Home() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    type: "all",
    query: null,
  });
  const TYPES = ["all", "album", "artist", "track"];
  const token = cookies.get("token");

  const search = async () => {
    const data = await spotifySearch(searchQuery.type, searchQuery.query);
    setData(data);
  };

  useEffect(() => {
    if (!token) getSpotifyToken();
  }, [token]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Box container marginTop={10} sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs></Grid>
        <Grid item xs={6}>
          <TextField
            id="outLine-search"
            label="Search field"
            type="search"
            onChange={(e) =>
              setSearchQuery((current) => ({
                ...current,
                query: e.target.value,
              }))
            }
          />
          <FormControl style={{ marginRight: 50 }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={searchQuery.type}
              label="Age"
              onChange={(e) =>
                setSearchQuery((current) => ({
                  ...current,
                  type: e.target.value,
                }))
              }
            >
              {TYPES.map((element, idx) => (
                <MenuItem key={idx} value={element}>
                  {element}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={search}>
            Search
          </Button>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
      {searchQuery.query &&
      (searchQuery.type === "track" || searchQuery.type === "all") ? (
        <Grid container margin={10}>
          <Typography variant="h1" component="div" gutterBottom>
            Songs
          </Typography>
        </Grid>
      ) : (
        <label></label>
      )}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        padding={10}
      >
        {data?.tracks &&
          data?.tracks?.items?.map((track, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Card
                name={track.name}
                artist={track.artists[0].name}
                image={track.album?.images[0]?.url}
                play={track.preview_url}
                url={track?.external_urls?.spotify}
              />
            </Grid>
          ))}
      </Grid>
      {searchQuery.query &&
      (searchQuery.type === "album" || searchQuery.type === "all") ? (
        <Grid container margin={10}>
          <Typography variant="h1" component="div" gutterBottom>
            Albums
          </Typography>
        </Grid>
      ) : (
        <label></label>
      )}
      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        padding={10}
      >
        {data?.albums &&
          data?.albums?.items?.map((album, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <CardAlbum
                name={album.name}
                artist={album.artists[0].name}
                image={album?.images[0]?.url}
                url={album?.external_urls?.spotify}
              />
            </Grid>
          ))}
      </Grid>
      {searchQuery.query &&
      (searchQuery.type === "artist" || searchQuery.type === "all") ? (
        <Grid container margin={10}>
          <Typography variant="h1" component="div" gutterBottom>
            Artist
          </Typography>
        </Grid>
      ) : (
        <label></label>
      )}
      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        padding={10}
      >
        {data?.artists &&
          data?.artists?.items?.map((artist, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <CardArtist
                name={artist.name}
                image={artist?.images[0]?.url ?? "http://wmhbradio.org/wp-content/uploads/2016/07/music-placeholder.png"}
                url={artist?.external_urls?.spotify}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
export default Home;
