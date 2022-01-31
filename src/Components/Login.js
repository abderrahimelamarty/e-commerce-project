
   
import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../Config/Config';

export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const[ success,setsuccess]=useState('');
      const nav=useNavigate();
    const login = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password).then(()=>{
            setsuccess("Login Successful");
            nav("/", { replace: true });
        
        }).catch(error=>setError(error.message));
       
    }

    return (
        <div className='container'>
             {success&&<>
          <div class="alert alert-success">
  <strong>{success}</strong> 
</div></>
}
            <br />
            <h2>Login</h2>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={login}>
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required
                    onChange={(e) => setEmail(e.target.value)} value={email} />
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" className='form-control' required
                    onChange={(e) => setPassword(e.target.value)} value={password} />
                <br />
                <span>
              Don't Have an account Sign Up <Link to={"/signup"}> Here</Link>
            </span>
            <br></br>
            <br></br>
                <button type="submit" className='btn btn-success btn-md mybtn'>LOGIN</button>
            </form>
            <br></br>
            {error&&<>
  <div class="alert alert-danger">
    <strong>{error}</strong>
  </div>
        <br></br>
        </>}
            <br/>
           
        </div>
    )
}


