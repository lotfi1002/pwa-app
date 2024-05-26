import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../hooks/AuthProvider';


const UserDropdown = () => {

    const auth = useAuth();
  const handleLogout = () => {
    auth.logOut();
  };

  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={
        <div className="d-flex align-items-center">
          <img
            alt=""
            src="./images/male.png"
            className="mini_avatar img-rounded"
            style={{ width: '30px', marginRight: '10px' }}
          />
          <div className="user hidden-small">
            <span>User name</span>
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
  );
};

export default UserDropdown;
