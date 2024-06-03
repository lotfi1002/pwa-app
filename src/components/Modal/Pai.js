import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
const handleSubmit = (e) => {
    e.preventDefault();

}

const Pai = ({ show, handleClose   }) => {

    return (<> 
    
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>FINALISER VENTE</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
          <Modal.Body>
              <Form.Group>
                <Form.Label>Vente :</Form.Label>
                <Form.Control
                  type="number"
                  required
                 
                
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


export default Pai ;
  