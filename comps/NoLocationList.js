import Head from 'next/head'
import styles from '/styles/Mensen.module.css'
import Link from "next/link";
import Image from 'next/image';

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

import { useEffect, useState } from 'react'

export const getStaticProps = async () => {
    const res = await fetch('https://openmensa.org/api/v2/canteens');
    const data = await res.json();
    
    return { props: { mensen: data } }
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



    const Mensen = ({mensen}) => {
        
        const [locationState, setlocationState] = useState(false);
        
        return ( 
            <>
            <Head>
                <title>HTW Mensa | Mensen</title>
                <meta name="keywords" content="mensa"/>
            </Head>
            <div>
                <h1>Alle Mensen</h1>
                <p>Alle Mensen</p>
            
                <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    
        
                    {mensen.slice(0,25).map(mensa => ( 

                        
                    <Link href ={'/mensen/' + mensa.id} key={mensa.id}>
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
    }


// index.js will create route to the root page
 
export default Mensen;