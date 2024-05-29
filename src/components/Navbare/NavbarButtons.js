import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faKey, faPlay, faLaptop, faTh, faCheckCircle, faTimesCircle, faDollar, faPlusCircle, faEraser, faCogs, faHourglassHalf, faHeart, faList } from '@fortawesome/free-solid-svg-icons';
import {  Button } from 'react-bootstrap';
import { useAuth } from '../../hooks/AuthProvider';

import { isOnline } from '../../utilities/CheckOnline';
import CloseCashRegisterModal from '../Modal/CloseCashRegisterModal';

const NavbarButtons = () => {

    const auth = useAuth();

 const [show, setShow] = useState(false);

 // close modale window 
 const handleClose = () =>{
     setShow(false);
   } 

   const handleShow = () => setShow(true);
 
    return (
      <>
      <ul
              className="nav navbar-nav pull-right ml-auto"
              style={{ padding: "0px", margin: "0px" }}
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
                     <CloseCashRegisterModal show={show} handleClose={handleClose}/>
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
              

      </ul>
      </>
    ) ;

}

export default NavbarButtons;
