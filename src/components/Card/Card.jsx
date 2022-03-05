import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from "@mui/material/IconButton";

function MediaControlCard({ name, artist, image, play, url }) {

  return (
    <a href={url} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        maxHeight: 200,
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "Column",
          alignItems: "center",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="body1" fontSize={20}>
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            fontSize={15}
          >
            {artist}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="play/pause" href={play} target="_blank">
            <PlayArrowIcon sx={{ height: 60, width: 60 }} />
          </IconButton>
          </Box>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        width={250}
        height={200}
        sx={{ width: 251, height: 200 }}
        image={image}
        alt="Cover of image"
      />
    </Card>
    </a>
  );
}
export default MediaControlCard;
