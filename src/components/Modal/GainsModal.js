import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import 'virtual-keyboard/dist/css/keyboard.min.css';
import 'virtual-keyboard/dist/js/jquery.keyboard.js';

const GainsModal = ({ show, handleClose, initvente, code, warehouse_id, customer_id, selectedProduct, saleValue, setSaleValue, handleAddToTable }) => {
  const [codeValue, setCode] = useState(code);
  const [warehouseIdValue, setWareHouseId] = useState(warehouse_id);
  const [customerIdValue, setCostumerId] = useState(customer_id);
  const inputRef = useRef(null);
  
  useEffect(() => {
    if (show) {
      setCode(code);
      setWareHouseId(warehouse_id);
      setCostumerId(customer_id);
      // setSaleValue(initvente);
      
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
      // $(inputRef.current).focus();

    }
  }, [show]);

  const handleAdd = () => {
    handleAddToTable(saleValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>GAINS</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Gains :</Form.Label>
            <Form.Control
              type="text"
              required
              value={saleValue}
              onChange={(e) => setSaleValue(e.target.value)}
              ref={inputRef}
              className="keyboard-input"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleAdd}>
            Mettre à jour
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default GainsModal;