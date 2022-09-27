// get paths for each mensen we need to use getStaticPaths
import { useRouter } from 'next/router'



const current = new Date();

const year = current.getFullYear();
const month = current.getMonth() + 1;
const day = current.getDate();
const date = `${year}-${month<10?`0${month}`:`${month}`}-${day}`;
console.log(date);



export const getStaticPaths = async () => {
    const res = await fetch('https://openmensa.org/api/v2/canteens/');
    const data = await res.json();


    const paths = data.map(mensa => {
        return {
            params: { id: mensa.id.toString() ,
            //date: date
        }

            }
        }
    )

    return {
        paths,
        fallback: false
    }

}

export const getStaticProps = async (context) => {
    const id = context.params.id;
   // const date = context.params.date;
    const res = await fetch('https://openmensa.org/api/v2/canteens/' + id + '/days/' + date + '/meals');
    const data = await res.json();

    return {
        props: { meals: data }
    }
}





const Details = ({meals1}) => {

    // handle the submit event on form submit
    const handleSubmit = async(e) => {  
        
        // stop the form from submitting and refreshing the page
        e.preventDefault();
        // get the value of the input field
        const date1 = e.target.elements.date.value;
        console.log(date1);
        const res = await fetch('https://openmensa.org/api/v2/canteens/' + id + '/days/' + date1 + '/meals');
        const data = await res.json();
        return {
            props: { meals1: data }
        }

    }



    return ( 
        
        <div>
            <h1>Speisen</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date">Date</label>
                <input type="text" id="date" name="date" required />

               

                <button type="submit">Submit</button>
            </form>
            
            {meals1.map(meal => (
                <div key={meal.id}>
                    <p key={meal.id}>{meal.name}</p>
                    <p key={meal.id}>Student price: {meal.prices.students}</p>
                    <p key={meal.id}>Andere price: {meal.prices.others}</p>
                </div>
            ))}
            <p>This is the Details page</p>
        </div>


     );
}
 
export default Details;