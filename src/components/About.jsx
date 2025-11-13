import React from "react";
import "./main.css"



const About = () => {
  return (
    <section style={{
      backgroundColor: '#f3f4f6',

       textAlign: 'center',
      padding: '64px 24px',
     
    }}>
      <div style={{ maxWidth: '1200px', width:"90%",
        
        
        margin: '0 auto' }}>


        <h2 style={{
          fontSize: '36px',
         
          color: '#92400e',


           fontWeight: 'bold',
          marginBottom: '24px'
        }}>

          About The Book Haven
        </h2>
        <p style={{
        
          lineHeight: '1.8',
          marginBottom: '32px',

          maxWidth: '800px',

            color: '#374151',
          fontSize: '18px',
          
          margin: '0 auto 48px'
        }}>

          Welcome to <span 
          
          style={{ fontWeight: '600' }}>
            
            
            The Book Haven</span>
            
             — your
          digital sanctuary for stories, knowledge, and imagination. Our goal is
          to connect readers and collectors through an elegant, user-friendly
          digital library where every book tells a story worth sharing.
        </p>

        <div className="aboutergrid" >
          <div style={{
            padding: '32px',
            backgroundColor: 'white',
           
            borderRadius: '16px',
            
          }}

          
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}>
            <div style={{
              width: '100%',

               borderRadius: '12px',

                marginBottom: '20px',
              height: '200px',
              overflow: 'hidden',
             
             
            }}>
              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                alt=""

                
                style={{
                  width: '100%',
                  height: '100%', objectFit: 'cover'
                 
                }}
              />
            </div>
            <h3 style={{
              fontSize: '20px',

               marginBottom: '12px',
              fontWeight: '600',
              color: '#92400e'
             
            }}>
              Explore & Discover
            </h3>

            
            <p style={{
              fontSize: '15px',
                lineHeight: '1.6',
              color: '#727a8aff',
            
            }}>
              Browse a growing library of genres — from timeless classics to
              modern mysteries and everything in between.
            </p>



          </div>

          <div style={{
            padding: '32px',

             borderRadius: '16px',
            backgroundColor: 'white',
           
           
           
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';


            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {


            
          
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

               e.currentTarget.style.transform = 'translateY(0)';

          }}>
            <div style={{  overflow: 'hidden',
              width: '100%',


              borderRadius: '12px',
              height: '200px',
            
              
              marginBottom: '20px'
            }}>
              <img
                src="https://images.unsplash.com/photo-1532012197267-da84d127e765"
                alt=""
                style={{
                  width: '100%',

                  objectFit: 'cover',
                  height: '100%',
                  
                }}
              />
            </div>
            <h3 style={{  color: '#92400e',
              fontSize: '20px',



              fontWeight: '600',
            
              marginBottom: '12px'
            }}>
              Share Your Favorites
            </h3>





            <p 
            
            style={{

              color: '#6b7280',
              fontSize: '15px',
              
              lineHeight: '1.6'
            }}>


              Registered users can add their own books, write summaries, and


              recommend hidden gems to fellow readers.
            </p>
          </div>



          <div style={{
            padding: '32px',
            backgroundColor: 'white',
            
            borderRadius: '16px',
           
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';

            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}>
            <div style={{
              width: '100%',

                overflow: 'hidden',
              height: '200px',
            
              borderRadius: '12px',
              marginBottom: '20px'
            }}>
              <img
                src="data:image/jpeg;base64,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"
                alt=""
                style={{
                  width: '100%',

                  objectFit: 'cover',
                  height: '100%',
                  
                }}
              />
            </div>



            <h3 style={{
              fontSize: '20px',

               color: '#92400e',
              fontWeight: '600',
             
              marginBottom: '12px'
            }}>


              Connect & Grow
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#6b7280',
              lineHeight: '1.6'


            }}>
              Engage with a passionate community of readers — rate, review, and
              discuss your favorite titles.
            </p>


          </div>  </div>
      
      </div>
    </section>
  );
};

export default About;