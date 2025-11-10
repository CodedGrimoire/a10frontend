import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import AllBooks from "./components/Allbooks";
import MH from "./components/maincontent"
import Foot from "./components/footer"


export default function Home() {


  return (
    <AuthProvider>
   <div>
  <MH/>
  <Foot/>
  </div>
  </AuthProvider>
      
    
    
  );
}
