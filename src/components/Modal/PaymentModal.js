import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Table } from 'react-bootstrap';

const PaymentModal = ({ show, handleClose, billers, posSettings, sessionBillerId }) => {
    const [selectedBiller, setSelectedBiller] = useState('');
    const [saleNote, setSaleNote] = useState('');
    const [staffNote, setStaffNote] = useState('');
    const [payments, setPayments] = useState([{ amount: '', paidBy: 'cash', giftCardNo: '', chequeNo: '', paymentNote: '' }]);
    const [itemCount, setItemCount] = useState(0.00);
    const [totalPayable, setTotalPayable] = useState(0.00);
    const [totalPaying, setTotalPaying] = useState(0.00);
    const [balance, setBalance] = useState(0.00);

    const addPayment = () => {
        setPayments([...payments, { amount: '', paidBy: 'cash', giftCardNo: '', chequeNo: '', paymentNote: '' }]);
    };

    const handlePaymentChange = (index, field, value) => {
        const newPayments = [...payments];
        newPayments[index][field] = value;
        setPayments(newPayments);
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" backdrop="static" aria-labelledby="payModalLabel">
            <Modal.Header closeButton>
                <Modal.Title id="payModalLabel">Finalize Sale</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col md={10} sm={9}>
                            <Form.Group controlId="posbiller">
                                <Form.Label>Biller</Form.Label>
                                <Form.Control
                                    as="select"
                               
                                    
                                >
                                        <option key={1} value={1}>
                                           "XXX"
                                        </option>
                                    
                                </Form.Control>
                            </Form.Group>
                            <Row>
                                <Col sm={6}>
                                    <Form.Group controlId="sale_note">
                                        <Form.Label>Sale Note</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="Sale Note"
                                            maxLength="250"
                                            value={saleNote}
                                            onChange={(e) => setSaleNote(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={6}>
                                    <Form.Group controlId="staffnote">
                                        <Form.Label>Staff Note</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="Staff Note"
                                            maxLength="250"
                                            value={staffNote}
                                            onChange={(e) => setStaffNote(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            {payments.map((payment, index) => (
                                <div key={index} className="well well-sm well_1">
                                    <div className="payment">
                                        <Row>
                                            <Col sm={5}>
                                                <Form.Group controlId={`amount_${index}`}>
                                                    <Form.Label>Amount</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={payment.amount}
                                                        onChange={(e) =>
                                                            handlePaymentChange(index, 'amount', e.target.value)
                                                        }
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={{ span: 5, offset: 1 }}>
                                                <Form.Group controlId={`paid_by_${index}`}>
                                                    <Form.Label>Paying By</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        value={payment.paidBy}
                                                        onChange={(e) =>
                                                            handlePaymentChange(index, 'paidBy', e.target.value)
                                                        }
                                                    >
                                                        <option value="cash">Cash</option>
                                                        <option value="CC">Credit Card</option>
                                                        <option value="gift_card">Gift Card</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        {payment.paidBy === 'gift_card' && (
                                            <Row>
                                                <Col sm={11}>
                                                    <Form.Group controlId={`gift_card_no_${index}`}>
                                                        <Form.Label>Gift Card No</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            value={payment.giftCardNo}
                                                            onChange={(e) =>
                                                                handlePaymentChange(index, 'giftCardNo', e.target.value)
                                                            }
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        )}
                                        {payment.paidBy === 'CC' && (
                                            <Row>
                                                <Col sm={11}>
                                                    <Form.Group controlId={`cheque_no_${index}`}>
                                                        <Form.Label>Cheque No</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            value={payment.chequeNo}
                                                            onChange={(e) =>
                                                                handlePaymentChange(index, 'chequeNo', e.target.value)
                                                            }
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        )}
                                        <Row>
                                            <Col sm={11}>
                                                <Form.Group controlId={`payment_note_${index}`}>
                                                    <Form.Label>Payment Note</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={2}
                                                        value={payment.paymentNote}
                                                        onChange={(e) =>
                                                            handlePaymentChange(index, 'paymentNote', e.target.value)
                                                        }
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            ))}
                            <Button variant="primary" onClick={addPayment}>
                                <i className="fa fa-plus"></i> Add More Payments
                            </Button>
                            <div className="font16 mt-4">
                                <Table bordered striped>
                                    <tbody>
                                        <tr>
                                            <td width="25%">Total Items</td>
                                            <td width="25%" className="text-right">
                                                <span id="item_count">{itemCount.toFixed(2)}</span>
                                            </td>
                                            <td width="25%">Total Payable</td>
                                            <td width="25%" className="text-right">
                                                <span id="twt">{totalPayable.toFixed(2)}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Total Paying</td>
                                            <td className="text-right">
                                                <span id="total_paying">{totalPaying.toFixed(2)}</span>
                                            </td>
                                            <td>Balance</td>
                                            <td className="text-right">
                                                <span id="balance">{balance.toFixed(2)}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                        <Col md={2} sm={3} className="text-center">
                            <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Quick Cash</span>
                            <div className="btn-group-vertical">
                                <Button variant="info" size="lg" id="quick-payable">
                                    {totalPayable.toFixed(2)}
                                </Button>
                                {[10, 20, 50, 100].map((cashNoteAmount) => (
                                    <Button key={cashNoteAmount} variant="warning" size="lg">
                                        {cashNoteAmount}
                                    </Button>
                                ))}
                                <Button variant="danger" size="lg" id="clear-cash-notes">
                                    Clear
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" size="lg" block id="submit-sale">
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaymentModal;
