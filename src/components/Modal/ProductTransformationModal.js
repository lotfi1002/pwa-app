import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';

const ProductTransformationModal = ({ show, handleClose }) => {
    const [productCode, setProductCode] = useState('');
    const [productDetails, setProductDetails] = useState({});
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (productCode.length > 16) {
            alert('You have exceeded the maximum number of characters.');
            setProductCode('');
        } else {
            fetchProductSuggestions(productCode);
        }
    }, [productCode]);

    const fetchProductSuggestions = (term) => {
        axios.get('http://localhost/PWA-POS/api/product/qa_suggestions', {
            params: { term }
        })
        .then(response => {
            const suggestions = response.data;
            console.log(suggestions);

            if (suggestions.length === 1 && suggestions[0].id !== 0) {
                handleSelect(suggestions[0]);
            } else if (suggestions.length === 1 && suggestions[0].id === 0) {
                alert('No match found');
                document.getElementById('add_item22').focus();
                setProductCode('');
            }
        })
        .catch(error => {
            console.error('Error fetching product suggestions', error);
        });
    };

    const handleSelect = (item) => {
        setProductDetails({
            id: item.item_id,
            name: item.label,
            cf2: item.row.cf2,
            cf3: item.row.cf3
        });
        setProductCode('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Submit form logic here
    };

    return (
        <Modal show={show} onHide={handleClose} id="tModal" aria-labelledby="tModalLabel" size="lg">
            <Form onSubmit={handleSubmit} data-toggle="validator" role="form">
                <Modal.Header closeButton>
                    <Modal.Title id="tModalLabel">Transformation Produit</Modal.Title>
                </Modal.Header>
                <Modal.Body id="pr_popover_content">
                    <Row>
                        <Col md={4} style={{ display: 'none' }}>
                            <Form.Group controlId="toDate">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="text" className="form-control input-tip datetime" defaultValue="13/12/2023 14:19" />
                            </Form.Group>
                        </Col>
                        <Col sm={10}>
                            <Form.Group as={Row} controlId="prod1">
                                <Form.Label column sm={4}>Code Produit</Form.Label>
                                <Col sm={8}>
                                    <Form.Control 
                                        type="text" 
                                        className="form-control tip" 
                                        id="add_item22" 
                                        placeholder="Add product to order" 
                                        value={productCode}
                                        onChange={(e) => setProductCode(e.target.value)}
                                    />
                                    <Form.Control type="hidden" value={productDetails.id} id="product_id[]" />
                                    <pre id="item_name" style={{fontSize:"13px",marginTop:"5px"}}>{productDetails.name}</pre>
                                    <Form.Control type="hidden" value="subtraction" id="type" />
                                    <Form.Control type="hidden" value={productDetails.cf2} id="cf2" />
                                    <Form.Control type="hidden" value={productDetails.cf3} id="cf3" />
                                    <Form.Control type="hidden" id="mtwarehouse_id" />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={10}>
                            <Form.Group as={Row} controlId="quantity[]">
                                <Form.Label column sm={4}>Quantity *</Form.Label>
                                <Col sm={8}>
                                    <Form.Control 
                                        type="number" 
                                        className="form-control kb-pad" 
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" id="add_adjustment" className="btn btn-primary">
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ProductTransformationModal;