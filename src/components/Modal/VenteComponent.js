import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


const VenteComponent = ({ show, handleClose , code, warehouse_id, customer_id }) => {
    const [vente, setVente] = useState(false);
    const [codeValue, setCode] = useState(code);
    const [warehouseIdValue, setWareHouseId] = useState(warehouse_id);
    const [customerIdValue, setCostumerId] = useState(customer_id);

    useEffect(() => {
      setCode(code);
      setWareHouseId(warehouse_id);
      setCostumerId(customer_id);
    }, [code, warehouse_id, customer_id]);

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    console.log(codeValue);
    return (<> 
    
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>VENTES</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
      <Modal.Body>
          <Form.Group>
            <Form.Label>Vente :</Form.Label>
            <Form.Control
              type="number"
              required
              value={vente}
              onChange={(e) => setVente(e.target.value)}
            />
          </Form.Group>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary"  type="submit" onClick={handleClose}>
        Mettre a jour 
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
    </>);


}


export default VenteComponent ;