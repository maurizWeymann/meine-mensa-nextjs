console.log("test3.js");
const current = new Date();
const year = current.getFullYear();
const month = current.getMonth() + 1;
const day = current.getDate();
const date = `${year}-${month<10?`0${month}`:`${month}`}-${day}`;
console.log(date);

console.log(current);
const Test = () => {
    return ( 
        <div>
            <h1>Test</h1>

        </div>
     );
}
 
export default Test;
