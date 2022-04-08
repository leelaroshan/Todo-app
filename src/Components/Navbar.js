import React from 'react'
import { Link } from 'react-router-dom';
export default function () {

    let activeUser = JSON.parse(localStorage.getItem('active_user'));

    const handleLogout = () => {
        localStorage.removeItem('active_user','');
    }

  return (
    <div className="navbar_container">
      <div>
        <h3> Todo App </h3>
      </div>
      <div>
        <ul style={{ listStyle: 'none', textDecoration: 'none' }}>
          <li>
       
          </li>
        </ul>
      </div>
    </div>
  );
}
