import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
// key board jquery
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import 'virtual-keyboard/dist/css/keyboard.min.css';
import 'virtual-keyboard/dist/js/jquery.keyboard.js';

const VenteModal = ({ show, handleClose , initvente, code, warehouse_id, customer_id }) => {
    const [vente, setVente] = useState('');
    const [codeValue, setCode] = useState(code);
    const [warehouseIdValue, setWareHouseId] = useState(warehouse_id);
    const [customerIdValue, setCostumerId] = useState(customer_id);
    const inputRef = useRef(null);
    

    useEffect(() => {
      setCode(code);
      setWareHouseId(warehouse_id);
      setCostumerId(customer_id);
      setVente(initvente);
      
      // Initialize the virtual keyboard on the input field
      $(inputRef.current).keyboard({
        layout: 'custom',
        customLayout: {
          default: [
            '1 2 3', '4 5 6', '7 8 9', '0 {bksp}',
            '% .', '{clear}{space}'
          ] , 
          clear: 'Clear'
        },
        autoAccept: true,
        alwaysOpen: false,
        initialFocus: true,
        restrictInput: true, // Enable input restriction
        restrictInclude: /[0-9%]/, // Allow numerical values and the percentage symbol
        change: (e, keyboard) => {
          setVente(keyboard.value);
        }
      });

    }, [initvente ,code, warehouse_id, customer_id]);

  

    const handleSubmit = (e) => {
        e.preventDefault();

    }



    //console.log(codeValue);
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
              type="text"
              required
              value={vente}
              ref={inputRef}
              className='keyboard-input'
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


export default VenteModal ;