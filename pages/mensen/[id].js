import Image from 'next/image';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DailyMenu from '../../comps/DailyMenu';


export const getStaticPaths = async () => {
  const res = await fetch('https://openmensa.org/api/v2/canteens');
  const data = await res.json();

  const paths = data.slice(0,25).map(mensa => {
    return {
      params: { id: mensa.id.toString() }
    }
  })

  
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch('https://openmensa.org/api/v2/canteens/'+ id);
  const data = await res.json();
  
  return {
    props: { mensa: data }
  }
}

const Details = ({ mensa }) => {
  return (
    <div>
      <Card sx={{ maxWidth: 1024 }}>
      <CardMedia
        component="img"
        height="180"
        image={`/mensafotos/${mensa.id}.jpg`}
        alt={mensa.name}
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {mensa.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {mensa.address}
        </Typography>
        </CardContent>
        <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
        </CardActions>
                         
        <DailyMenu />
        </Card>
  
    </div>
  )
}

export default Details;