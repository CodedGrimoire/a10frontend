const Footer = () => {
  const currentYear = new Date().getFullYear();

  const styles = {
    footer: {
      backgroundColor: '#fef3c7',
      color: '#1f2937',
      padding: '24px 0',
      
      borderTop: ' solid 2px #fde68a',
    },

    divider: {
      color: '#a4acbcff',
      margin: '0 8px',
    },
    container: {
     

      padding: '0 24px',
      margin: '0 auto',
      
    },

     brandTitle: {
      fontSize: '20px',

       color: '#92400e',
      fontWeight: 'bold',
     
      margin: 0,
    },

    flexContainer: {
      display: 'flex',

        gap: '16px',
      alignItems: 'center',

       flexWrap: 'wrap',
      justifyContent: 'space-between',
    
     
    },
    brandSection: {
      display: 'flex',

      gap: '9px',
      alignItems: 'center',
      
    },
   
    
    tagline: {
      fontSize: '14px',

        margin: 0,
      color: '#4b5563',
    
    },
   
    link: {
     
      textDecoration: 'none',

       fontWeight: '500',

        color: '#4b5563',
      fontSize: '14px',
     
      
    },
    dot: {
      color: '#d1d5db',
    },
    copyright: {
        color: '#636c7cff',
      fontSize: '12px',
    
      margin: 0,
    },


     socialLinks: {
      display: 'flex',

       gap: '12px',
      alignItems: 'center',
     
    },
  };



  return (
    <footer style={styles.footer}>


      <div style={styles.container}>
        <div 
        
        style={styles.flexContainer}>
         
          <div 
          
          style={styles.brandSection}>
            <h2 style={styles.brandTitle}>
              
              📚 The Book Haven
              
              </h2>
            <span style={styles.divider}>|</span>
            <p style={styles.tagline}>
              
              
              
              Your digital escape into worlds of imagination
              
              
              
              </p> </div>
         

        
          <div style={styles.socialLinks}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
             
            >
              Facebook
            </a>
            <span style={styles.dot}>•</span>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
             
             
            >
              X
            </a>
            <span style={styles.dot}>•</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
             
            >
              Instagram
            </a>
          </div>

        
          <p 
          style={styles.copyright}>
            
            
            © {currentYear} The Book Haven
            
            </p>
        </div> </div>
     
    </footer>
  );
};

export default Footer;