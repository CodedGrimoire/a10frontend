import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import AllBooks from "./components/Allbooks";
import MH from "./components/maincontent"
import Foot from "./components/footer"
import dotenv from 'dotenv';
dotenv.config();  // Loads environment variables from .env file

// Now you can use process.env in firebase.js as shown above


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
