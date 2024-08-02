// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Receipt = () => {
//   const [salesHistory, setSalesHistory] = useState([]);
//   const [totalPayable, setTotalPayable] = useState(0);
//   const [subtotal, setSubtotal] = useState(0);
//   const [taxes, setTaxes] = useState({});
//   const [paymentDetails, setPaymentDetails] = useState(null); // State to hold payment details

//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedSalesHistory =
//       JSON.parse(localStorage.getItem("salesHistory")) || [];
//     setSalesHistory(storedSalesHistory);

//     const storedPaymentDetails = JSON.parse(
//       localStorage.getItem("paymentDetails")
//     );
//     setPaymentDetails(storedPaymentDetails);

//     let subTotal = 0;
//     let taxTotals = {};

//     storedSalesHistory.forEach((item) => {
//       const priceHT = item.price / (1 + parseFloat(item.taxe) / 100);
//       const itemSubtotal = priceHT * item.qty;
//       const itemTax = (itemSubtotal * parseFloat(item.taxe)) / 100;

//       subTotal += itemSubtotal;

//       if (taxTotals[item.taxe]) {
//         taxTotals[item.taxe] += itemTax;
//       } else {
//         taxTotals[item.taxe] = itemTax;
//       }
//     });

//     const total =
//       subTotal + Object.values(taxTotals).reduce((acc, tax) => acc + tax, 0);

//     setSubtotal(subTotal);
//     setTaxes(taxTotals);
//     setTotalPayable(total);
//   }, []);

//   const handleNavigateToPOS = () => {
//     localStorage.setItem("salesHistory", []);
//     navigate("/pos");
//   };

//   return (
//     <div style={styles.receipt}>
//       <header style={styles.header}>
//         <div style={styles.buttonContainer}>
//           <button style={styles.headerButton}>Imprimer</button>
//           <button style={styles.headerButton}>Print Dot</button>
//           <button style={styles.headerButton}>Email</button>
//           <button style={styles.headerButton} onClick={handleNavigateToPOS}>
//             Retour au POS
//           </button>
//         </div>
//         <img src="/uploads/logo.png" alt="Company Logo" style={styles.logo} />
//         <h2 style={styles.biller}>XXX 1</h2>
//         <div style={styles.companyInfo}>
//           <p>3 rue de la Libération, Dudelange L-3510 Luxembourg</p>
//           <p>Tél: +352 51 66 64</p>
//           <p>RCS: B213813</p>
//           <p>TVA: LU29316600</p>
//           <p>
//             Site Web:{" "}
//             <a
//               href="http://www.sss.eu"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               www.sss.eu
//             </a>
//           </p>
//           <p>
//             Email:{" "}
//             <a href="mailto:contact-clients@ooo.eu">contact-clients@ooo.eu</a>
//           </p>
//         </div>
//       </header>
//       <section style={styles.details}>
//         <div style={styles.leftInfo}>
//           <p>Date: 30/07/2024</p>
//           <p>Ref: F/POS2024/07/7762</p>
//         </div>
//         <div style={styles.productInfo}>
//           {salesHistory.map((item, index) => {
//             const priceHT = item.price / (1 + parseFloat(item.taxe) / 100);
//             const taxRate = parseFloat(item.taxe);

