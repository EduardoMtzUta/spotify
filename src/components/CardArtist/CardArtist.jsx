
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function MediaControlCardArtist({name, image,url}){
return (
  <a href={url} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
    <Card sx={{ maxWidth: 345}} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="280"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card></a>
  );
}
export default MediaControlCardArtist;