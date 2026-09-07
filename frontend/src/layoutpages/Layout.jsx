import {Outlet} from 'react-router-dom';
import Footer from "../components/Footer.jsx";
import "../pages/profile.css";

export default function Layout(){
    return(
        <div className='layout'>
          <Outlet />
          <Footer />
        </div>
    )
}