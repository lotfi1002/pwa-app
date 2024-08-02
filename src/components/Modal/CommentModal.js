import React, { useState,useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CommentModal = ({ show, handleClose, salesHistory, setSalesHistory, index, item }) => {
  const [comment, setComment] = useState('');
  const [ordered, setOrdered] = useState(0);

  useEffect(() => {
    if (show) {
      setComment(item.comment || '');
      setOrdered(item.ordered || 0);
    }
  }, [show, salesHistory, index]);

  const handleCommentChange = (e) => {
    const newComment = e.target.value;
    setComment(newComment);
    const updatedSalesHistory = [...salesHistory];
    updatedSalesHistory[index].comment = newComment;
    setSalesHistory(updatedSalesHistory);
  };

  const handleOrderedChange = (e) => {
    const newOrdered = e.target.value;
    setOrdered(newOrdered);
    const updatedSalesHistory = [...salesHistory];
    updatedSalesHistory[index].ordered = newOrdered;
    setSalesHistory(updatedSalesHistory);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handleSaveComment({ comment, ordered });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body id="pr_popover_content">
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="icomment">Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  id="icomment"
                  value={comment}
                  onChange={handleCommentChange}
                  style={{ height: '80px' }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="iordered">Ordered</Form.Label>
                <Form.Control
                  as="select"
                  id="iordered"
                  value={ordered}
                  onChange={handleOrderedChange}
                  style={{ width: '100%' }}
                >
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </Form.Control>
              </Form.Group>
              <input type="hidden" id="irow_id" value="" />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="button" onClick={handleClose}   >
              Submit
            </Button>
          </Modal.Footer>
    </Modal>
  );
};

export default CommentModal;