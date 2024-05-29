import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faCalculator, faKey, faPlay, faLaptop, faTh, faCheckCircle, faTimesCircle, faDollar, faPlusCircle, faEraser } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Button, Modal } from 'react-bootstrap';
import { useAuth } from '../../hooks/AuthProvider';
import CaisseRegisterServices from '../../services/CaisseRegisterServices';
import CaisseRegisterDao from '../../dao/CaisseRegisterDao';
import DateTime from '../../utilities/DateTime';
import { isOnline } from '../../utilities/CheckOnline';

const NavbarButtons = () => {

    const auth = useAuth();

 // champs de fermer caisse 
 const [totaljournne , setTotalJournne] = useState('');
 const [totalcarte , setTotalCarte] = useState('');
 const [vespece , setVespece] = useState('');

 const [show, setShow] = useState(false);

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
                 
               closeMycaisse(user_id , data);

            }}});
            
           
         }
       }
 
   } 


   const closeMycaisse = async (user_id , data)=>{

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

    );
   }
   const handleShow = () => setShow(true);
 
    return (
      <>
      <li className="nav-item">
         <Button className="btn pos-tip" title="dashboard" data-placement="bottom">
            <FontAwesomeIcon icon={faDashboard} />
         </Button>
      </li>
      <li className="nav-item">
         <Dropdown>
            <Dropdown.Toggle className="btn pos-tip" title="calculator" data-placement="bottom">
               <FontAwesomeIcon icon={faCalculator} />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu pull-right calc">
      <li className="dropdown-content">
      <span id="inlineCalc"></span>
      </li>
      </Dropdown.Menu>
      </Dropdown>
      </li>
      <li className="nav-item">
         <Button className="btn pos-tip" title="shortcuts" data-placement="bottom" data-toggle="modal" data-target="#sckModal">
            <FontAwesomeIcon icon={faKey} />
         </Button>
      </li>
      <li className="nav-item">
         <Button className="btn pos-tip" title="pole_display" data-placement="bottom" id="rfd-pole-connect">
            <FontAwesomeIcon icon={faPlay} />
         </Button>
      </li>
      <li className="nav-item">
         <Button className="btn pos-tip" title="view_bill_screen" data-placement="bottom" id="ouvrirFenetre" >
            <FontAwesomeIcon icon={faLaptop} />
         </Button>
      </li>
      <li className="nav-item">
         <Button className="btn pos-tip" id="opened_bills" title="suspended_sales" data-placement="bottom" data-html="true" data-toggle="ajax">
            <FontAwesomeIcon icon={faTh} />
         </Button>
      </li>
      <li className="nav-item">
         <Button className="btn pos-tip" id="register_details" title="register_details" data-placement="bottom" data-html="true" data-toggle="modal" data-target="#myModal">
            <FontAwesomeIcon icon={faCheckCircle} />
         </Button>
      </li>
      <li className="nav-item">
         <Button className="btn pos-tip" id="close_register" title="close_register"  onClick={() =>
            {
            if(!isOnline()){
            auth.logOut();   
            }
            handleShow();
            }}  data-placement="bottom" data-html="true" data-backdrop="static">
            <FontAwesomeIcon icon={faTimesCircle} />
         </Button>
      </li>
      <li className="nav-item">
         <Button className="btn pos-tip" id="add_expense" title="add_expense" data-placement="bottom" data-html="true" data-toggle="modal" data-target="#myModal">
            <FontAwesomeIcon icon={faDollar} />
         </Button>
      </li>
      <li className="nav-item">
         <Button className="btn pos-tip" id="addManuallyTransfer"  title="addManuallyTransfer" data-placement="bottom" data-html="true">
            <FontAwesomeIcon icon={faPlusCircle} />
         </Button>
      </li>
      <li className="nav-item">
         <Button className="btn pos-tip" id="clearLS"  title="clear_ls" data-placement="bottom" data-html="true">
            <FontAwesomeIcon icon={faEraser} />
         </Button>
      </li>
      <Modal  show={show} onHide={handleClose}>
         <Modal.Title>FERMER LA CAISSE</Modal.Title>
         <Modal.Body>
            <div>
               <form onSubmit={handleClose}>
                  <label>TOTAL ESPECE JOURNEE :</label>
                  <input type="number"  required onChange={(e) => setTotalJournne(e.target.value)} 
                  />
                  <label>Total des relevés de carte bancaire : </label>
                  <input type="number"  required onChange={(e) => setTotalCarte(e.target.value)} />
                  <label>VERSEMENT ESPECE JOURNEE : </label>
                  <input type="number" required onChange={(e) => setVespece(e.target.value)} />
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
    ) ;

}

export default NavbarButtons;
