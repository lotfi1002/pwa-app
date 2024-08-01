import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Row, Col, Table, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertModal from "./AlertModal";
import "jquery-ui-dist/jquery-ui";
import "virtual-keyboard/dist/css/keyboard.min.css";
import "virtual-keyboard/dist/js/jquery.keyboard.js";
import $ from "jquery";
import ErrorModal from "./ErrorModal";
import { isAppOnline } from "../../utilities/CheckOnline";
import GiftCardDao from "../../dao/GiftCardDao";

const PaymentModal = ({
  show,
  handleClose,
  billers,
  posSettings,
  sessionBillerId,
  itemCount,
  totalPayable,
}) => {
  const [selectedBiller, setSelectedBiller] = useState("");
  const [saleNote, setSaleNote] = useState("");
  const [staffNote, setStaffNote] = useState("");
  const [payments, setPayments] = useState([
    {
      amount: totalPayable,
      paidBy: "cash",
      giftCardNo: "",
      chequeNo: "",
      paymentNote: "",
    },
  ]);

  const [totalPaying, setTotalPaying] = useState(totalPayable);

  const [balance, setBalance] = useState(0.0);
  const [giftCardDetails, setGiftCardDetails] = useState({});
  const [isGiftCardValid, setIsGiftCardValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [giftCardError, setGiftCardError] = useState("");

  const navigate = useNavigate();
  const amountRefs = useRef([]);
  const chequeNoRefs = useRef([]);
  const giftCardNoRefs = useRef([]);
  const paymentsNoteRefs = useRef([]);
  const noteRefs = useRef([]);

  useEffect(() => {
    if (show) {
      initializeKeyboards();
      calculateTotalPayingAndBalance();
      validateAllGiftCards();
      setTotalPaying(
        (localStorage.getItem("salesHistory")
          ? JSON.parse(localStorage.getItem("salesHistory"))
          : []
        )
          .reduce((sum, item) => sum + item.ssTotal, 0)
          .toFixed(2)
      );

      const sum = payments.reduce((total, payment) => total + parseFloat(payment.amount || 0), 0);
      setTotalPaying(sum);
    }
  }, [totalPayable, show, payments]); // Add payments to dependencies
  

  const initializeKeyboards = () => {
    // Initialize keyboard for amount inputs
    amountRefs.current.forEach((ref) => {
      $(ref).keyboard({
        layout: "custom",
        customLayout: {
          default: [
            "1 2 3 {bksp}",
            "4 5 6 . C",
            "7 8 9 0 %",
            "{accept} {cancel}",
          ],
          accept: "Accept",
          cancel: "Cancel",
          bksp: "\u2190",
          clear: "C",
        },
        autoAccept: true,
        alwaysOpen: false,
        initialFocus: true,
        restrictInput: true,
        restrictInclude: /[0-9%]/,
        css: {
          "keyboard-key-backspace": {
            backgroundColor: "orange",
            color: "white",
          },
          "keyboard-key-accept": {
            backgroundColor: "green",
            color: "white",
          },
          "keyboard-key-cancel": {
            backgroundColor: "red",
            color: "white",
          },
          "keyboard-key-clear": {
            backgroundColor: "blue",
            color: "white",
          },
        },
        change: (e, keyboard) => {
          const index = amountRefs.current.indexOf(ref);
          handlePaymentChange(index, "amount", keyboard.$preview.val());
        },
      });
    });

    // Initialize keyboard for gift card number inputs
    giftCardNoRefs.current.forEach((ref) => {
      $(ref).keyboard({
        layout: "custom",
        value:payments[giftCardNoRefs.current.indexOf(ref)]["giftCardNo"],
        customLayout: {
          default: [
            "1 2 3 {bksp}",
            "4 5 6 . C",
            "7 8 9 0 %",
            "{accept} {cancel}",
          ],
          accept: "Accept",
          cancel: "Cancel",
          bksp: "\u2190",
          clear: "C",
        },
        autoAccept: true,
        alwaysOpen: false,
        initialFocus: true,
        restrictInput: true,
        restrictInclude: /[0-9%]/,
        css: {
          "keyboard-key-backspace": {
            backgroundColor: "orange",
            color: "white",
          },
          "keyboard-key-accept": {
            backgroundColor: "green",
            color: "white",
          },
          "keyboard-key-cancel": {
            backgroundColor: "red",
            color: "white",
          },
          "keyboard-key-clear": {
            backgroundColor: "blue",
            color: "white",
          },
        },
        change: (e, keyboard) => {
          const index = giftCardNoRefs.current.indexOf(ref);
          handlePaymentChange(index, "giftCardNo", keyboard.$preview.val());
        },

        accepted: (e,keyboard) => {
            const index = giftCardNoRefs.current.indexOf(ref);
            validateGiftCard(keyboard.$preview.val(),index)
        }
      });
    });

    // Initialize keyboard for cheque number inputs
    chequeNoRefs.current.forEach((ref) => {
      $(ref).keyboard({
        layout: "custom",
        customLayout: {
          default: [
            "1 2 3 {bksp}",
            "4 5 6 . C",
            "7 8 9 0 %",
            "{accept} {cancel}",
          ],
          accept: "Accept",
          cancel: "Cancel",
          bksp: "\u2190",
          clear: "C",
        },
        autoAccept: true,
        alwaysOpen: false,
        initialFocus: true,
        restrictInput: true,
        restrictInclude: /[0-9%]/,
        css: {
          "keyboard-key-backspace": {
            backgroundColor: "orange",
            color: "white",
          },
          "keyboard-key-accept": {
            backgroundColor: "green",
            color: "white",
          },
          "keyboard-key-cancel": {
            backgroundColor: "red",
            color: "white",
          },
          "keyboard-key-clear": {
            backgroundColor: "blue",
            color: "white",
          },
        },
        change: (e, keyboard) => {
          const index = chequeNoRefs.current.indexOf(ref);
          handlePaymentChange(index, "chequeNo", keyboard.$preview.val());
        },
      });
    });

     // Initialize keyboard for amount inputs
     paymentsNoteRefs.current.forEach((ref) => {
        $(ref).keyboard({
            layout: 'qwerty',
            autoAccept: true,
            alwaysOpen: false,
            initialFocus: true,
            restrictInput: false,
            preventPaste: true,
            css: {
              'keyboard-key-backspace': {
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
            },
          change: (e, keyboard) => {
            const index = paymentsNoteRefs.current.indexOf(ref);
            handlePaymentChange(index, "paymentNote", keyboard.$preview.val());
          },
        });
      });

    // Initialize keyboard for sale note input
    $(noteRefs.current[0]).keyboard({
      layout: "qwerty",
      autoAccept: true,
      alwaysOpen: false,
      initialFocus: true,
      restrictInput: false,
      preventPaste: true,
      css: {
        "keyboard-key-backspace": {
          backgroundColor: "orange",
          color: "white",
        },
        "keyboard-key-accept": {
          backgroundColor: "green",
          color: "white",
        },
        "keyboard-key-cancel": {
          backgroundColor: "red",
          color: "white",
        },
        "keyboard-key-clear": {
          backgroundColor: "blue",
          color: "white",
        },
      },
      change: (e, keyboard) => {
        setSaleNote(keyboard.$preview.val());
      },
    });

    // Initialize keyboard for staff note input
    $(noteRefs.current[1]).keyboard({
      layout: "qwerty",
      autoAccept: true,
      alwaysOpen: false,
      initialFocus: true,
      restrictInput: false,
      preventPaste: true,
      css: {
        "keyboard-key-backspace": {
          backgroundColor: "orange",
          color: "white",
        },
        "keyboard-key-accept": {
          backgroundColor: "green",
          color: "white",
        },
        "keyboard-key-cancel": {
          backgroundColor: "red",
          color: "white",
        },
        "keyboard-key-clear": {
          backgroundColor: "blue",
          color: "white",
        },
      },
      change: (e, keyboard) => {
        setStaffNote(keyboard.$preview.val());
      },
    });
      
  };

  const addPayment = () => {
    setPayments([
      ...payments,
      {
        amount: "",
        paidBy: "cash",
        giftCardNo: "",
        chequeNo: "",
        paymentNote: "",
      },
    ]);

    initializeKeyboards();

  };

  // Function to handle changes in the payment notes
const handlePaymentChange = (index, field, value) => {
    const newPayments = [...payments];
    newPayments[index][field] = value;
    setPayments(newPayments);
    calculateTotalPayingAndBalance(newPayments);
  };
  

  const validateGiftCard = async (giftCardNo, index) => {
    if (giftCardNo !== "") {
        try {
            const onlineStatus = await isAppOnline(); // Check online status

            if (onlineStatus) { // Online mode
                try {
                    const response = await axios.get(
                        `http://localhost/PWA-POS/api/sales/validateGiftCard?no=${giftCardNo}`
                    );
                    const data = response.data;

                    console.log(data);
                    if (data === false) {
                        setGiftCardDetails({});
                        setGiftCardError("Numéro de bon-achat incorrect ou expiré.");
                    } else if (data.customer_id !== null && data.customer_id !== "1") {
                        setGiftCardError("Numéro de bon-achat ce n'est pas pour ce client");
                        setGiftCardDetails({});
                        updatePaymentField(index, "amount", "");
                    } else {
                        setGiftCardDetails(data);
                        updatePaymentField(
                            index,
                            "amount",
                            data.balance >= totalPayable ? totalPayable : data.balance
                        );
                    }
                    validateAllGiftCards();

                } catch (error) {
                    console.error("Error validating gift card:", error);
                    setGiftCardError("Error validating gift card");
                    setGiftCardDetails({});
                    updatePaymentField(index, "amount", "");
                }

            } else { // Offline mode
                try {
                    // Assume you have a method to get gift card data from IndexedDB
                    const giftCard = await GiftCardDao.getGiftCardByCode(giftCardNo);
                    
                    if (giftCard) {
                        if (giftCard.customer_id !== "1") {
                            setGiftCardError("Numéro de bon-achat ce n'est pas pour ce client");
                            setGiftCardDetails({});
                            updatePaymentField(index, "amount", "");
                        } else {
                            setGiftCardDetails(giftCard);
                            updatePaymentField(
                                index,
                                "amount",
                                giftCard.balance >= totalPayable ? totalPayable : giftCard.balance
                            );
                        }
                        validateAllGiftCards();
                    } else {
                        setGiftCardDetails({});
                        setGiftCardError("Numéro de bon-achat incorrect ou expiré.");
                        updatePaymentField(index, "amount", "");
                    }
                    
                } catch (error) {
                    console.error("Error fetching gift card from IndexedDB:", error);
                    setGiftCardError("Error validating gift card");
                    setGiftCardDetails({});
                    updatePaymentField(index, "amount", "");
                }
            }

        } catch (error) {
            console.error("Error determining app status:", error);
            setGiftCardError("Error determining app status");
            setGiftCardDetails({});
            updatePaymentField(index, "amount", "");
        }
    }
};

  const updatePaymentField = (index, field, value) => {
    const newPayments = [...payments];
    newPayments[index][field] = value;
    setPayments(newPayments);
  };

  const validateAllGiftCards = () => {
    const allValid = payments.every((payment) => {
      if (payment.paidBy === "gift_card" && payment.giftCardNo) {
        return giftCardDetails.card_no === payment.giftCardNo;
      }
      return true;
    });
    setIsGiftCardValid(allValid);
  };

  const calculateTotalPayingAndBalance = (updatedPayments = payments) => {
    const totalPaying = updatedPayments
      .reduce((sum, payment) => sum + parseFloat(payment.amount || 0), 0)
      .toFixed(2);
    const balance = (totalPayable - totalPaying).toFixed(2);
    setTotalPaying(totalPaying);
    setBalance(balance);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    if(totalPayable>totalPaying){
        setShowAlert(true);
    }else{
        navigate('/receipt/2804')
    }
   
    setIsSubmitting(false);
  };

  const handleAlertClose = () => setShowAlert(false);
  const handleAlertConfirm = () => {
    handleClose();
    navigate('/receipt/2804')  
};


  return (
    <>
     <ErrorModal
  show={!!giftCardError}
  handleClose={() => setGiftCardError("")}
  message={giftCardError}
/>
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="payment-modal-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="payment-modal-title">Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={12} sm={9}>
              <Form.Group controlId="posbiller">
                <Form.Label>Biller</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedBiller}
                  onChange={(e) => setSelectedBiller(e.target.value)}
                >
                  {billers &&
                    billers.map((biller) => (
                      <option key={biller.id} value={biller.id}>
                        {biller.name}
                      </option>
                    ))}
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
                      ref={(ref) => (noteRefs.current[0] = ref)}
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
                      ref={(ref) => (noteRefs.current[1] = ref)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <hr></hr>

              {payments.map((payment, index) => (
                <div key={index}>
                  <div className="mb-3">
                    <Row>
                      <Col sm={6}>
                        <Form.Group controlId={`amount_${index}`}>
                          <Form.Label>Amount</Form.Label>
                          <Form.Control
                            type="text"
                            value={payment.amount}
                            onChange={(e) =>
                              handlePaymentChange(
                                index,
                                "amount",
                                e.target.value
                              )
                            }
                            ref={(ref) => (amountRefs.current[index] = ref)}
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
                              handlePaymentChange(
                                index,
                                "paidBy",
                                e.target.value
                              )
                            }
                          >
                            <option value="cash">Cash</option>
                            <option value="CC">Credit Card</option>
                            <option value="gift_card">Gift Card</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    {payment.paidBy === "gift_card" && (
  <Row>
    <Col sm={11}>
      <Form.Group
        controlId={`gift_card_no_${index}`}
        style={{ color: giftCardError ? 'red' : 'inherit' }}
      >
        <Form.Label style={{ color: giftCardError ? 'red' : 'inherit' }}>
          Gift Card No
        </Form.Label>
        <Form.Control
          type="text"
          value={payment.giftCardNo}
          onChange={(e) =>
            handlePaymentChange(index, "giftCardNo", e.target.value)
          }
          ref={(ref) => (giftCardNoRefs.current[index] = ref)}
          style={{ borderColor: giftCardError ? 'red' : 'inherit' }}
        />
        {giftCardDetails.card_no &&
          payment.giftCardNo === giftCardDetails.card_no && (
            <div>
              <small>
                Card No: {giftCardDetails.card_no}
              </small>
              <br />
              <small>Value: {giftCardDetails.value}</small>
              <br />
              <small>
                Balance: {giftCardDetails.balance}
              </small>
            </div>
          )}
      </Form.Group>
    </Col>
  </Row>
)}

                    {payment.paidBy === "CC" && (
                      <Row>
                        <Col sm={11}>
                          <Form.Group controlId={`cheque_no_${index}`}>
                            <Form.Label>Cheque No</Form.Label>
                            <Form.Control
                              type="text"
                              value={payment.chequeNo}
                              onChange={(e) =>
                                handlePaymentChange(
                                  index,
                                  "chequeNo",
                                  e.target.value
                                )
                              }
                              ref={(ref) => (chequeNoRefs.current[index] = ref)}
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
                            type="text"
                            value={payment.paymentNote}
                            onChange={(e) =>
                              handlePaymentChange(
                                index,
                                "paymentNote",
                                e.target.value
                              )
                            }
                            ref={(ref) => (paymentsNoteRefs.current[index] = ref)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                  <hr></hr>

                </div>
              ))}

              <Button variant="info" onClick={addPayment}>
                <i className="fa fa-plus"></i> Add Payment
              </Button>
            </Col>
            <Col md={12} sm={9}>
              <div className="font16 mt-4">
                <Table bordered striped>
                  <tbody>
                    <tr>
                      <td width="25%">Total Items</td>
                      <td width="25%" className="text-right">
                        <span id="item_count">{itemCount}</span>
                      </td>
                      <td width="25%">Total Payable</td>
                      <td width="25%" className="text-right">
                        <span id="twt">{totalPayable}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Total Paying</td>
                      <td className="text-right">
                        <span id="total_paying">{totalPaying}</span>
                      </td>
                      <td>Balance</td>
                      <td className="text-right">
                        <span id="balance">{balance}</span>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!isGiftCardValid || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Modal.Footer>
      <AlertModal
        show={showAlert}
        handleClose={handleAlertClose}
        handleConfirm={handleAlertConfirm}
      />
     

    </Modal>
    </>
  );
};

export default PaymentModal;
