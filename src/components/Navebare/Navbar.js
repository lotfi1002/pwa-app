import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthProvider';
import { isOnline } from '../../utilities/CheckOnline';
import { Modal, Button } from "react-bootstrap";


export const Navbar = () => {
  const auth = useAuth();
  const [show, setShow] = useState(false);

    // champs de fermer caisse 
    const [totaljournne , setTotalJournne] = useState('');
    const [totalcarte , setTotalCarte] = useState('');
    const [vespece , setVespece] = useState('');



  const handleClose = () =>{
    
    setShow(false);
    console.log(totaljournne);
        console.log(totalcarte);
        console.log(vespece);
    if(totaljournne != null && totalcarte!= null 
      && vespece !== null){

        

        auth.logOut()

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
