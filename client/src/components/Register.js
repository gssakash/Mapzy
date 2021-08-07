import React,{ useState,useRef } from 'react'
import './register.css';
import axios from 'axios';
import { Room,Cancel } from '@material-ui/icons';

function Register({setShowRegister}) {

  const [success,setSuccess] = useState(false);
  const [error,setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username:nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value
    }

    try{
      await axios.post("/users/register", newUser);
      setError(false);
      setSuccess(true);
    }
    catch(err){
      setError(true);
    }
  }

  return (
    <div className="registerContainer">
      <div className="logo">
        <Room />
        Mapzy
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" id="register-input" ref={nameRef}/>
        <input type="email" placeholder="email" id="register-input" ref={emailRef}/>
        <input type="password" placeholder="password" id="register-input" ref={passwordRef}/>
        <button className="registerBtn">Register</button>
        {
          success && (
            <span className="success">Successful. You can Login Now!</span>
          )
        }
        {
          error && (
          <span className="failure">Wrong Credentials. Try again.</span>
          )
        }
      </form>
      <Cancel className="registerCancel" onClick={() => setShowRegister(false)}/>
    </div>
  )
}

export default Register
