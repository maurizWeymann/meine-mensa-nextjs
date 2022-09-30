import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// test
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



const Mensen = () => {

    const [mensen, setMensen] = useState([]);
    const [location, setLocation] = useState();

    const fetchApiData = async ({ latitude, longitude }) => {
        const res = await fetch(`https://openmensa.org/api/v2/canteens?near[lat]=${latitude}&near[lng]=${longitude}&near[dist]=5`);
        const data = await res.json();
        setMensen(data);
    };

    useEffect(() => {
        if('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude, longitude });
            })
        }
    }, []);

    useEffect(() => {
        // Fetch data from API if `location` object is set
        if (location) {
            fetchApiData(location);
        }
    }, [location]);
    
    return ( 
      <>
      
      <Head>
        <title>HTW Mensa | Home</title>
        <meta name="keywords" content="mensa"/>
      </Head>
      <div>
        
        <Link href='/mensen'><a className={styles.btn}>Liste Aller Mensen</a></Link>
      </div>

        
        <div>
            <h1>Mensen in der Nähe</h1>

            <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            
                {mensen?.length > 0 && mensen.map(mensa => ( 

                <Link href={`/mensen/${mensa.id}`} key={mensa.id}>
                    <Grid xs={6}>
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
                        </Card>
                     
                    </Grid>
                    
                </Link>
            ))}
            </Grid>
            </Box>
        </div>
      </>
    );
};

export default Mensen;
