import {useState} from 'react';
import {useEffect} from 'react';
import { useRouter } from 'next/router'


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

    const handleMenu = async () => {
      const openData = [] 
      try{
        const open = await fetch(`https://openmensa.org/api/v2/canteens/${id}/days/${date}`);
        openData = await open.json();     
      }catch (error){
        setMenu([]);
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
        
    }


    return (  
        <div>
            <input type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            
            />
            <button onClick={handleMenu}>Get Menu</button>
            <h1>Menu</h1>
            <p>This is the Menu page</p>
            {menu.map((meal) => (
                <div key={meal.id}>
                    <h3>{meal.name}</h3>
                    <p>Price for students :{meal.prices.students}</p>
                    <p>Price for employees :{meal.prices.employees}</p>
                    <p>Price for othters :{meal.prices.others}</p>
                    <p>Price for pupils :{meal.prices.pupils} kostenlos</p>
                </div>))}
            {!noData || <div> Keine Daten </div> }
               
        </div>

    );
}
export default DailyMenu;