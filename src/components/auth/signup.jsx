
import React, { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';


import toast, { Toaster } from 'react-hot-toast';

import './auth.css';


import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';


import { auth } from '../../firebaseConfig';


const Register = () => {

    const [showPassword, setShowPassword] = useState(false);
  


  const [errors, setErrors] = useState({});


  const navigate = useNavigate();
  const location = useLocation();
  const provider = new GoogleAuthProvider();

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });


  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };



  const validatePassword = (password) => {
    const errs = [];

    if (!/[A-Z]/.test(password)) errs.push('One uppercase letter');
    if (password.length < 6) errs.push('At least 6 characters');
    
    if (!/[a-z]/.test(password)) errs.push('One lowercase letter');
    return errs;
  };


  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';


    if (!formData.email.trim()) newErrors.email = 'Email is required';
    const passErrors = validatePassword(formData.password);
    if (formData.password === '') newErrors.password = 'Password is required';


    else if (passErrors.length > 0) newErrors.password = 'Missing: ' + passErrors.join(', ');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!validateForm()) 
      
      {
      toast.error('Please fix all errors before submitting');
      return;
    }
    try
    
    {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      toast.success('Registration successful!');
      setTimeout(() => navigate(from, { replace: true }), 400);
    } 
    
    catch (error) 
    
    {
      toast.error('Error during registration: ' + error.message);
    }
  };


  const handleGoogleLogin = async () => {
    try
    
    {
      await signInWithPopup(auth, provider);
      toast.success('Google login successful!');
      setTimeout(() => navigate(from, { replace: true }), 400);
    } 
    catch (error) 
    
    
    {
      toast.error('Google login failed: ' + error.message);
    }
  };

  const passwordIsValid =
    formData.password.length >= 6 &&
    /[A-Z]/.test(formData.password) &&
    /[a-z]/.test(formData.password);

  const formIsValid =
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    passwordIsValid;

  return (
    <div className="auth-container">
      <Toaster position="top-right" />
      <div className="auth-card">



        <div className="auth-header">
          <h1 className="auth-title">
            
            
            📚 Join Book Haven
            
            
            </h1>
          <p className="auth-subtitle">
            
            
            Create your account to start reading
            
            
            </p>  </div>
      

        <form onSubmit={handleSubmit}>
          <div className="form-group">


            <label className="label">
              
              Name
              
              </label>
            <input
              type="text"
              name="name"
              value={formData.name}



              onChange={handleChange}
              className={`input ${errors.name ? 'input-error' : ''}`}
              required
            />
            {errors.name && <div className="error-text">{errors.name}</div>}
          </div>


          <div className="form-group">
            <label className="label">
              
              
              Email
              </label>
            <input
              type="email"


              name="email"
              value={formData.email}


              onChange={handleChange}
              className={`input ${errors.email ? 'input-error' : ''}`}


              required
            />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>

          <div className="form-group password-group">
            <label className="label">
              
              Password
              
              
              </label>
            <input
              type={showPassword ? 'text' : 'password'}



              name="password"
              

              onChange={handleChange}
              className={`input input-icon ${errors.password ? 'input-error' : ''}`}
              required
            />
            <div
              className="eye-icon"


              onClick={() => setShowPassword((p) => !p)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              title={showPassword ? 'Hide password' : 'Show password'}


            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>

            {errors.password && <div className="error-text">{errors.password}</div>}

            <div className="password-hints">
              <div className="hint-item">
                <span className={formData.password.length >= 6 ? 'valid' : ''}>
                  {formData.password.length >= 6 ? '✓' : '○'}
                </span>
                <span>At least 6 characters</span>

              </div>
              <div className="hint-item">
                <span className={/[A-Z]/.test(formData.password) ? 'valid' : ''}>
                  {/[A-Z]/.test(formData.password) ? '✓' : '○'}
                </span>
                <span>One uppercase letter</span>
              </div>
              <div className="hint-item">
                <span className={/[a-z]/.test(formData.password) ? 'valid' : ''}>



                  {/[a-z]/.test(formData.password) ? '✓' : '○'}
                </span>



                <span>
                  
                  
                  One lowercase letter
                  
                  
                  </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!formIsValid}
            className={`btn ${formIsValid ? 'btn-register' : 'btn-disabled'}`}
          >
            Register
          </button>
        </form>

        <div className="divider">

          <div className="divider-line">

          </div>
          <span className="divider-text">
            
            
            
            OR
            
            </span>
          <div className="divider-line"></div>
        </div>

        <button className="btn btn-google" 
        
        
        onClick={handleGoogleLogin}>
          Continue with Google
        </button>

        <div className="auth-footer">
          Already have an account?{" "}
         
          <Link to="/login" state={{ from }} className="link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
