import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faKey, faPlay, faLaptop, faTh, faCheckCircle, faTimesCircle, faDollar, faPlusCircle, faEraser, faCogs, faHourglassHalf, faHeart, faList } from '@fortawesome/free-solid-svg-icons';
import {  Button, Modal } from 'react-bootstrap';
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

          ); }

        localStorage.setItem("isOpen" , 0);
          auth.logOut();

      }
    );
   }
   const handleShow = () => setShow(true);
 
    return (
      <>
      <ul
              className="nav navbar-nav pull-right"
              style={{ padding: "0px", margin: "0px", display:"flex", alignItems: "center"}}
            >
      
            <li
                     className="dropdown"
                     style={{ padding: "0px", margin: "0px" }}
                  >
                     <a
                        className="btn bblue pos-tip"
                        href="/"
                        tabIndex="-1"
                        title="Tableau de bord"
                        style={{
                        outline: "0px",
                        border: "none",
                        display: "inline-block",
                        textAlign: "center",
                        boxShadow: "none",
                        margin: "5px 3px",
                        position: "relative",
                        height: "30px",
                        minWidth: "40px",
                        width: "auto",
                        fontSize: "12px",
                        borderRadius: "0px",
                        background: "rgb(66, 139, 202)",
                        padding: "5px 10px",
                        color: "rgb(255, 255, 255)",
                        textShadow: "none",
                        }}
                     >
                        <FontAwesomeIcon icon={faDashboard} />
                     </a>
            </li>
            
            <li
                className="dropdown hidden-sm hidden-small"
                style={{
                  padding: "0px",
                  margin: "0px",
                  display: "inline-block",
                }}
              >
                <a
                  className="btn pos-tip"
                  href="/"
                  tabIndex="-1"
                  title="Paramètres"
                  style={{
                    outline: "0px",
                    border: "none",
                    display: "inline-block",
                    textAlign: "center",
                    boxShadow: "none",
                    background: "rgb(64, 69, 74)",
                    margin: "5px 3px",
                    position: "relative",
                    height: "30px",
                    minWidth: "40px",
                    width: "auto",
                    fontSize: "12px",
                    borderRadius: "0px",
                    padding: "5px 10px",
                    color: "rgb(255, 255, 255)",
                    textShadow: "none",
                  }}
                >
                  <FontAwesomeIcon icon={faCogs} />
                  
                </a>
              </li>
              <li
                className="dropdown hidden-sm hidden-small"
                style={{
                  padding: "0px",
                  margin: "0px",
                  display: "inline-block",
                }}
              >
                <a
                  className="btn pos-tip"
                  href="/"
                  tabIndex="-1"
                  title="Raccourcis"
                  style={{
                    outline: "0px",
                    border: "none",
                    display: "inline-block",
                    textAlign: "center",
                    boxShadow: "none",
                    background: "rgb(64, 69, 74)",
                    margin: "5px 3px",
                    position: "relative",
                    height: "30px",
                    minWidth: "40px",
                    width: "auto",
                    fontSize: "12px",
                    borderRadius: "0px",
                    padding: "5px 10px",
                    color: "rgb(255, 255, 255)",
                    textShadow: "none",
                  }}
                >
                  <FontAwesomeIcon icon={faKey} />
                </a>
              </li>
              <li
                className="dropdown hidden-small"
                style={{ padding: "0px", margin: "0px" }}
              >
                <a
                  id="rfd-pole-connect"
                  className="btn pos-tip"
                  type="button"
                  tabIndex="-1"
                  href="/"
                  title="pole display"
                  style={{
                    outline: "0px",
                    border: "none",
                    display: "inline-block",
                    textAlign: "center",
                    boxShadow: "none",
                    background: "rgb(64, 69, 74)",
                    margin: "5px 3px",
                    position: "relative",
                    height: "30px",
                    minWidth: "40px",
                    width: "auto",
                    fontSize: "12px",
                    borderRadius: "0px",
                    padding: "5px 10px",
                    color: "rgb(255, 255, 255)",
                    textShadow: "none",
                  }}
                >
               
                  <FontAwesomeIcon icon={faPlay} />
                </a>
              </li>

              <li
                className="dropdown hidden-small"
                style={{ padding: "0px", margin: "0px" }}
              >
                <a
                  id="ouvrirFenetre"
                  className="btn pos-tip"
                  href="/"
                  tabIndex="-1"
                  target="_blank"
                  title="Afficher l écran du facture"
                  style={{
                    outline: "0px",
                    border: "none",
                    display: "inline-block",
                    textAlign: "center",
                    boxShadow: "none",
                    background: "rgb(64, 69, 74)",
                    margin: "5px 3px",
                    position: "relative",
                    height: "30px",
                    minWidth: "40px",
                    width: "auto",
                    fontSize: "12px",
                    borderRadius: "0px",
                    padding: "5px 10px",
                    color: "rgb(255, 255, 255)",
                    textShadow: "none",
                  }}
                >
                   <FontAwesomeIcon icon={faLaptop} />
                </a>
              </li>
              <li
                className="dropdown"
                style={{ padding: "0px", margin: "0px" }}
              >
                <a
                  id="opened_bills"
                  className="btn blightOrange pos-tip"
                  href="/"
                  tabIndex="-1"
                  title="<span>Ventes suspendues</span>"
                  style={{
                    outline: "0px",
                    border: "none",
                    display: "inline-block",
                    textAlign: "center",
                    boxShadow: "none",
                    margin: "5px 3px",
                    position: "relative",
                    height: "30px",
                    minWidth: "40px",
                    width: "auto",
                    fontSize: "12px",
                    borderRadius: "0px",
                    background: "rgb(250, 187, 61)",
                    padding: "5px 10px",
                    color: "rgb(255, 255, 255)",
                    textShadow: "none",
                  }}
                >
                  <FontAwesomeIcon icon={faTh} />
                </a>
              </li>

              <li
                className="dropdown hidden-small"
                style={{ padding: "0px", margin: "0px", display: "none" }}
              >
                <a
                  id="register_details"
                  className="btn bdarkGreen pos-tip"
                  href="/"
                  tabIndex="-1"
                  title="<span>Inscription Détails</span>"
                  style={{
                    outline: "0px",
                    border: "none",
                    display: "inline-block",
                    textAlign: "center",
                    boxShadow: "none",
                    margin: "5px 3px",
                    position: "relative",
                    height: "30px",
                    minWidth: "40px",
                    width: "auto",
                    fontSize: "12px",
                    borderRadius: "0px",
                    background: "rgb(120, 205, 81)",
                    padding: "5px 10px",
                    color: "rgb(255, 255, 255)",
                    textShadow: "none",
                  }}
                >
                  <FontAwesomeIcon icon={faCheckCircle} />
                </a>
              </li>

              <li
                className="dropdown"
                style={{ padding: "0px", margin: "0px" }}
              >
                <Button
                  id="close_register"
                  className="btn borange pos-tip"
                  tabIndex="-1"
                  title="<span>Fermer la caisse</span>"
                  style={{
                    outline: "0px",
                    border: "none",
                    display: "inline-block",
                    textAlign: "center",
                    boxShadow: "none",
                    margin: "5px 3px",
                    position: "relative",
                    height: "30px",
                    minWidth: "40px",
                    width: "auto",
                    fontSize: "12px",
                    borderRadius: "0px",
                    background: "rgb(250, 96, 61)",
                    padding: "5px 10px",
                    color: "rgb(255, 255, 255)",
                    textShadow: "none",
                  }}
                  onClick={() =>
                     {
                     if(!isOnline()){
                     auth.logOut();   
                     }
                     handleShow();
                     }}
                >
                  <FontAwesomeIcon icon={faTimesCircle} />
                </Button>
              </li>

              <li
                className="dropdown hidden-small"
                style={{ padding: "0px", margin: "0px" }}
              >
                <a
                  id="add_expense"
                  className="btn borange pos-tip"
                  href="/"
                  tabIndex="-1"
                  title="<span>Ajouter des dépenses</span>"
                  style={{
                    outline: "0px",
                    border: "none",
                    display: "inline-block",
                    textAlign: "center",
                    boxShadow: "none",
                    margin: "5px 3px",
                    position: "relative",
                    height: "30px",
                    minWidth: "40px",
                    width: "auto",
                    fontSize: "12px",
                    borderRadius: "0px",
                    background: "rgb(250, 96, 61)",
                    padding: "5px 10px",
                    color: "rgb(255, 255, 255)",
                    textShadow: "none",
                  }}
                >
               <FontAwesomeIcon icon={faDollar} />
                </a>
              </li>

              <li
                className="dropdown"
                style={{ padding: "0px", margin: "0px" }}
              >
                <a
                  id="addManuallyTransfer"
                  className="btn borange pos-tip"
                  href="/"
                  tabIndex="-1"
                  style={{
                    outline: "0px",
                    border: "none",
                    display: "inline-block",
                    textAlign: "center",
                    boxShadow: "none",
                    margin: "5px 3px",
                    position: "relative",
                    height: "30px",
                    minWidth: "40px",
                    width: "auto",
                    fontSize: "12px",
                    borderRadius: "0px",
                    background: "rgb(250, 96, 61)",
                    padding: "5px 10px",
                    color: "rgb(255, 255, 255)",
                    textShadow: "none",
                  }}
                >
                  <FontAwesomeIcon icon={faPlusCircle} />
                </a>
              </li>

              <li
                className="dropdown"
                style={{ padding: "0px", margin: "0px" }}
              >
                <a
                  id="today_profit"
                  className="btn bdarkGreen pos-tip"
                  href="/"
                  tabIndex="-1"
                  title="<span>Bénéfice d aujourd hui</span>"
                  style={{
                    outline: "0px",
                    border: "none",
                    display: "inline-block",
                    textAlign: "center",
                    boxShadow: "none",
                    margin: "5px 3px",
                    position: "relative",
                    height: "30px",
                    minWidth: "40px",
                    width: "auto",
                    fontSize: "12px",
                    borderRadius: "0px",
                    background: "rgb(120, 205, 81)",
                    padding: "5px 10px",
                    color: "rgb(255, 255, 255)",
                    textShadow: "none",
                  }}
                >
                  <FontAwesomeIcon icon={faHourglassHalf} />
                  
                </a>
              </li>
              <li
                className="dropdown"
                style={{ padding: "0px", margin: "0px" }}
              >
                <a
                  id="today_sale"
                  className="btn bdarkGreen pos-tip"
                  href="/"
                  tabIndex="-1"
                  title="<span>Vente d aujourd hui</span>"
                  style={{
                    outline: "0px",
                    border: "none",
                    display: "inline-block",
                    textAlign: "center",
                    boxShadow: "none",
                    margin: "5px 3px",
                    position: "relative",
                    height: "30px",
                    minWidth: "40px",
                    width: "auto",
                    fontSize: "12px",
                    borderRadius: "0px",
                    background: "rgb(120, 205, 81)",
                    padding: "5px 10px",
                    color: "rgb(255, 255, 255)",
                    textShadow: "none",
                  }}
                >
                 <FontAwesomeIcon icon={faHeart} />
                </a>
              </li>
              <li
                className="dropdown hidden-xs"
                style={{
                  padding: "0px",
                  margin: "0px",
                  display: "inline-block",
                }}
              >
                <a
                  className="btn bblue pos-tip"
                  href="/"
                  tabIndex="-1"
                  title="Liste des registres ouverts"
                  style={{
                    outline: "0px",
                    border: "none",
                    display: "inline-block",
                    textAlign: "center",
                    boxShadow: "none",
                    margin: "5px 3px",
                    position: "relative",
                    height: "30px",
                    minWidth: "40px",
                    width: "auto",
                    fontSize: "12px",
                    borderRadius: "0px",
                    background: "rgb(66, 139, 202)",
                    padding: "5px 10px",
                    color: "rgb(255, 255, 255)",
                    textShadow: "none",
                  }}
                >
                 <FontAwesomeIcon icon={faList} />
                </a>
              </li>
              <li
                className="dropdown hidden-xs"
                style={{
                  padding: "0px",
                  margin: "0px",
                  display: "inline-block",
                }}
              >
                <a
                  id="clearLS"
                  className="btn bred pos-tip"
                  href="/"
                  tabIndex="-1"
                  title="Effacer toutes les données sauvegardées localement"
                  style={{
                    outline: "0px",
                    border: "none",
                    display: "inline-block",
                    textAlign: "center",
                    boxShadow: "none",
                    margin: "5px 3px",
                    position: "relative",
                    height: "30px",
                    minWidth: "40px",
                    width: "auto",
                    fontSize: "12px",
                    borderRadius: "0px",
                    background: "rgb(255, 84, 84)",
                    padding: "5px 10px",
                    color: "rgb(255, 255, 255)",
                    textShadow: "none",
                  }}
                >
                  <FontAwesomeIcon icon={faEraser} />
                </a>
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

      </ul>
      </>
    ) ;

}

export default NavbarButtons;
