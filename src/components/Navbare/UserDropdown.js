import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import UserDao from '../../dao/UserDao';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';


const UserDropdown = () => {

  const [user, setUser] = useState({
    id: '',
    username : '' ,
    password : '',
    email:'',
    gender : '',

  });
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
            setUser({
              id: response.id,
              username : response.username ,
              password : response.password,
              email:response.email,
              gender : response.gender,
              });
          }else {

            setUser({
              id: '',
              username : '' ,
              password : '',
              email:'',
              gender : '',
              
            });
          }
          
    
        }catch (error) {
          console.error('Error fetching user data:', error);
          setUser({
            id: '',
            username : '' ,
            password : '',
            email:'',
            gender : '',
            
          });
        }

      }
      
    fetchUserData();
  } , []) ;


 

  return (
    <>
      <ul
              className="nav navbar-nav pull-right"
              style={{ padding: "0px", margin: "0px" }}
            >
           <li
                className="dropdown"
                style={{ padding: "0px", margin: "0px" }}
              >
      <DropdownButton
       id="dropdown-basic-button"
       title={
       <div className="d-flex align-items-center">
          <img
          alt=""
          src={(user.gender === "female")? 'images/female.png' :'images/male.png'}
          className="mini_avatar img-rounded"
           style={{
                      padding: "0px",
                      margin: "-8px 8px -8px 0px",
                      cssFloat: "left",
                      maxHeight: "36px",
                    }}
          />
          <div className="user">
          <span style={{ padding: "0px", margin: "0px" }}>Bienvenue {user.username}</span>
          </div>
       </div>
       
       }
      
       style={{
        outline: "0px",
        border: "none",
        display: "inline-block",
        textAlign: "center",
        boxShadow: "none",
        position: "relative",
        minWidth: "30px",
        fontSize: "12px",
        background: "transparent",
        margin: "0px 0px 0px 3px",
        height: "40px",
        width: "auto",
        borderRadius: "0px",
        color: "transparent",
        textShadow: "none",
        
        
      }}
       >
       <Dropdown.Item href="/profile">
          <FontAwesomeIcon icon={faUser} />
          Profile
       </Dropdown.Item>
       <Dropdown.Item href="/change-password">
          <FontAwesomeIcon icon={faKey} />
          Mot de passe
       </Dropdown.Item>
       <Dropdown.Divider />
       <Dropdown.Item onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOut} />
          Logout
       </Dropdown.Item>
       </DropdownButton>
             
             
            </li>
    </ul>
    </>
  );
};

export default UserDropdown;
