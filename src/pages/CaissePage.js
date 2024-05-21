// CaissePage.js
import React, { useState } from "react";
import "../css/CaissePage.css";
import { useNavigate } from "react-router-dom";
import CaisseRegisterServices from "../services/CaisseRegister";
import { isOnline } from "../utilities/CheckOnline";
import DateTime from "../utilities/DateTime";
import CaisseRegisterDao from "../dao/CaisseRegisterDao";

export const CaissePage = () => {
  const [inputValue, setInputValue] = useState(""); // etat local de la valeur 
  
  const navigate = useNavigate();
  
  // une fois le boutton est clique la valeur changera 
  const handleButtonClick = (value) => {
    setInputValue(inputValue + value);
  };

  const handlesave = () => {

    setInputValue(inputValue);
    console.log(inputValue);
    // get user from localstorage 
    let user_id = localStorage.getItem('user_id');
    console.log("user id :"+user_id );
    
    //let data = new PosRegiste(user_id ,inputValue);
    
    
    let data =  {
      
      "user_id" : user_id,
      "cash_in_hand":inputValue,
      "date" : DateTime.getCurrentDateTime(),
      "status":"open"

    };
// online 



if(isOnline()){
    CaisseRegisterServices.openCaisse( "api/caisse/open_caisse", data).then(
      (response)=>{
      
          if(response != null && response.data != null 
             && response.data.status === true  && 
                      response.data.response === true){
                console.log("open");
                localStorage.setItem('isOpen' , 1);
                navigate("/pos");
            
              }else{// error or token expiration 

              if(response.data.error != null && 
                response.data.error === "Failed to access"){
                  navigate("/login");
                }
                console.log(response.data.response);
                console.log("close");
                localStorage.setItem('isOpen' ,0);

            }
        
      }
    );
  }

  // offline and online
  // save in indexdv table pos_--register 
  CaisseRegisterDao.openRegister(data);
  // local storage flag 
  localStorage.setItem('isOpen' , 1);


  

 
  
  };

  return (
    <>
  
      <div className="title">Fond de la caisse</div>
      <input
        type="text"
        placeholder="Entrez le fond de caisse"
        value={inputValue}
      />
      <button onClick={() => handlesave()}>Ouvrire caisse</button>
      <table id="calcu" className="caisse-table">
        <tbody>
        <tr> Ouvrir la caisse </tr>

          <tr>
           
            
          </tr>
          <tr>
            <td><input type="button" value="C" onClick={() => setInputValue("")} /></td> {}
            <td><input type="button" value="1" onClick={() => handleButtonClick("1")} /></td>
            <td><input type="button" value="2" onClick={() => handleButtonClick("2")} /></td>
            <td><input type="button" value="3" onClick={() => handleButtonClick("3")} /></td>
          </tr>
          <tr>
            <td><input type="button" value="." onClick={() => handleButtonClick(".")} /></td>
            <td><input type="button" value="4" onClick={() => handleButtonClick("4")} /></td>
            <td><input type="button" value="5" onClick={() => handleButtonClick("5")} /></td>
            <td><input type="button" value="6" onClick={() => handleButtonClick("6")} /></td>
          </tr>
          <tr>
            <td><input type="button" value="0" onClick={() => handleButtonClick("0")} /></td>
            <td><input type="button" value="7" onClick={() => handleButtonClick("7")} /></td>
            <td><input type="button" value="8" onClick={() => handleButtonClick("8")} /></td>
            <td><input type="button" value="9" onClick={() => handleButtonClick("9")} /></td>
          </tr>
        </tbody>
      </table>
      
    </>
  );
};

export default CaissePage;
