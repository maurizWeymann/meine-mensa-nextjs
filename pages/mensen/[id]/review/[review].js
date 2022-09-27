import { useRouter } from "next/router";


export const getStaticPaths = async () => {
    const router = useRouter();
    const { id, review } = router.query;
    const res = await fetch('https://openmensa.org/api/v2/canteens');
    const data = await res.json();

    const paths = data.map(mensa => {
        return {
            params: { id: mensa.id.toString() ,
                date: review
            }
        }
    })

    return {
        paths,
        fallback: false
    }

}
export const getStaticProps = async (context) => {
    
    
    const res = await fetch('https://openmensa.org/api/v2/canteens/' + id+ '/days/' + review + '/meals');
    const data = await res.json();

    return {
        props: { meals: data }
    }
}

const Detail = ({meals}) => {

    

    return (  
        <div>
            <h1>Details</h1>
            <p>{meals.name}</p>
        </div>           
    );
}
 
export default Detail;