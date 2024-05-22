import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthProvider';
import { isOnline } from '../../utilities/CheckOnline';
import { Modal, Button } from "react-bootstrap";


export const Navbar = () => {
  const auth = useAuth();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
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

<Modal  show={show} onHide={handleClose}>
<Modal.Title>FERMER LA CAISSE</Modal.Title>
<Modal.Body> Test Body</Modal.Body>
<Modal.Footer>
<Button variant="primary" onClick={handleClose}>
  Fermer la caisse
</Button>
</Modal.Footer>
</Modal>


</>
  )
}
