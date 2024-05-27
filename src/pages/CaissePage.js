// CaissePage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CaisseRegisterServices from "../services/CaisseRegisterServices";
import { isOnline } from "../utilities/CheckOnline";
import DateTime from "../utilities/DateTime";
import CaisseRegisterDao from "../dao/CaisseRegisterDao";
import Layout from '../components/Layout/Layout';

import "../css/caissepage.css";

export const CaissePage = () => {
  const [inputValue, setInputValue] = useState(""); // etat local de la valeur 

  const navigate = useNavigate();

  
  // une fois le boutton est clique la valeur changera 
  const handleButtonClick = (value) => {
    setInputValue(inputValue + value);
  };

  const handlesave = () => {

    setInputValue(inputValue);
    // get user from localstorage 

    let user_id = localStorage.getItem('user_id');
    //console.log("user id :"+user_id );
        
    let data =  {
      "id" : parseInt(Date.now() * Math.random()) ,
      "user_id" : user_id,
      "cash_in_hand":inputValue,
      "date" : DateTime.getCurrentDateTime(),
      "status":"open",
      "commit": 0 ,

    };

// online 
if(isOnline()){

    // chek backend ciasse 
     CaisseRegisterServices.chekCaisse("api/caisse/check" ,  {'user_id':user_id}).then(

      (rep)=>{
          const {status , response} =  rep.data ;

          if(status){
            if(response !== false  ){ // resiter open

              // save or update the resgister in indexdb 
              let data =  {
                "id": response.id,
                "user_id" : response.user_id,
                "cash_in_hand":response.cash_in_hand,
                "date" : response.date,
                "status":response.status,
                "commit": 1 
              };
              // test if the user rigister open locally 

              CaisseRegisterDao.saveOrRegister(data.user_id , data);
              
              localStorage.setItem("isOpen" ,  1);
              navigate('/pos');

            }else { // register closed in the backend 

              CaisseRegisterServices.openCaisse( "api/caisse/open_caisse", data).then(
                    (rep)=>{

                      const {status , response} = rep.data ;

                      if(status){

                        if(response !== false ){
                                //in local  
                                CaisseRegisterDao.saveOrRegister(response.user_id , data );  
                                localStorage.setItem('isOpen' , 1);
                                navigate("/pos");
                        }}});}}});

  }else{
  //is offline 
  CaisseRegisterDao.saveOrRegister(data.user_id , data);
  // local storage flag 
  localStorage.setItem('isOpen' , 1);
  navigate("/pos");
}
  
  };

  return (
    <>
   <Layout>
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
      </Layout>
    </>
  );
};

export default CaissePage;
