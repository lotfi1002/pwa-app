import React from 'react';

import { APP_NAME } from '../../utilities/Params';
import UserDropdown from './UserDropdown';
import NavbarButtons from './NavbarButtons';
import DateDisplay from './DateDisplay';



export const Navbar = () => { 

  return (
    <>
     <div className="container"  style={{display:'block'}}>
       <a
            className="navbar-brand"
            href="\pos"
            tabIndex="-1">
        
                <span
                    className="pos-logo-lg"
                    style={{
                      padding: "0px",
                      margin: "0px",
                      color: "rgb(255, 255, 255)",
                      textShadow: "none",
                    }}
                  >
                    {APP_NAME}
                </span>
               
          </a>
    
          <div
            className="header-nav">
                      <DateDisplay/>
                      <NavbarButtons/>
                      <UserDropdown />
                      
      
      </div>
    </div>
</>
  )
}
