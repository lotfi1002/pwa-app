// LoginPage.js
import "../css/login.css";
import "../css/style.css";

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEdit } from "react-icons/fa";
import { isAppOnline } from "../utilities/CheckOnline";
import { useAuth } from "../hooks/AuthProvider";

// js code for dynamic behaviore
export const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


// references of html items 
  const selectIdentityRef = useRef(null);
  const identityInputRef = useRef(null);
  const identityUserNameRef = useRef(null);
  const auth = useAuth(); 
  
  // online connection to backendapi 
  const onlineSubmit = async (event)=>{
   
    let data  ={'username' : username , 'password' : password } ;
     auth.loginAction(data , "/dashboard") ;
  }

  // offline connection with local storage 
  const offlinelineSubmit = async (event)=>{
    let data  ={'username' : username , 'password' : password } ;
    await auth.loginActionOffline(data).then( (response)=>{
      
      if(response === true){
        console.log("redirect to page ");
        navigate(`/dashboard?username=${username}&password=${password}`);
      }
    } );

   
  }

// action on button 
  const handleSubmit = (event) => {
       event.preventDefault();

    isAppOnline().then((value)=>{

      if(value)  // online mode
        onlineSubmit().then(()=>{
          console.log("token :"+ localStorage.getItem('token'));
        });
      else  // offline mode 
        offlinelineSubmit();
    });
     
    
  };

  const togglePasswordVisibility = () => {
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };

  const replaceWithInput = () => {
    const selectIdentityElement = selectIdentityRef.current;
    const identityInpuElement = identityInputRef.current;
    const userNameInput = identityUserNameRef.current;
    selectIdentityElement.style.display = "none";
    identityInpuElement.style.display = "inline-block";
    userNameInput.placeholder = "Utilisateurs  ";
  };

  return (
    <>
      <div class="page-back">
        <div class="contents">
          <div id="login">
            <div class="container">
              <div class="login-form-div">
                <div class="login-content">
                  <div class="div-title col-sm-12">
                    <h3 class="text-primary">
                      {" "}
                      Veuillez vous connecter à votre compte.
                    </h3>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div class="col-sm-12">
                      <div class="textbox-wrap form-group">
                        <div class="input-group">
                          <span class="input-group-addon">
                            <i class="fa fa-user"></i>
                          </span>
                          <select id="selectIdentity" ref={selectIdentityRef}>
                            <option value="JessT">Jessica TBP</option>
                            <option value="marie">Marie TBP</option>
                            <option value="florent">Florent TBP</option>
                            <option value="jessica" selected>
                              Jessica TOB
                            </option>
                            <option value="marietobalco">Marie TOB</option>
                            <option value="patricia">Patricia TOB</option>
                            <option value="agnes">Agnes TOB</option>
                            <option value="senia">Senia TOB</option>
                            <option value="anthonyT">Anthony TOB</option>
                            <option value="florent tobalco">Florent TOB</option>
                            <option value="mateo">Mateo TOB</option>
                            <option value="anthonyD">Anthony Dépot</option>
                            <option value="mattdepot">Mateo Depot</option>
                            <option value="sam1@oki.lu">Samuel M1</option>
                            <option value="sam2@oki.lu">Samuel M2</option>
                            <option value="sam3@oki.lu">Samuel D1</option>
                          </select>
                          <FaUser />
                          <input
                            type="text"
                            placeholder=""
                            ref={identityUserNameRef}
                          />
                          <FaEdit onClick={replaceWithInput} />{" "}
                          <span
                            class="input-group-addon"
                            onclick={replaceWithInput}
                          >
                            <i class="fa fa-pencil"></i>
                          </span>
                          <input
                            
                            required="required"
                            class="form-control"
                            onChange={(e) => setUsername(e.target.value)}
                            name="identity"
                            id="identityInput"
                            ref={identityInputRef}
                          />
                        </div>
                      </div>
                      <div class="textbox-wrap form-group">
                        <div class="input-group">
                          <span class="input-group-addon">
                            <i class="fa fa-key"></i>
                          </span>
                          <input
                            type="password"
                            required="required"
                            class="form-control "
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <FaLock />

                          <span
                            class="input-group-addon"
                            onclick={togglePasswordVisibility}
                          >
                            <i class="fa fa-eye"></i>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="form-action col-sm-12">
                      <div class="checkbox pull-left">
                        <div class="custom-checkbox"></div>
                        <span class="checkbox-text pull-left">
                          <input type="checkbox" />

                          <label for="remember">Se rappeler de moi</label>
                        </span>
                      </div>
                      <button type="submit" class="btn btn-success pull-right">
                        {" "}
                        &nbsp; <i class="fa fa-sign-in"></i>CONNEXION
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
