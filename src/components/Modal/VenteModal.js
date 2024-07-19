import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
// key board jquery
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import 'virtual-keyboard/dist/css/keyboard.min.css';
import 'virtual-keyboard/dist/js/jquery.keyboard.js';

const VenteModal = ({ show, handleClose , initvente, code, warehouse_id, customer_id , saleValue, setSaleValue, handleAddToTable }) => {
    const [vente, setVente] = useState('');
    const [codeValue, setCode] = useState(code);
    const [warehouseIdValue, setWareHouseId] = useState(warehouse_id);
    const [customerIdValue, setCostumerId] = useState(customer_id);
    const inputRef = useRef(null);
    

    useEffect(() => {
    if (show) {
      setCode(code);
      setWareHouseId(warehouse_id);
      setCostumerId(customer_id);
      setSaleValue(initvente);
      
      const keyboard = $(inputRef.current).keyboard({
        layout: 'custom',
        customLayout: {
          default: [
            '1 2 3 {bksp}',
            '4 5 6 . C',
            '7 8 9 0 %',
            '{accept} {cancel}'
          ],
          accept: 'Accept',
          cancel: 'Cancel',
          bksp: '\u2190', // Unicode for left arrow
          clear: 'C'
        },
        autoAccept: true,
        alwaysOpen: false,
        initialFocus: true,
        restrictInput: true,
        restrictInclude: /[0-9%]/,
        change: (e, keyboard) => {
          setSaleValue(keyboard.$preview.val());
        },
        css: {   'keyboard-key-backspace': {
          backgroundColor: 'orange',
          color: 'white'
        },
        'keyboard-key-accept': {
          backgroundColor: 'green',
          color: 'white'
        },
        'keyboard-key-cancel': {
          backgroundColor: 'red',
          color: 'white'
        },
        'keyboard-key-clear': {
          backgroundColor: 'blue',
          color: 'white'
        }
      }
      });
   
      
      // Focus the input to show the keyboard
      $(inputRef.current).focus();

    }
  }, [show]);

  

    const handleSubmit = (e) => {
        e.preventDefault();

    } 

    const handleAdd = () => {
      // Call the parent component function to add to table
      handleAddToTable(saleValue);
      setSaleValue('');
    };

    



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
              value={saleValue}
              onChange={(e) => setSaleValue(e.target.value)}
              type="text"
              required
              ref={inputRef}
              className='keyboard-input'
            />
          </Form.Group>
      
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAdd} variant="primary"  type="submit" >
        Mettre a jour 
        </Button>
      </Modal.Footer>
      </Form>
     
    </Modal>
   
    </>);


}


export default VenteModal ;