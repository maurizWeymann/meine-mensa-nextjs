// get paths for each mensen we need to use getStaticPaths
import { useRouter } from "next/router";

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





const Details = ({mensa}) => {
    const router = useRouter();
    const { id } = router.query;
    console.log(id);
    return ( 
        <div>
            <h1>Details</h1>
            <p>{mensa.name}</p>
            <p>{mensa.address}</p>
            <p>{mensa.city}</p>
            <p>{mensa.cordinates}</p>
            <button
            onClick={() => router.push(`/mensen/${id}/review/menu`)}
            >Menu</button>
            
            <p>This is the Details page</p>
        </div>
     );
}
 
export default Details;