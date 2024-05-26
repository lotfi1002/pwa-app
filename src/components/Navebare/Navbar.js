import React from 'react';

import { APP_NAME } from '../../utilities/Params';
import "../../css/navbare.css";
import UserDropdown from '../UserDropdown';
import NavbarButtons from '../NavbarButtons';



export const Navbar = () => {

      

  return (
    <>
    <header id="header" class="navbar">
    <div className="container">
      <a className="navbar-brand" href="\pos">
        <span className="logo">
          <span className="pos-logo-lg">{APP_NAME}</span>
          <span className="pos-logo-sm"></span>
        </span>
      </a>

      <div className="header-nav">
       
              <UserDropdown />
         
         <NavbarButtons/>
        
            <ul class="nav navbar-nav pull-right hidden-smallest">
                    <li class="dropdown">
                        <button href="/" class="btn bblack" style={{cursor:'default'}}><span id="display_time"></span></button>
                    </li>
            </ul>

            </div>
    </div>
 
    </header>






</>
  )
}
