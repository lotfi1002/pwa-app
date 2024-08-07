import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEdit, FaEye, FaEyeSlash, FaSign } from "react-icons/fa";
import { isAppOnline } from "../utilities/CheckOnline";
import { useAuth } from "../hooks/AuthProvider";
import "../css/login.css";
import "../css/style.css";

export const LoginPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const selectIdentityRef = useRef(null);
  const identityInputRef = useRef(null);
  const identityUserNameRef = useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const onlineSubmit = async () => {
    let data = { username: username, password: password };
    auth.loginAction("api/auth" ,data);
  };

  const offlinelineSubmit = async () => {
    let data = { username: username, password: password };
    await auth.loginActionOffline(data).then((response) => {
      if (response === true) {
        console.log("redirect to page");
        navigate('/pos');
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    isAppOnline().then((value) => {
      if (value){ // online mode
        onlineSubmit().then(() => {
          console.log("token :" + localStorage.getItem('token'));
        });
        console.log("is online");

      }
      else // offline mode
        offlinelineSubmit();
        console.log("is offline");

    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const replaceWithInput = () => {
    const selectIdentityElement = selectIdentityRef.current;
    const identityInputElement = identityInputRef.current;
    const userNameInput = identityUserNameRef.current;
    selectIdentityElement.style.display = "none";
    identityInputElement.style.display = "inline-block";
    userNameInput.style.display = "none";
  };

  return (
   <>
   <body class="login-page">
    <noscript>
        <div class="global-site-notice noscript">
            <div class="notice-inner">
                <p>
                    <strong>JavaScript seems to be disabled in your browser.</strong>
                    You must have JavaScript enabled in
                    your browser to utilize the functionality of this website.
                </p>
            </div>
        </div>
    </noscript>
   <div className="page-back">
   <div className="contents">
      <div id="login">
         <div className="container">
            <div className="login-form-div">
               <div className="login-content">
                  <div className="div-title col-sm-12">
                     <h3 className="text-primary"
                      style={{
                        padding: "0px",
                        fontFamily: "Ubuntu, sans-serif",
                        fontSize: "15px",
                        lineHeight: "15px",
                        margin: "0px",
                      }}>
                        Veuillez vous connecter à votre compte.
                     </h3>
                  </div>
                  <form onSubmit={handleSubmit}>
                     <div className="col-sm-12">
                        <div className="textbox-wrap form-group">
                           <div className="input-group input-group-flex">
                              <span className="input-group-icon">
                                 <FaUser />
                              </span>
                              <select id="selectIdentity" ref={selectIdentityRef} className="form-control">
                                 <option value="JessT">Jessica TBP</option>
                                 <option value="marie">Marie TBP</option>
                                 <option value="florent">Florent TBP</option>
                                 <option value="jessica" selected>Jessica TOB</option>
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
                              <input
                              type="text"
                              placeholder=""
                              ref={identityUserNameRef}
                              className="form-control"
                              style={{
                                 padding: "0px",
                                 margin: "0px",
                                 boxShadow: "none",
                                 borderRadius: "0px",
                                 display: "none" ,
                               }}
                              
                              />
                              <span className="input-group-edit" onClick={replaceWithInput}>
                                 <FaEdit style={{
                                    padding: "0px",
                                    margin: "0px",
                                    width: "30px",
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                 }}/>
                              </span>
                              <input
                                 required="required"
                                 class="form-control"
                                 onChange={(e) => setUsername(e.target.value)}
                              name="identity"
                              id="identityInput"
                              ref={identityInputRef}
                              style={{ display: "none" }}
                              />
                           </div>
                        </div>
                        <div className="textbox-wrap form-group">
                           <div className="input-group input-group-flex">
                              <span className="input-group-icon">
                                 <FaLock style={{
                                    padding: "0px",
                                    margin: "0px",
                                    width: "30px",
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                 }}/>
                              </span>
                              <input
                              type={showPassword ? "text" : "password"}
                              required="required"
                              className="form-control"
                              name="password"
                              onChange={(e) => setPassword(e.target.value)}
                              style={{
                                 padding: "0px",
                                 margin: "0px",
                                 boxShadow: "none",
                                 borderRadius: "0px",
                               }}
                              />
                              <span className="input-group-icon" onClick={togglePasswordVisibility}>
                                 {showPassword ? 
                                 <FaEyeSlash  style={{
                                    padding: "0px",
                                    margin: "0px",
                                    width: "30px",
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                  }}/>
                                 : 
                                 <FaEye style={{
                                    padding: "0px",
                                    margin: "0px",
                                    width: "30px",
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                  }}/>
                                 }
                              </span>
                           </div>
                        </div>
                     </div>
                     <div className="form-action col-sm-12">
                        <div className="checkbox pull-left">
                           <div className="custom-checkbox"></div>
                           <span className="checkbox-text pull-left">
                           <input type="checkbox" />
                           <label htmlFor="remember"
                          style={{
                            padding: "0px",
                            margin: "0px",
                            cursor: "pointer",
                            fontWeight: 400,
                            marginBottom: "0px",
                            paddingLeft: "0px",
                            marginTop: "0px",
                          }}>Se rappeler de moi</label>
                           </span>
                        </div>
                        <button type="submit" className="btn btn-success pull-right">
                        &nbsp; <FaSign/> CONNEXION
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</body>
   </>
  );
};

export default LoginPage;
