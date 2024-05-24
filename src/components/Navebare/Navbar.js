import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthProvider';
import { isOnline } from '../../utilities/CheckOnline';
import { Modal, Button } from "react-bootstrap";
import CaisseRegisterDao from '../../dao/CaisseRegisterDao';
import CaisseRegisterServices from '../../services/CaisseRegisterServices';
import DateTime from '../../utilities/DateTime';


export const Navbar = () => {
  const auth = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
    // champs de fermer caisse 
    const [totaljournne , setTotalJournne] = useState('');
    const [totalcarte , setTotalCarte] = useState('');
    const [vespece , setVespece] = useState('');



  const handleClose = () =>{
    
    setShow(false);
  
    if(totaljournne != null && totalcarte!= null 
      && vespece !== null){
        let user_id = localStorage.getItem("user_id");
        if(user_id != null){
          CaisseRegisterDao.getOpenRegisterByUserId(user_id).then(

            (response) => {
              //console.log(response);
              let data =       { "user_id" : user_id,
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

                      if(rep != null && rep.data != null && rep.data.status === true &&
                         rep.data.response === true ){
                        localStorage.setItem("isOpen" , 0 );
                        navigate("/pos");

                        // modify also the data saved in indexddb 
                        CaisseRegisterDao.updateRegister(data.id_register , {
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
                              "closed_by": user_id ,
                              "commit": 1 });

                      }else {

                        if(response.data.error != null && 
                          response.data.error === "Failed to access"){
                            navigate("/login");
                          }

                      }
                    }
                  ) ;
  
  
            }
  
          );
          
        }
       
       

      }
    
   
  
  } 
  const handleShow = () => setShow(true);


  return (
    <>
    <nav>
        <Link to="/pos">Pos</Link>
        <Link to="/product">Synchrone-DB</Link>
        <Link to="/lproducts">List Products</Link>
        <li><button onClick={() =>{
              if(!isOnline()){
                auth.logOut();   
            }
            handleShow();

        } } className="btn-submit"> Close </button></li>
        <li><button onClick={() => auth.logOut()} className="btn-submit"> Deconnect</button></li>
    </nav>
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
