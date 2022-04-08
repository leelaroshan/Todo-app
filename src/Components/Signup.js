import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Signup() {
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

  const [usersList, setUsersList] = useState([]);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
const [ isRegisterd, setIsRegisterd] = useState(false)
  const [errors, setErrors] = useState({ userName: '', password: '' });

  const handleChange = (e, id) => {
    if (id === 'userName') {
      setUserName(e.target.value);
    }
    if (id === 'password') {
      setPassword(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let userObj = {
      email: userName,
      password: password,
      user_id: small_id,
    };

    setUsersList([...usersList, userObj]);
     setIsRegisterd(true);

     if (isRegisterd) {
       Swal.fire({
         title: `successfully  Registerd please login`,
       }).then(function () {
         let url = window.location.origin;
         console.log(url)
         window.location = url + '/login';
       });
     }
    setUserName('');
    setPassword('');
   
   
   
    
  };

  useEffect(() => {
    if (localStorage.getItem('users_list')) {
      const newList = JSON.parse(localStorage.getItem('users_list'));
      setUsersList(newList);
      return;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('users_list', JSON.stringify(usersList));
  }, [usersList]);
  // const handlePasswordChange = (e,id) => {
  //   setPassword(e.target.value);
  // };

  return (
    <div className="signup_form_container">
      <h3>Signup</h3>
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
       <p>Password must be 8 Characters</p>
        {errors.password && <p>{errors.password}</p>}

        {userName && password.length>7 ? (
          <button type="submit" class="btn btn-primary" onClick={onSubmit}>
            Submit
          </button>
        ) : (
          <button type="submit" class="btn btn-primary" disabled onClick={onSubmit}>
            Submit
          </button>
        )}

      
      </form>

      <p>
        Already have an account <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
