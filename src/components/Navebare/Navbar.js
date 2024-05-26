import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthProvider';
import { isOnline } from '../../utilities/CheckOnline';
import { Modal, Button } from "react-bootstrap";
import CaisseRegisterDao from '../../dao/CaisseRegisterDao';
import CaisseRegisterServices from '../../services/CaisseRegisterServices';
import DateTime from '../../utilities/DateTime';
import { APP_NAME } from '../../utilities/Params';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator, faCheckCircle, faDashboard, faDollar, faEraser, faKey, faLaptop, faPlay, faPlusCircle, faSignOut, faTh, faTimesCircle, faUser } from '@fortawesome/free-solid-svg-icons'
import "../../css/navbare.css";
import UserDropdown from '../UserDropdown';


export const Navbar = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [show, setShow] = useState(false);
    // champs de fermer caisse 
    const [totaljournne , setTotalJournne] = useState('');
    const [totalcarte , setTotalCarte] = useState('');
    const [vespece , setVespece] = useState('');


// close modale window 
  const handleClose = () =>{
    
    setShow(false);
  
    if(totaljournne != null && totalcarte!= null 
      && vespece !== null){
        let user_id = localStorage.getItem("user_id");
       
        if(user_id != null){

           // check if it is a register already opened in backend 

           CaisseRegisterServices.chekCaisse("api/caisse/check" ,  {'user_id':user_id}).then(

            (rep)=>{
              const { status , response} = rep.data ;
            
              if(status){
                if(response === false){ 
                  CaisseRegisterDao.getOpenRegisterByUserId(user_id).then(
                    
                    (rep)=>{

                      if(rep != null){

                        CaisseRegisterDao.updateRegister(rep.id , {
                        "status":"closed",
                        "commit": 1 } );


                      }
                      localStorage.setItem("isOpen" , 0);
                        auth.logOut();
                    }

                  );
                
                }else{// open caisse from backend in indexdb
                 /* 
                  let data_back =  {
                    "id": response.id,
                    "user_id" : response.user_id,
                    "cash_in_hand":response.cash_in_hand,
                    "date" : response.date,
                    "status":response.status,
                    "commit": 1 
                  };*/

              let data =       { 
              "user_id" : user_id,
              "id_register":response.id ,
              "closed_at"  : DateTime.getCurrentDateTime()           ,
              "total_cash": totaljournne,
              "total_cheques" : 0,
              "total_cc_slips" : totalcarte,
              "total_ba": 0,
              "total_returned" : 0,
              "total_refunds" : 0,
              "total_cash_submitted": vespece,
              "total_cheques_submitted"  : 0,
              "total_cc_slips_submitted" : 0,
              "note": vespece,
              "status": "closed",
              "transfer_opened_bills": 0 ,
              "closed_by": user_id 
              } ;
                
              CaisseRegisterServices.closeCaisse("api/caisse/close_caisse" , data ).then(

                    (rep)=>{

                      const {status , response } = rep.data ;

                      if(status && response){

                        //  close local data of indexdb 

                        CaisseRegisterDao.getOpenRegisterByUserId(user_id).then(
                          (rep)=>{

                            if(rep){

                              CaisseRegisterDao.updateRegister(rep.id , data);
                              
                            }

                          }

                        );

                      }

                      localStorage.setItem("isOpen" , 0);
                        auth.logOut();

                    }

                  );}}});
           
          
        }
      }

  } 
  const handleShow = () => setShow(true);


  return (
    <>
    <header id="header" class="navbar">
      <div class="container">
            <a class="navbar-brand" href="\pos"><span class="logo"><span class="pos-logo-lg">{APP_NAME}</span><span class="pos-logo-sm"></span></span></a>

            <div class="header-nav">
            <ul class="nav navbar-nav pull-right">
            <li className="nav-item">
              <UserDropdown />
          </li>
            </ul>
            <ul class="nav navbar-nav pull-right">
            <li class="dropdown hidden-xs hidden-small">
                        <button class="btn pos-tip" title="dashboard" 
                        data-placement="bottom" >
                        <FontAwesomeIcon icon={faDashboard} />  
                        </button>
            </li>
            <li class="dropdown hidden-xs hidden-small">
                        <button class="btn pos-tip" title="calculator" 
                        data-placement="bottom"  data-toggle="dropdown">
                        <FontAwesomeIcon icon={faCalculator} />
                        </button>
                        <ul class="dropdown-menu pull-right calc">
                            <li class="dropdown-content">
                                <span id="inlineCalc"></span>
                            </li>
                        </ul>
                    </li>
                    <li class="dropdown hidden-sm hidden-small">
                        <button class="btn pos-tip" title="shortcuts" data-placement="bottom" 
                         data-toggle="modal" data-target="#sckModal">
                        <FontAwesomeIcon icon={faKey} />
                        </button>
                    </li>
                    <li class="dropdown hidden-sm hidden-small">
                        <button   type="button" class="btn pos-tip" title="pole_display" 
                        data-placement="bottom" id="rfd-pole-connect">
                        <FontAwesomeIcon icon={faPlay} />
                        </button>
                    </li>
                    <li class="dropdown hidden-sm hidden-small">
                        <button class="btn pos-tip" title="view_bill_screen" 
                        data-placement="bottom"  id="ouvrirFenetre"target="_blank">
                        <FontAwesomeIcon icon={faLaptop} />
                        </button>
                    </li>
                    <li class="dropdown hidden-sm hidden-small">
                        <button class="btn pos-tip" id="opened_bills" title="suspended_sales" 
                        data-placement="bottom" data-html="true"  data-toggle="ajax">
                        <FontAwesomeIcon icon={faTh} />
                        </button>
                    </li>
                    <li class="dropdown hidden-sm hidden-small" >
                        <button class="btn pos-tip" id="register_details" 
                        title="register_details" data-placement="bottom" data-html="true"  data-toggle="modal" data-target="#myModal">
                        <FontAwesomeIcon icon={faCheckCircle} />
                          
                        </button>
                    </li>
                    <li class="dropdown hidden-sm hidden-small">
                        <button class="btn pos-tip" id="close_register" title="close_register" 
                        onClick={() =>{
                          if(!isOnline()){
                            auth.logOut();   
                        }
                        handleShow();
            
                    }} data-placement="bottom hidden-sm hidden-small" data-html="true" data-backdrop="static" >
                        <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                    </li>
                    <li class="dropdown hidden-sm hidden-small">
                        <button class="btn  pos-tip" id="add_expense" title="<span>add_expense</span>" data-placement="bottom" data-html="true" data-toggle="modal" data-target="#myModal">
                        <FontAwesomeIcon icon={faDollar} />
                        </button>
                    </li>
					<li class="dropdown hidden-sm hidden-small">
                      <button class="btn  pos-tip" href="/" id="addManuallyTransfer">
                      <FontAwesomeIcon icon={faPlusCircle} />
                    
                    </button>
                    </li>
                    <li class="dropdown hidden-xs">
                        <button class="btn  pos-tip" title="clear_ls" data-placement="bottom" id="clearLS" href="/">
                        <FontAwesomeIcon icon={faEraser} />
                           
                        </button>
                    </li>
            </ul>
            <ul class="nav navbar-nav pull-right hidden-smallest">
                    <li class="dropdown">
                        <button href="/" class="btn bblack" style={{cursor:'default'}}><span id="display_time"></span></button>
                    </li>
            </ul>

            </div>
    </div>
 
    </header>




{/* this a modal window of  Fermer la caisse  */}
<Modal  show={show} onHide={handleClose}>
<Modal.Title>FERMER LA CAISSE</Modal.Title>
<Modal.Body> 
<div>
<form onSubmit={handleClose}>
<label>TOTAL ESPECE JOURNEE :</label>
<input type="number"   onChange={(e) => setTotalJournne(e.target.value)} value="0.00"
 />
<label>Total des relevés de carte bancaire : </label>
<input type="number"  value="0.00" onChange={(e) => setTotalCarte(e.target.value)} />
<label>VERSEMENT ESPECE JOURNEE : </label>
<input type="number" value="0.00" onChange={(e) => setVespece(e.target.value)} />
</form>

</div>



</Modal.Body>
<Modal.Footer>
<Button variant="primary" onClick={handleClose}>
  Fermer la caisse
</Button>
</Modal.Footer>
</Modal>


</>
  )
}
