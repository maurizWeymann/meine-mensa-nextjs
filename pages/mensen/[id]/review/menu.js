import {useState} from 'react';
import {useEffect} from 'react';
import {useRouter} from 'next/router';


console.log('test');

export const getStaticPaths = async () => {
    const res = await fetch('https://openmensa.org/api/v2/canteens');
    const data = await res.json();

    const paths = data.map(mensa => {
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
    const res = await fetch('https://openmensa.org/api/v2/canteens/' + id );
    const data = await res.json();

    return {
        props: { mensa: data }
    }
}








const Test = () => {
    const current = new Date();
    const year = current.getFullYear();
    const month = current.getMonth() + 1;
    const day = current.getDate();
    const today = `${year}-${month<10?`0${month}`:`${month}`}-${day}`;
    const [date, setDate] = useState(today);
    const [menu, setMenu] = useState([]);
    const router = useRouter();
    const { id } = router.query;
    console.log(id);
    console.log(date);

    const handleMenu = async () => {
        const open = await fetch(`https://openmensa.org/api/v2/canteens/${id}/days/${date}`);
        const openData = await open.json();
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
        </div>

    );
}
 
export default Test;