import React from 'react';

import { APP_NAME } from '../../utilities/Params';
import UserDropdown from './UserDropdown';
import NavbarButtons from './NavbarButtons';
import DateDisplay from './DateDisplay';



export const Navbar = () => { 

  return (
    <>
    <header id="header" class="navbar">
    <div >
      <a className="navbar-brand" href="\pos">
        <span className="logo">
          <span className="pos-logo-lg">{APP_NAME}</span>
          <span className="pos-logo-sm"></span>
        </span>
      </a>

      <div className="header-nav">
       
              <DateDisplay/>
         
              <NavbarButtons/>

              <UserDropdown />
        
           

            </div>
    </div>
 
    </header>

</>
  )
}
