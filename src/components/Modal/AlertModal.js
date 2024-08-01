import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AlertModal = ({ show, handleClose, handleConfirm }) => {
    return (
        <Modal show={show} onHide={handleClose} size="sm" backdrop="static" aria-labelledby="alertModalLabel">
            <Modal.Header closeButton>
                <Modal.Title id="alertModalLabel">Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Le montant payé est inférieur au montant payable. Veuillez appuyer sur OK pour soumettre la vente.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AlertModal;