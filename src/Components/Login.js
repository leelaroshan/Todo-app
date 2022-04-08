import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login() {
 



 
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');


  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();

  const handleChange = (e, id) => {
    

    if (id === 'userName') {
      setUserName(e.target.value);
    }
     if (id === 'password') {
       setPassword(e.target.value);
     }
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    let usersList = JSON.parse(localStorage.getItem('users_list'));
    console.log(usersList);
    

    setErrors(() => {
      let err = {};

      return err;
    });


    const result = usersList.find((el, index) => {
      return (el.email ===  userName) && (el.password = password);
    });

    console.log(result);

    if (result.user_id) {
       setIsLoggedIn(true);
      localStorage.setItem('active_user', JSON.stringify(result));
      localStorage.setItem('logged_In', true);
      console.log('clicked',);
     
    
       Swal.fire({
         title: `successfully  logged in `,

       });
        localStorage.setItem('is_logged_in', isLoggedIn);
      navigate('/todolist');
      
    }
    else {
           Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: 'User does not find!',
           });
    }

   

    // let  activeUser = JSON.parse(localStorage.getItem('active_user'));
    // console.log(activeUser);
   
  };

  useEffect(() => {
  
  }, []);

  return (
    <div className="login_form_container">
      <h3>Log In</h3>
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            User Name
          </label>
          <input
            name="userName"
            type="string"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={userName}
            onChange={(e) => handleChange(e, 'userName')}
            required
          />
        </div>
        {errors.userName && <p>{errors.userName}</p>}
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => handleChange(e, 'password')}
            required
          />
        </div>
        {errors.password && <p>{errors.password}</p>}
        {userName && password ? (
          <button type="submit" class="btn btn-primary" onClick={loginSubmit}>
            Submit
          </button>
        ) : (
          <button type="submit" class="btn btn-primary" disabled onClick={loginSubmit}>
            Submit
          </button>
        )}
      </form>
    </div>
  );
}
