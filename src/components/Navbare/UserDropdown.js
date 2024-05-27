import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks/AuthProvider';
import UserDao from '../../dao/UserDao';


const UserDropdown = () => {

  const [user, setUser] = useState({username : ''});
    const auth = useAuth();
  const handleLogout = () => {
    auth.logOut();
  };

  useEffect( () => {
   
      const fetchUserData  = async ()=>{

        try {  
          const id = localStorage.getItem("user_id") ;
          console.log(id);
          const response = await  UserDao.getUserById(id);

          if(response != null ){
            console.log(response.username) ;
            setUser({username : response.username});
          }else {

            setUser({
              username: '',
              email: ''
              
            });
          }
          
    
        }catch (error) {
          console.error('Error fetching user data:', error);
          setUser({
            username: '',
            email: ''
            
          });
        }

      }
      
    fetchUserData();
  } , []) ;
 

  return (
    <ul className="nav  align-items-left">
    <li className="nav-item">
    <DropdownButton
      id="dropdown-basic-button"
      title={
        <div className="d-flex align-items-center">
          <img
            alt=""
            src="images/male.png"
            className="mini_avatar img-rounded"
            style={{ width: '30px', marginRight: '10px' }}
          />
          <div className="user">
            <span>{user.username}</span>
          </div>
        </div>
      }
      className="btn account"
    >
      <Dropdown.Item href="/profile">
        <FontAwesomeIcon icon={faUser} /> Profile
      </Dropdown.Item>
      <Dropdown.Item href="/change-password">
        <FontAwesomeIcon icon={faKey} /> Mot de passe
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOut} /> Logout
      </Dropdown.Item>
    </DropdownButton>
    </li>
          </ul>
  );
};

export default UserDropdown;
