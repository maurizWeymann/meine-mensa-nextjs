import {useState} from 'react';
import {useEffect} from 'react';
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';



const DailyMenu = () => {

    const current = new Date();
    const year = current.getFullYear();
    const month = current.getMonth() + 1;
    const day = current.getDate();
    const today = `${year}-${month<10?`0${month}`:`${month}`}-${day}`;
    const [date, setDate] = useState(today);
    const [menu, setMenu] = useState([]);
    const [noData, setNoData] = useState(false);
    const router = useRouter();
    const { id } = router.query;
    console.log(id);
    console.log(date);

    const [category, setCategorie] = useState("Hauptgerichte");
    const [filterMenu, setFilterMenu] = useState([]);

    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    

    const bull = (
      <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
      >
        •
      </Box>
    );

    const handleMenu = async () => {
      const openData = [] 
      try{
        const open = await fetch(`https://openmensa.org/api/v2/canteens/${id}/days/${date}`);
        openData = await open.json();     
      }catch (error){
        setMenu([]);
        setFilterMenu([]);
        setNoData(true);

      }
        
        
        console.log(openData);
        console.log(openData['closed']);
        

        if (openData['closed'] === false) {

          const res = await fetch(`https://openmensa.org/api/v2/canteens/${id}/days/${date}/meals`);
          const data = await res.json();
          setMenu(data);

          console.log(data);}
          
        else {
            console.log('closed');  
            const data = [{id:1,name :'Mensa ist geschlossen'}];
        }

        const updateMenu = (category) => {
          const filtered = menu.filter((menu) => menu.category === category);
          setFilterMenu(menu);
        };

        updateMenu( category )
        
    }


    return (  
        <div> 
            <input type="date"
            value={date}
            onChange={(e) => {setDate(e.target.value)} }
            />
            <button onClick={handleMenu}>Get Menu</button>
            <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        <Tab
          value="one"
          label="Hauptgerichte"
          wrapped
         
        />
        <Tab
          value="two"
          label="Essen"
          wrapped
        />
        <Tab value="three" label="Suppen" />
        <Tab value="fore" label="Salate" />
        <Tab value="five" label="Beilagen" />
        <Tab value="six" label="Desserts" />
      </Tabs>
    </Box>
            <h1>Menu</h1>
            {filterMenu.map((meal) => ( 

<Card sx={{ minWidth: 275 }} key={meal.id}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {meal.category}
                 </Typography>
                <Typography variant="h5" component="div">
                  {meal.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {meal.notes.join(" | ")}
                </Typography>
                <Typography variant="body2">
                Studenten :{meal.prices.students.toFixed(2).replace(".", ',')}€
                <br/>
                Mitarbeiter :{meal.prices.employees.toFixed(2).replace(".", ',')}€
                <br/>
                Extern :{meal.prices.others.toFixed(2).replace(".", ',')}€
                <br/>
                Kinder :{meal.prices.pupils} kostenlos
                  <br />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
 ))}
            <p>This is the Menu page</p>
            
                <div >
                    
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
               
            {!noData || <div class="h5"> Leider gibt es keine Daten für dein gewähltes Datum</div> }
               
        </div>

    );
}
export default DailyMenu;