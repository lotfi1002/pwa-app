import React from 'react';

import { APP_NAME } from '../../utilities/Params';
import UserDropdown from './UserDropdown';
import NavbarButtons from './NavbarButtons';
import DateDisplay from './DateDisplay';



export const Navbar = () => { 

  return (
    <>
    <header id="header" class="navbar">
    <div className='container'>
      <a className="navbar-brand" href="\pos">
        <span className="logo">
          <span className="pos-logo-lg">{APP_NAME}</span>
          <span className="pos-logo-sm">pwa</span>
        </span>
      </a>

      <div className="header-nav pull-right">
              <ul className="nav">
                      <DateDisplay/>
                      <NavbarButtons/>
                      <UserDropdown />
                </ul>
           
      </div>
    </div>
 
    </header>

</>
  )
}
