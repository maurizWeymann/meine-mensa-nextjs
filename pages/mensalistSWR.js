import { padding } from "@mui/system";
import { useState } from "react";
import useSWR from "swr";

const fetcher = async () => {
    const response = await fetch("https://openmensa.org/api/v2/canteens")
    const data = await response.json()
    return data
}
export default function MensalistSWR() {
    
    const { data, error } = useSWR('mensalist', fetcher)

    if(error) return "Error while fetching Mensa Api"
    if(!data) return "loading..."

    const canteens = []
    let imagePath = ""

    data.forEach((element) => {
        imagePath = `/images/${element.id}.jpg`
        canteens.push(<h3 className='canteen_name'   >
            
            <img src={imagePath} alt="Girl in a jacket" width="360px"></img>  
            <br></br>
            {element.id}
            <br></br>
            {"name: " + element.name}
            <br></br>
            {"address: " + element.address}   
            </h3>
            
            )
    })
        
    return(
        <div >
            <h2>List of Canteens</h2>
            {canteens}
            <br></br>         
            <p>{data[1].name}</p>
        </div>
    )
}

