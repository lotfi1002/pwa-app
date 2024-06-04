import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const VenteModal = ({ show, handleClose , code, warehouse_id, customer_id }) => {
    const [vente, setVente] = useState(false);
    const [codeValue, setCode] = useState(code);
    const [warehouseIdValue, setWareHouseId] = useState(warehouse_id);
    const [customerIdValue, setCostumerId] = useState(customer_id);
    const keyboard = useRef();

    useEffect(() => {
      setCode(code);
      setWareHouseId(warehouse_id);
      setCostumerId(customer_id);
    }, [code, warehouse_id, customer_id]);

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const onChange = input => {
      setVente(input);
      console.log("Input changed", input);
    };

  
    const onKeyPress = button => {
      console.log("Button pressed", button);
  
    };
  
    const onChangeInput = event => {
      const input = event.target.value;
      setVente(input);
      keyboard.current.setInput(input);
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
              type="number"
              required
              value={vente}
              onChange={onChangeInput}
            />
          </Form.Group>
          <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        onChange={onChange}
        onKeyPress={onKeyPress}
        layout={{
          default: [
            "1 2 3",
            "4 5 6",
            "7 8 9",
            "0 {bksp}"
          ]
        }}
        display={{
          "{bksp}": "⌫"
        }}
        theme={"hg-theme-default hg-layout-numeric numeric-theme"}

      />
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