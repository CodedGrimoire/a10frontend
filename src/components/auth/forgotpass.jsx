
import React, { useState } from 'react';

import './auth.css';
import { sendPasswordResetEmail } from 'firebase/auth';

import toast, { Toaster } from 'react-hot-toast';
import { auth } from '../../firebaseConfig';



const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) 
      
      {
      toast.error('Please enter your email');
      return;
    }

    try 
    
    {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
    // eslint-disable-next-line no-unused-vars
    } 
    
    // eslint-disable-next-line no-unused-vars
    catch (error) 
    
    {
      toast.error('Failed to send reset email');
    }
  };

  return (
    <div className="auth-container">
      <Toaster position="top-right" />
      <div className="auth-card">



        <div className="auth-header">
          <h1 className="auth-title">
            
             Reset Password
             
             </h1>
          <p className="auth-subtitle">
            Enter your email to receive reset instructions
          </p></div>
        

        <form onSubmit={handleReset}>
          <div className="form-group">


            <label className="label">
              
              Email
              
              </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>



          <button type="submit" 
          
          className="btn btn-register">


            Send Reset Link
          </button>  </form>
       

        <div className="auth-footer">
          Remembered your password?{' '}
          <a href="/login" className="link">
            Go back to Login
          </a>
        </div>   </div>
    
    </div>
  );
};

export default ForgotPassword;