//             return (
//               <div key={index}>
//                 <div style={styles.productRow}>
//                   <span>
//                     #{index + 1}: {item.product}
//                   </span>
//                   {<span>{taxRate.toFixed(0)}%</span>}
//                 </div>
//                 <div style={styles.productRow}>
//                   <span>
//                     {item.qty} x {priceHT.toFixed(2)}€ [TVA (
//                     {taxRate.toFixed(0)}%){" "}
//                     {(item.qty * (item.price - priceHT)).toFixed(2)} € ]
//                   </span>
//                   <span>{(priceHT * item.qty).toFixed(2)}€</span>
//                 </div>
//               </div>
//             );
//           })}
//           <hr />
//           <p className="bold" style={styles.productRow}>
//             <span>Sous-Total (HT):</span>
//             <span>{subtotal.toFixed(2)}€</span>
//           </p>
//           {Object.keys(taxes).map(
//             (taxRate, index) =>
//               taxRate > 0 && (
//                 <p key={index} className="bold" style={styles.productRow}>
//                   <span>{parseFloat(taxRate).toFixed(0)}%:</span>
//                   <span>{taxes[taxRate].toFixed(2)}€</span>
//                 </p>
//               )
//           )}
//           <p className="bold" style={styles.productRow}>
//             <span>TOTAL (TTC):</span>
//             <span>{totalPayable.toFixed(2)}€</span>
//           </p>
//           <hr />
//           {paymentDetails &&
//             paymentDetails.payments.map((payment, index) =>
//               payment.paidBy === "cash" ? (
//                 <p key={index}>
//                   Payé par: Cash <br />
//                   Montant: {payment.amount}€ <br />
//                   Change: {paymentDetails.balance.toFixed(2)}€
//                 </p>
//               ) : payment.paidBy === "gift_card" ? (
//                 <p key={index}>
//                   Payé par: Carte Cadeau <br />
//                   Montant payé: {paymentDetails.totalPaying.toFixed(2)}€
//                   <br />Montant dû: {-paymentDetails.balance.toFixed(2)}€
//                 </p>
//               ) : null
//             )}
//           <hr />
//         </div>
//         <p className="text-center">Merci de votre achat.</p>
//       </section>
//     </div>
//   );
// };

// const styles = {
//   receipt: {
//     maxWidth: "600px",
//     margin: "auto",
//     fontFamily: "Arial, sans-serif",
//     border: "1px solid #ccc",
//     padding: "20px",
//     background: "#fff",
//   },
//   header: {
//     textAlign: "center",
//     marginBottom: "20px",
//   },
//   buttonContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     marginBottom: "20px",
//   },
//   headerButton: {
//     backgroundColor: "#0098d9",
//     color: "#fff",
//     border: "none",
//     padding: "15px",
//     cursor: "pointer",
//     fontSize: "18px",
//     borderRadius: "5px",
//     margin: "10px 0",
//     width: "100%",
//   },
//   logo: {
//     width: "300px",
//     height: "auto",
//   },
//   biller: {
//     fontSize: "24px",
//     margin: "10px 0",
//   },
//   companyInfo: {
//     fontSize: "12px",
//     textAlign: "center",
//     marginBottom: "20px",
//   },
//   details: {
//     fontSize: "14px",
//     marginTop: "20px",
//   },
//   leftInfo: {
//     textAlign: "left",
//     marginBottom: "20px",
//   },
//   productInfo: {
//     textAlign: "left",
//   },
//   productRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: "10px", // Space between rows
//   },
//   bold: {
//     fontWeight: "bold",
//   },
//   printButton: {
//     backgroundColor: "#0098d9",
//     color: "#fff",
//     border: "none",
//     padding: "15px",
//     cursor: "pointer",
//     fontSize: "18px",
//     borderRadius: "5px",
//     width: "100%",
//   },
// };

