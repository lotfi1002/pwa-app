import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";
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

  const onlineSubmit = async (event) => {
    let data = { username: username, password: password };
    auth.loginAction(data, "/dashboard");
  };

  const offlinelineSubmit = async (event) => {
    let data = { username: username, password: password };
    await auth.loginActionOffline(data).then((response) => {
      if (response === true) {
        console.log("redirect to page");
        navigate(`/dashboard?username=${username}&password=${password}`);
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    isAppOnline().then((value) => {
      if (value) // online mode
        onlineSubmit().then(() => {
          console.log("token :" + localStorage.getItem('token'));
        });
      else // offline mode
        offlinelineSubmit();
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
    <div className="page-back">
      <div className="contents">
        <div id="login">
          <div className="container">
            <div className="login-form-div">
              <div className="login-content">
                <div className="div-title col-sm-12">
                  <h3 className="text-primary">
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
                          style={{ display: "none" }}
                        />

                        <span className="input-group-edit" onClick={replaceWithInput}>
                          <FaEdit />
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
                          <FaLock />
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          required="required"
                          className="form-control"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="input-group-icon" onClick={togglePasswordVisibility}>
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="form-action col-sm-12">
                    <div className="checkbox pull-left">
                      <div className="custom-checkbox"></div>
                      <span className="checkbox-text pull-left">
                        <input type="checkbox" />
                        <label htmlFor="remember">Se rappeler de moi</label>
                      </span>
                    </div>
                    <button type="submit" className="btn btn-success pull-right">
                      &nbsp; <i className="fa fa-sign-in"></i>CONNEXION
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
