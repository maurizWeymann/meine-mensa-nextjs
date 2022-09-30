import AppBar from "./AppBar";
import Footer from "./Footer";
import Navbar from "./Navbar";
import image from '/public/food-pattern.svg';


const Layout = ({ children}) => {
    return (
        <div className="content">
            <AppBar />
            
            { children }
            <Footer/>
        </div>
      );
}
 
export default Layout;