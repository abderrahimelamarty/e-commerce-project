import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {auth} from '../Config/Config'
import {fs} from '../Config/Config' 
import  { useState } from 'react'




export const Signup = () => {
  const history=useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const[ success,setsuccess]=useState('');
   


    const handlesignup=(e)=>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            console.log(cred);
            fs.collection('users').doc(cred.user.uid).set({
                Name: name,
                Email: email,
                Password: password
            }).then(() => {
                setsuccess('sign up succesfull');
                setName('');
                setEmail('');
                setPassword('');
                setError('');
               
            }).catch(error=> setError(error.message));
        }).catch(error => setError(error.message));
     //   console.log(name,email,password);
        
    }
  return (
    <div className='container'>
        <br></br>
        <br></br>
        <br></br>
        {success&&<>
          <div class="alert alert-success">
  <strong>{success}</strong> 
</div>
        <br></br>
        </>}
  <form action="/action_page.php" onSubmit={handlesignup}>
      <h1>Sign Up</h1>
      <hr></hr>
  <div className="mb-3 mt-3">
  <label for="name" className="form-label">Full Name:</label>
    <input type="text" className="form-control"  value="name"id="name" placeholder="Enter your name" name="Full name" required onChange={(e) => setName(e.target.value)} value={name}></input>
  
  </div>
  <div className='mb-3 mt-3'>
  <label for="email" className="form-label">Email:</label>
    <input type="email" className="form-control"  value="email" id="email" placeholder="Enter email" name="email"  onChange={(e) => setEmail(e.target.value)} value={email} required></input>
  </div>
  <div className="mb-3">
    <label for="pwd" className="form-label">Password:</label>
    <input type="password" className="form-control" value="psw" id="pwd" placeholder="Enter password" name="pswd" required onChange={(e) => setPassword(e.target.value)} value={password}></input>
  </div>
  <div className=" mb-3">
   <div className="btn-box">
   <span> Already Have an account Login <Link to={'/login'}> Here</Link></span>
       <button type="submit" className=" btn btn-success float-md-end ">Sign Up</button>

   </div>
  </div>
 
</form>
{error&&<>
  <div class="alert alert-danger">
    <strong>{error}</strong>
  </div>
        <br></br>
        </>}
    </div>
  )
}

