
import React, { useState } from "react";

import { Eye, EyeOff } from "lucide-react"; 
import { useNavigate, useLocation, Link } from "react-router-dom";



import toast, { Toaster } from "react-hot-toast";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";



const Login = () => {

   const [showPassword, setShowPassword] = useState(false);

   const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
 

  
  const location = useLocation();


  const googleProvider = new GoogleAuthProvider();

 
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) 
      
      {
      toast.error("Please fill all fields");
      return;
    }
    try 
    
    {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);


      toast.success("Login successful!");
      setTimeout(() => navigate(from, { replace: true }), 400);
    // eslint-disable-next-line no-unused-vars
    } 
    
    // eslint-disable-next-line no-unused-vars
    catch (error)
     {
      toast.error("Invalid credentials");
    }
  };


  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Login successful!");
      
      setTimeout(() => navigate(from, { replace: true }), 400);
    // eslint-disable-next-line no-unused-vars
    } 
    
    // eslint-disable-next-line no-unused-vars
    catch (error) 
    
    {
      toast.error("Google login failed");
    }
  };

  
  const styles = {
    container: {
     
      backgroundColor: "#fef3c7",
      display: "flex",

       minHeight: "100vh",
      alignItems: "center",


       padding: "20px",
      justifyContent: "center",
     
    },


    card: {
      backgroundColor: "#fffbeb",
      border: "2px solid #fde68a",
     
      width: "100%",


       borderRadius: "12px",
     
      maxWidth: "450px",

       padding: "40px",
      
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
    },



    title: {
      
      fontWeight: "bold",

      marginBottom: "8px",
      color: "#92400e",

      fontSize: "28px",
      
    },

  
    formGroup: {
      marginBottom: "20px",
      position: "relative",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "500",
      color: "#92400e",
      marginBottom: "6px",
    },
    input: {boxSizing: "border-box",
      width: "100%",


       border: "2px solid #fde68a",
      borderRadius: "6px",
     
      backgroundColor: "white",


       fontSize: "14px",
      padding: "12px 40px 12px 12px",
     
      color: "#1f2937",
      
    },



      subtitle: {
      fontSize: "14px",
      color: "#78350f",
    },


    eyeIcon: {
      position: "absolute",
     
      top: "38px",
    
      color: "#92400e",

       right: "10px",
    },
    
    forgotPassword: { marginTop: "8px",
      textAlign: "right",
      
    },


    forgotLink: {
      color: "#d97706",
      fontSize: "13px",
      textDecoration: "none",
      
    },


    button: {
      width: "100%",

       borderRadius: "7px",
      padding: "12px",
      
      fontWeight: "600",
      
      marginTop: "10px",

      border: "none",
     
      fontSize: "16px",
    },


    loginButton: {
      backgroundColor: "#d97706",
      color: "white",
    },


    googleButton: {
      backgroundColor: "#fff",
      color: "#1f2937",
     
      display: "flex",

       border: "solid #fde68a 2px ",
      alignItems: "center",

       gap: "8px",
      justifyContent: "center",
     
    },
   
    dividerLine: {
      flex: 1,
      height: "1px",
      backgroundColor: "#fde68a",
    },


    dividerText: {
      padding: "0 12px",
    },


    footer: {
      textAlign: "center",

        marginTop: "24px",
      fontSize: "14px",
      color: "#78350f",
    
    },



    link: {
      color: "#d97706",
      
      fontWeight: "600",
      textDecoration: "none",
     
    },


     divider: {
      display: "flex",


        color: "#92400e",

        fontSize: "14px",
      alignItems: "center",
      margin: "24px 0",
    
      
    },
  };

  return (
    <div style={styles.container}>
      <Toaster position="top-right" />
      <div style={styles.card}>


        <div style={styles.header}>
          <h1 style={styles.title}>
            
            
            
            📚 Welcome Back
            
            </h1>
          <p style={styles.subtitle}>
            
            Log in to your Book Haven account
            
            </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              
              Email
              
              </label>
            <input
              type="email"
              name="email"


              value={formData.email}
              onChange={handleChange}


              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              
              Password
              
              
              </label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"



              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />


            <div
              style={styles.eyeIcon}


              onClick={() => setShowPassword((prev) => !prev)}


              aria-label={showPassword ? "Hide password" : 
                "Show password"}


              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>


            <div style={styles.forgotPassword}>
             
              <Link to="/forgot-password" state={{ from }} style={styles.forgotLink}>
                Forgot Password?

              </Link>
            </div>
          </div>

          <button type="submit" style={{ ...styles.button, ...styles.loginButton }}>
            Login
          </button>
        </form>

      
        <div style={styles.divider}>

          <div style={styles.dividerLine}>

          </div>
          <span style={styles.dividerText}>

            
            
            OR
            
            </span>
          <div style={styles.dividerLine}></div>
        </div>

       
        <button
          style={{ ...styles.button, ...styles.googleButton }}

          
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>

        <div style={styles.footer}>


          Don&apos;t have an account?{" "}
         
         <Link to="/register" state={location.state} style={styles.link}>
  Register
</Link>

        </div>
      </div>
    </div>
  );
};

export default Login;