// export default Receipt;

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const Receipt = () => {
//   const { sale_id } = useParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     // Fetch data from the API using the sale_id
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost/PWA-POS/api/pos/view?sale_id=${sale_id}`);
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [sale_id]);

//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   const { Settings, rows, biller, customer, payments, inv } = data;

//   return (
//     <div className="page-container">
//       <div className="receipt-header">
//         <div className="receipt-buttons">
//           <button className="print-button">Imprimer</button>
//           <button className="dot-button">Print Dot</button>
//           <button className="email-button">Email</button>
//           <button className="return-button" onClick={() => navigate('/pos')}>Retour au POS</button>
//         </div>
//         <img className="logo" src={`${Settings.assets}${Settings.logo}`} alt="Logo" />
//         <h1 className="title">Biller</h1>
//         <div className="contact-info">
//           <p>{biller.company}</p>
//           <p>{biller.address}, {biller.city}</p>
//           <p>{biller.country}</p>
//           <p>{biller.phone}</p>
//         </div>
//       </div>

//       <div className="receipt-details">
//         <div className="date-ref">
//           <p><strong>Date:</strong> {new Date(inv.date).toLocaleString()}</p>
//           <p><strong>Reference:</strong> {inv.reference_no}</p>
//         </div>
//       </div>

//       <div className="product-details">
//         <div className="product-line">
//           {rows.map((item, index) => (
//             <div key={index} className="product-item">
//               <p><strong>Product:</strong> {item.product_name}</p>
//               <p><strong>Price:</strong> {item.unit_price} {Settings.default_currency}</p>
//             </div>
//           ))}
//         </div>

//         <div className="summary-line">
//           <p><strong>Sous Total:</strong> {inv.total} {Settings.default_currency}</p>
//           <p><strong>TOTAL:</strong> {inv.grand_total} {Settings.default_currency}</p>
//           <p><strong>Payé par:</strong> {payments[0].paid_by}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Receipt;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Receipt = () => {
  const { sale_id } = useParams();
  const [salesHistory, setSalesHistory] = useState([]);
  const [totalPayable, setTotalPayable] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [taxes, setTaxes] = useState({});
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [biller, setBiller] = useState({});
  const [inv, setInv] = useState({});
  const [invoiceFooter, setInvoiceFooter] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost/PWA-POS/api/pos/view?sale_id=${sale_id}`)
      .then(response => response.json())
      .then(data => {
        const { rows, payments, biller, Settings, inv } = data;
        
        setSalesHistory(rows);
        setPaymentDetails(payments);
        setBiller(biller);
        setInvoiceFooter(biller.invoice_footer);
        setInv(inv)
        let subTotal = 0;
        let taxTotals = {};

        rows.forEach((item) => {
          const priceHT = item.unit_price / (1 + parseFloat(item.tax_rate) / 100);
          const itemSubtotal = priceHT * item.quantity;
          const itemTax = (itemSubtotal * parseFloat(item.tax_rate)) / 100;

          subTotal += itemSubtotal;

          if (taxTotals[item.tax_rate]) {
            taxTotals[item.tax_rate] += itemTax;
          } else {
            taxTotals[item.tax_rate] = itemTax;
          }
        });

        const total =
          subTotal + Object.values(taxTotals).reduce((acc, tax) => acc + tax, 0);

        setSubtotal(subTotal);
        setTaxes(taxTotals);
        setTotalPayable(total);
      })
      .catch((error) => {console.error("Error fetching data:", error);navigate('/pos')});

      document.title = "Facture Non "+sale_id
  }, [sale_id]);

  const handleNavigateToPOS = () => {
    navigate("/pos");
  };

  // Function to format date in ../../..... .:.. style
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Format: DD/MM/YYYY HH:MM
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

  return (
    <div style={styles.receipt}>
      <header style={styles.header}>
        <div style={styles.buttonContainer}>
          <button style={styles.headerButton}>Imprimer</button>
          <button style={styles.headerButton}>Print Dot</button>
          <button style={styles.headerButton}>Email</button>
          <button style={styles.headerButton} onClick={handleNavigateToPOS}>
            Retour au POS
          </button>
        </div>
        <img src="/uploads/logo.png" alt="Company Logo" style={styles.logo} />
        <h2 style={styles.biller}>{biller.company}</h2>
        <div style={styles.companyInfo}>
          <p>{biller.address}, {biller.city} {biller.postal_code} {biller.country}</p>
          <p>Tél: {biller.phone}</p>
          <p>RCS: {biller.cf1}</p>
          <p>TVA: {biller.vat_no}</p>
          <p>
            Site Web:{" "}
            <a
              href={`http://${biller.cf3}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {biller.cf3}
            </a>
          </p>
          <p>
            Email:{" "}
            <a href={`mailto:${biller.cf4}`}>{biller.cf4}</a>
          </p>
        </div>
      </header>
      <section style={styles.details}>
        <div style={styles.leftInfo}>
          <p>Date: {formatDate(inv.date)}</p>
          <p>Ref: {inv.reference_no}</p>
        </div>
        <div style={styles.productInfo}>
          {salesHistory.map((item, index) => {
            const priceHT = item.unit_price / (1 + parseFloat(item.tax_rate) / 100);
            const taxRate = parseFloat(item.tax_rate);

            return (
              <div key={index}>
                <div style={styles.productRow}>
                  <span>
                    #{index + 1}: {item.product_name}
                  </span>
                  {<span>{taxRate.toFixed(0)}%</span>}
                </div>
                <div style={styles.productRow}>
                  <span>
                    {item.quantity} x {priceHT.toFixed(2)}€ [TVA (
                    {taxRate.toFixed(0)}%){" "}
                    {(item.quantity * (item.unit_price - priceHT)).toFixed(2)} € ]
                  </span>
                  <span>{(priceHT * item.quantity).toFixed(2)}€</span>
                </div>
              </div>
            );
          })}
          <hr />
          <p className="bold" style={styles.productRow}>
            <span>Sous-Total (HT):</span>
            <span>{subtotal.toFixed(2)}€</span>
          </p>
          {Object.keys(taxes).map(
            (taxRate, index) =>
              taxRate > 0 && (
                <p key={index} className="bold" style={styles.productRow}>
                  <span>{parseFloat(taxRate).toFixed(0)}%:</span>
                  <span>{taxes[taxRate].toFixed(2)}€</span>
                </p>
              )
          )}
          <p className="bold" style={styles.productRow}>
            <span>TOTAL (TTC):</span>
            <span>{totalPayable.toFixed(2)}€</span>
          </p>
          <hr />
          {paymentDetails &&
            paymentDetails.map((payment, index) =>
              payment.paid_by === "cash" ? (
                <p key={index}>
                  Payé par: Cash <br />
                  Montant: {payment.amount}€ <br />
                  Change: {payment.pos_balance}€
                </p>
              ) : payment.paid_by === "gift_card" ? (
                <p key={index}>
                  Payé par: Carte Cadeau <br />
                  Montant payé: {payment.amount}€
                  <br />Montant dû: {-payment.pos_balance}€
                </p>
              ) : null
            )}
          <hr />
        </div>
        <p className="text-center">{invoiceFooter}</p>
      </section>
    </div>
  );
};

const styles = {
  receipt: {
    maxWidth: "600px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
    border: "1px solid #ccc",
    padding: "20px",
    background: "#fff",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  headerButton: {
    backgroundColor: "#0098d9",
    color: "#fff",
    border: "none",
    padding: "15px",
    cursor: "pointer",
    fontSize: "18px",
    borderRadius: "5px",
    margin: "10px 0",
    width: "100%",
  },
  logo: {
    width: "300px",
    height: "auto",
  },
  biller: {
    fontSize: "24px",
    margin: "10px 0",
  },
  companyInfo: {
    fontSize: "12px",
    textAlign: "center",
    marginBottom: "20px",
  },
  details: {
    fontSize: "14px",
    marginTop: "20px",
  },
  leftInfo: {
    textAlign: "left",
    marginBottom: "20px",
  },
  productInfo: {
    textAlign: "left",
  },
  productRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px", // Space between rows
  },
  bold: {
    fontWeight: "bold",
  },
  printButton: {
    backgroundColor: "#0098d9",
    color: "#fff",
    border: "none",
    padding: "15px",
    cursor: "pointer",
    fontSize: "18px",
    borderRadius: "5px",
    width: "100%",
  },
};

export default Receipt;
