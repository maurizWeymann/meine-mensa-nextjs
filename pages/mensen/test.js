import Navbar from "../../comps/Navbar";
import Link from "next/link";
import Head from "next/head";
import styles from '../../styles/Mensen.module.css'
import { useEffect } from "react";
import { useState } from "react";
import Location from "../../comps/Location";
import navigator from "react";



export const getStaticProps = async (context) => {
    
    
    
    
    const res = await fetch('https://openmensa.org/api/v2/canteens?near[lat]=' + lat+ '&near[lng]=' + long + '&near[dist]=50000');
    const data = await res.json();

    return {
      props: { mensen: data }
    }
}


const Mensen = ({mensen}) => {
    
    
    
    return ( 
        <>
        <Head>
            <title>HTW Mensa | Mensen</title>
            <meta name="keywords" content="mensa"/>
        </Head>
        <Location />
        <div>
            <h1>Alle Mensen</h1>
            <p>Alle Mensen</p>
            {mensen.map(mensa => ( 
                <Link href ={'/mensen/' + mensa.id}key={mensa.id}>
                    <a className={styles.single}> 
                        <h3>{ mensa.name }</h3>
                    </a>
                </Link>))}
        </div>
        </>
     );
}
 
export default Mensen;