import React from "react";
import { Modal, Button } from "react-bootstrap";

const ErrorModal = ({ show, handleClose, message }) => (
  <Modal show={show} onHide={handleClose} size="sm" centered>
    <Modal.Header closeButton>
      <Modal.Title>Error</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{message}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={handleClose}>
        OK
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ErrorModal;