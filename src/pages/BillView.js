import React, { useEffect, useState } from 'react';

const BillView = () => {
  const [salesHistory, setSalesHistory] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);


  useEffect(() => {
    // Fetch salesHistory from localStorage if available
    const savedSalesHistory = JSON.parse(localStorage.getItem('salesHistory'));
    if (savedSalesHistory) {
      setSalesHistory(savedSalesHistory);
    }
  }, []);

  useEffect(() => {
    // Calculate totals when salesHistory changes
    let items = 0;
    let price = 0;
    let tax = 0;

    salesHistory.forEach(item => {
      items += item.qty;
      price += item.ssTotal;
      // Example tax calculation logic
      tax += item.price * item.qty * 0.1; // Adjust as per your tax calculation needs
    });

    setTotalItems(items);
    setTotalPrice(price);
    setTotalTax(tax);
    setTotalPayable(price + tax);

  }, [salesHistory]);

  useEffect(() => {
    // Listen for storage events to update salesHistory if it changes in another tab/window
    const handleStorageChange = (event) => {
      if (event.key === 'salesHistory') {
        const updatedSalesHistory = JSON.parse(event.newValue);
        setSalesHistory(updatedSalesHistory);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="wrap" style={styles.wrap}>
      <div className="bill" id="bill" style={styles.bill}>
        <div id="product-list" style={styles.productList}>
          <table style={styles.table} id="billTable" className="table table-striped table-condensed">
            <thead>
              <tr>
                <th width="50%" className="text-center">Product</th>
                <th width="15%" className="text-center">Price</th>
                <th width="15%" className="text-center">Qty</th>
                <th width="20%" className="text-center">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {salesHistory.map((item, index) => (
                <tr key={index}>
                  <td>{item.product}</td>
                  <td className="text-right">{item.price.toFixed(2)}</td>
                  <td className="text-center">{item.qty}</td>
                  <td className="text-right">{item.ssTotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div id="totals" style={styles.totals}>
          <table style={styles.totalTable} id="totalTable">
            <tbody>
              <tr>
                <td style={styles.tableData}>Items</td>
                <td style={styles.tableDataRight}><span id="titems">{totalItems}</span></td>
                <td style={styles.tableData}>Total</td>
                <td style={styles.tableDataRight}><span id="total">{totalPrice.toFixed(2)}</span></td>
              </tr>
              <tr>
                <td style={styles.tableData}>Order Tax</td>
                <td style={styles.tableDataRight}><span id="ttax2">{totalTax.toFixed(2)}</span></td>
                <td style={styles.tableData}>Discount</td>
                <td style={styles.tableDataRight}><span id="tds">0.00</span></td>
              </tr>
              <tr>
                <td colSpan="3" style={styles.totalPayableHeader}>Total Payable</td>
                <td colSpan="1" style={styles.totalPayable}><span id="gtotal">{totalPayable.toFixed(2)}</span></td>
              </tr>
            </tbody>
          </table>
          <div style={styles.clearfix}></div>
        </div>
      </div>
      <div className="main" style={styles.main}>
        <div className="content" id="rightside-content" style={styles.content}>
          {/* Removed iframe for static version */}
          <div style={styles.clearfix}></div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrap: {
    margin: 0,
    padding: 0,
    overflow: 'hidden'
  },
  bill: {
    minHeight: '600px',
    background: '#FFF',
    margin: '20px',
    float: 'left',
    width: '400px'
  },
  productList: {
    display: 'block',
    overflow: 'hidden',
    minHeight: '486px',
    border: '1px solid #ddd',
    padding: '20px 20px 0 20px'
  },
  table: {
    marginBottom: 0,
    width: '100%'
  },
  totals: {
    borderTop: '1px solid #ddd'
  },
  totalTable: {
    width: '100%',
    float: 'right',
    padding: '5px',
    color: '#000',
    background: '#FFF'
  },
  tableData: {
    borderLeft: '1px solid #ddd',
    paddingLeft: '10px',
    textAlign: 'left',
    fontWeight: 'normal'
  },
  tableDataRight: {
    textAlign: 'right',
    paddingRight: '10px',
    fontWeight: 'bold'
  },
  totalPayableHeader: {
    padding: '5px 0px 5px 10px',
    textAlign: 'left',
    fontSize: '1.4em',
    border: '1px solid #333',
    fontWeight: 'bold',
    background: '#333',
    color: '#FFF'
  },
  totalPayable: {
    textAlign: 'right',
    padding: '5px 10px 5px 0px',
    fontSize: '1.4em',
    border: '1px solid #333',
    fontWeight: 'bold',
    background: '#333',
    color: '#FFF'
  },
  main: {
    margin: '20px 20px 0 0',
    width: 'calc(100% - 470px)',
    float: 'right'
  },
  content: {
    display: 'block'
  },
  clearfix: {
    clear: 'both'
  }
};

export default BillView;