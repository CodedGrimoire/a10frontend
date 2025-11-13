

import React from 'react';

const Error = () => {


  const styles = 
  
  {
    wrap: {
      
      display: 'flex',
      alignItems: 'center',

       padding: '24px',
      justifyContent: 'center',

      minHeight: '100vh',


      background: '#e1dda5ff',
     
    },

    card: {
      width: '100%',

      
      maxWidth: '760px',
    
      borderRadius: '16px',
    
      overflow: 'hidden',

        background: 'black',
      border: 'solid  1px ',


      color: '#cdcfd2ff',
    },



    imageBox: {
      position: 'relative',
     
      paddingBottom: '56.25%', 


       width: '100%',
      overflow: 'hidden',
     
    },



    img: {
      position: 'absolute',
     
      width: '100%',


       objectFit: 'cover',
      height: '100%',

       inset: 0,
     
    },



    body: 
    
    {
      padding: '22px',
      textAlign: 'center',
    },


    badge: 
    
    
    {
      display: 'inline-block',


       color: '#d1d5db',
      padding: '6px 10px',
   
      letterSpacing: '0.08em',
    
     
      border: 'solid #3f495aff 1px ',


      borderRadius: '999px',


         fontSize: '12px',
      marginBottom: '10px',
     
    },



    title:
    
    
    {
      fontSize: '28px',


      lineHeight: 1.2,
     
      color: '#f9fafb',


       margin: '6px 0 8px',
    },

    
    actions: {
      
    

      display: 'flex',

      
      justifyContent: 'center',
    gap: '12px',


      flexWrap: 'wrap',
    },



    btnPrimary: {
     
       borderRadius: '10px',

        fontWeight: 600,
      border: '1px solid',

     textDecoration: 'none',


      color: '#111827',

     background: '#efc8adff',

      padding: '10px 16px',
     
     
     
    },


    btnGhost: 
    { padding: '10px 16px',


      background: 'transparent',

     textDecoration: 'none',
      border: '1px solid ',
     
      fontWeight: 600,


       color: '#e5e7eb',
     
      borderRadius: '10px',
     
    },



    subtitle: {
      fontSize: '15px',

       marginBottom: '18px',
      color: '#9ca3af',
     
    },
  };

  return (
    <div style={styles.wrap}>
      <main 
      
      
      style={styles.card} 
      
      role="main" aria-labelledby="error-title">


        <div style={styles.imageBox}>
          <img
            src="/error2.jpeg"  
            alt=""



            style={styles.img}
           
          />
        </div>

        <div style={styles.body}>


          <span style={styles.badge} aria-hidden="true">
            
            
            404 page Not Found
            
            </span>
         
          <p style={styles.subtitle}>
            The page you’re looking for isn’t in this cut. Try heading back to the homepage.
          </p>

          <div style={styles.actions}>
            
            <a href="/" style={styles.btnPrimary}>
            
            
            Go Home
            
            
            </a>

          
            <button
              type="button"
              style={styles.btnGhost}
              onClick={() => {
                if (typeof window !== 'undefined' && window.history.length > 1) 
                  
                  {
                  window.history.back();
                } 
                
                else 
                  
                  {
                  window.location.href = '/';
                }
              }}
            >
              Go Back
            </button></div>
          
        </div>
      </main>

      
    </div>
  );
};

export default Error;
