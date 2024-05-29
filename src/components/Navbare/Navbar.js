import React from 'react';

import { APP_NAME, SUB_NAME } from '../../utilities/Params';
import UserDropdown from './UserDropdown';
import NavbarButtons from './NavbarButtons';
import DateDisplay from './DateDisplay';



export const Navbar = () => { 

  return (
    <>
     <div className="container"
          style={{ padding: "0px", margin: "0px", width: "100%" }}>
       <a
            className="navbar-brand"
            href="\pos"
            tabIndex="-1"
            style={{
              margin: "0px",
              color: "rgb(123, 123, 123)",
              textAlign: "left",
              position: "absolute",
              left: "15px",
              padding: "9px 0px 10px 10px",
            }}>
            <span
              className="logo"
              style={{
                padding: "0px",
                margin: "0px",
                fontWeight: "bold",
                wordSpacing: "-1px",
                color: "rgb(255, 255, 255)",
                textShadow: "none",
              }}
            >
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
                <span
                    className="pos-logo-sm"
                    style={{
                      padding: "0px",
                      margin: "0px",
                      display: "none",
                      color: "rgb(255, 255, 255)",
                      textShadow: "none",
                    }}
                  >
                    {SUB_NAME}
                </span>
            </span>
          </a>
    
          <div
            className="header-nav"
            style={{
              margin: "0px",
              padding: "0px",
              position: "relative",
              background: "rgb(0, 0, 0)",
              color: "rgb(255, 255, 255)",
            }}>
                      <UserDropdown />
                      <NavbarButtons/>
                      <DateDisplay/>      
      </div>
    </div>
</>
  )
}
