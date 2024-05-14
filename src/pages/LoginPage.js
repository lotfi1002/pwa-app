// LoginPage.js
import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import '../css/style.css';



// js code for dynamic behaviore 
export const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/dashboard?username=${username}&password=${password}`);
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
                                <h3 class="text-primary"> Veuillez vous connecter à votre compte.</h3>
                            </div>
         <form onSubmit={handleSubmit}>

          <div class="col-sm-12">
						<div class="textbox-wrap form-group">
							<div class="input-group">
								<span class="input-group-addon"><i class="fa fa-user"></i></span>
								<select id="selectIdentity"  >
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
								<span class="input-group-addon" onclick="replaceWithInput()"><i class="fa fa-pencil"></i></span>
								<input type="hidden" value="" required="required" class="form-control" onChange={(e) => setUsername(e.target.value)} name="identity"  id="identityInput"/>
							</div>
						</div>
						<div class="textbox-wrap form-group">
							<div class="input-group">
								<span class="input-group-addon"><i class="fa fa-key"></i></span>
								<input type="password" value="12345" required="required" class="form-control " name="password"  onChange={(e) => setPassword(e.target.value)}/>
								<span class="input-group-addon" onclick="togglePasswordVisibility()"><i class="fa fa-eye"></i></span>
							</div>
						</div>
					</div>  

          <div class="form-action col-sm-12">
                                <div class="checkbox pull-left">
                                    <div class="custom-checkbox">
                                    </div>
                                    <span class="checkbox-text pull-left"><label for="remember">Se rappeler de moi</label></span>
                                </div>
                                <button type="submit" class="btn btn-success pull-right"> &nbsp; <i class="fa fa-sign-in"></i></button>
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
