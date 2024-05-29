import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import CaisseRegisterServices from '../../services/CaisseRegisterServices';
import CaisseRegisterDao from '../../dao/CaisseRegisterDao';
import { useAuth } from '../../hooks/AuthProvider';
import DateTime from '../../utilities/DateTime';

const CloseCashRegisterModal = ({ show, handleClose }) => {
  const [totalJournee, setTotalJournee] = useState('');
  const [totalCarte, setTotalCarte] = useState('');
  const [versementEspece, setVersementEspece] = useState('');

  const auth = useAuth();

 

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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    if(totalJournee != null && totalCarte!= null 
        && versementEspece !== null){
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
                "total_cash": totalJournee,
                "total_cheques" : 0,
                "total_cc_slips" : totalCarte,
                "total_ba": 0,
                "total_returned" : 0,
                "total_refunds" : 0,
                "total_cash_submitted": versementEspece,
                "total_cheques_submitted"  : 0,
                "total_cc_slips_submitted" : 0,
                "note": versementEspece,
                "status": "closed",
                "transfer_opened_bills": 0 ,
                "closed_by": user_id 
                } ;
                  
                closeMycaisse(user_id , data);
    
             }}});
             
            
          }
        }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>FERMER LA CAISSE</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
      <Modal.Body>
        
          <Form.Group>
            <Form.Label>TOTAL ESPECE JOURNEE :</Form.Label>
            <Form.Control
              type="number"
              required
              value={totalJournee}
              onChange={(e) => setTotalJournee(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Total des relevés de carte bancaire :</Form.Label>
            <Form.Control
              type="number"
              required
              value={totalCarte}
              onChange={(e) => setTotalCarte(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>VERSEMENT ESPECE JOURNEE :</Form.Label>
            <Form.Control
              type="number"
              required
              value={versementEspece}
              onChange={(e) => setVersementEspece(e.target.value)}
            />
          </Form.Group>
         
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary"  type="submit" onClick={handleClose}>
        Fermer la caisse
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CloseCashRegisterModal;
