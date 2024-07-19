import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../components/Layout/Layout";
import TabProduct from "../components/Pos/TabProduct";
import {  faEdit, faMoneyBill, faPlusSquare, faTrashCan,faGift,faArrowRight,faComment   } from "@fortawesome/free-solid-svg-icons";
import { APP_NAME } from "../utilities/Params";
import CalculatorComponent from "../components/Pos/CalculatorComponent";
import api from "../utilities/Api";
import $ from 'jquery';
import CommentModal from "../components/Modal/CommentModal";

// css 
import "../css/posajax.css";
import "../css/pos.css";
import { useEffect, useRef, useState } from 'react';
import PaymentModal from "../components/Modal/PaymentModal";




export const PosPage = () => {

  const [showpaie , setShowPaie] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [salesHistory, setSalesHistory] = useState(JSON.parse(localStorage.getItem('salesHistory'))|| []); // State for Sales History
  const [nbrArticles , setNbrArticles] = useState("0");
  const [total , setTotal] = useState("0.00");
  const [qtyArticles , setQtyArticles] = useState("0");
  const [showComment, setShowComment] = useState(false);
  const [commentProduct, setCommentProduct] = useState(null);

  //
  const inputRef = useRef(null);
  const qtyRefs = useRef([]);

  const handleQtyChange = (e, index) => {
    const updatedSalesHistory = [...salesHistory];
    const newQty = parseInt(e.target.value, 10);
    console.log("=================");
    console.log(updatedSalesHistory);
    if (!isNaN(newQty) && newQty >= 1) {
      updatedSalesHistory[index].qty = newQty;
      updatedSalesHistory[index].ssTotal = newQty * updatedSalesHistory[index].price;
      setSalesHistory(updatedSalesHistory);
      updateSummary();
    }
  };
  
  //
  const [thedata , setThedata] = useState("");



  const updateSummary = () =>{
    setTotal(salesHistory.reduce((sum, item) => sum + item.ssTotal, 0).toFixed(2))
    setNbrArticles(salesHistory.length)
    setQtyArticles(salesHistory.reduce((sum, item) => sum + item.qty, 0).toFixed(2))
    localStorage.setItem('salesHistory', JSON.stringify(salesHistory));

  }

  const handleSearchChange = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      try {
        const response = await api.get('api/product/search', {
          params: { term }
        });

        if (response.data.length > 0) {
          setSuggestions(response.data);
        } else {
          setSuggestions([{ id: 0, label: 'No items found', value: term }]);
        }
      } catch (error) {
        console.error('Error fetching product suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    if(suggestion.id!=0){

      const newSale = {
        product: suggestion.code + " - "+ suggestion.name ,
        price: parseFloat(suggestion.price),
        qty:1,
        ssTotal:1*parseFloat(suggestion.price)
      };

      try {
        const response = await api.get('api/pos/getProductDataByCode', {params:{
          code: suggestion.code,
          warehouse_id: 1,
          customer_id: 1
        }});
        const data = response.data;
        newSale.category=data.category;
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    
   
      setSalesHistory([...salesHistory, newSale]); // Add new sale to sales history
    
    setSearchTerm("");
    setSuggestions([]);
    updateSummary();
    }
  };

  const handleClosePaie = () => {
    setShowPaie(false);
  };

  const handleShowPaie = () => {
    if (salesHistory.length === 0) {
      return alert('Veuillez ajouter le produit avant le paiement. Merci!');
    }
    setShowPaie(true);
  };

  const handleDeleteItem = (index) => {
    const updatedSalesHistory = [...salesHistory];
    updatedSalesHistory.splice(index, 1);
    setSalesHistory(updatedSalesHistory);
    updateSummary();
  };

  const handleGiftItemClick = (index) => {
    const updatedSalesHistory = [...salesHistory];
    updatedSalesHistory[index].price = 0;
    updatedSalesHistory[index].ssTotal = 0;
    updatedSalesHistory[index].comment = "Cadeau Client";
    setSalesHistory(updatedSalesHistory);
    updateSummary(); // Update any summary calculations if needed
  };

  const handleFraistItemClick = (index) => {
    const updatedSalesHistory = [...salesHistory];
    updatedSalesHistory[index].price = 0;
    updatedSalesHistory[index].ssTotal = 0;
    updatedSalesHistory[index].comment = "Frais de fonctionnement";
    setSalesHistory(updatedSalesHistory);
    updateSummary(); // Update any summary calculations if needed
  };
  

    const handleCommentClick = (item) => {
        setCommentProduct(item);
        setShowComment(true);

    };

    const handleCloseComment = () => {
        setShowComment(false);
        setCommentProduct(null)
    };

  useEffect(() => {

    updateSummary();
    // Initialize the search input keyboard
    try {
      $(inputRef.current).keyboard({
        layout: 'qwerty',
        customLayout: {
          default: [
            '1 2 3', '4 5 6', '7 8 9', '0 {bksp}',
            'Q W E R T Y', 'A S D F G', 'Z X C V B', '% .', '{clear}{space}'
          ],
          clear: 'Clear',
        },
        autoAccept: true,
        alwaysOpen: false,
        initialFocus: true,
        restrictInput: true,
        restrictInclude: /[0-9a-zA-Z%]/,
        change: async (e, keyboard) => {
          setSearchTerm(keyboard.$preview.val());
          if (keyboard.$preview.val().length > 0) {
            try {
              const response = await api.get('api/product/search', {
                params: { term: keyboard.$preview.val() }
              });
  
              if (response.data.length > 0) {
                setSuggestions(response.data);
              } else {
                setSuggestions([{ id: 0, label: 'No items found', value: keyboard.$preview.val() }]);
              }
            } catch (error) {
              console.error('Error fetching product suggestions:', error);
            }
          } else {
            setSuggestions([]);
          }
  
          // Focus the input to show the keyboard
          $(inputRef.current).focus();
        }
      });
  
      // Select and assign refs dynamically for quantity inputs
      const qtyRefsArray = [];
  
      for (let i = 0; i < salesHistory.length; i++) {
        const element = document.getElementById(`item-qty-${i}`);

        if (element) {
          qtyRefsArray.push(element);
        }
      }
      console.log("elements");
      console.log(qtyRefs.current);
      qtyRefs.current = qtyRefsArray;
  
      // Initialize the keyboard for each quantity input
      // qtyRefs.current.forEach((ref, index) => {
      //   if (ref) {
      //     $(ref).keyboard({
      //       layout: 'custom',
      //       customLayout: {
      //         default: [
      //           '1 2 3 {bksp}',
      //           '4 5 6 . C',
      //           '7 8 9 0 %',
      //           '{accept} {cancel}'
      //         ],
      //         accept: 'Accept',
      //         cancel: 'Cancel',
      //         bksp: '\u2190',
      //         clear: 'C'
      //       },
      //       autoAccept: true,
      //       alwaysOpen: false,
      //       initialFocus: true,
      //       restrictInput: true,
      //       restrictInclude: /[0-9%]/,
      //       change: (e, keyboard) => {
      //         const newValue = keyboard.$preview.val();
      //         handleQtyChange({ target: { value: newValue } }, index);     
      //       },
      //       css: {
      //         'keyboard-key-backspace': {
      //           backgroundColor: 'orange',
      //           color: 'white'
      //         },
      //         'keyboard-key-accept': {
      //           backgroundColor: 'green',
      //           color: 'white'
      //         },
      //         'keyboard-key-cancel': {
      //           backgroundColor: 'red',
      //           color: 'white'
      //         },
      //         'keyboard-key-clear': {
      //           backgroundColor: 'blue',
      //           color: 'white'
      //         }
      //       }
      //     });
      //   }
      // });
    } catch (error) {
      console.error('Error initializing keyboards:', error);
    }


  }, [salesHistory,showComment,commentProduct]);

    return (
      <>
      <Layout >
         <div id="content">
            <div class="c1">
               <div class="pos">
                  <div id="pos">
                     <form id="pos-sale-form"
                     acceptCharset="utf-8" action="pos" method="post" >
                        <div id="leftdiv"
                         style={{
                           padding: "10px 10px 5px",
                           background: "rgb(245, 245, 245)",
                           margin: "0px",
                           width: "100%",
                         }}>
                           <div id="printhead"
                           style={{ padding: "0px", margin: "0px", display: "none" }}>
                              <h4 style={{
                              padding: "0px",
                              margin: "0px",
                              fontFamily: "Ubuntu, sans-serif",
                              fontSize: "14px",
                              lineHeight: "14px",
                              textTransform: "uppercase",
                           }}>{APP_NAME}</h4>
                            <h5
                              style={{
                                 padding: "0px",
                                 margin: "0px",
                                 fontFamily: "Ubuntu, sans-serif",
                                 fontSize: "13px",
                                 lineHeight: "13px",
                                 textTransform: "uppercase",
                              }}
                              >
                           Liste des commandes
                           </h5>
                                 Date 29/05/2024 23:39{" "}
                           </div>
                           <div id="left-top" style={{ padding: "0px", margin: "0px" }}>
                           <div
          style={{
            padding: "0px",
            margin: "0px",
            position: "absolute",
            left: "-9999px",
          }}
        >
       
            </div>
            <div className="no-print">
            <div className="form-group" id="ui">
            <div className="form-group" id="ui">
          <input
            type="text"
            className="form-control pos-tip keyboard-input"
            inputMode="none"
            id="add_item"
            data-placement="top"
            data-trigger="focus"
            placeholder="Numeriser/ Rechercher un produit par nom/ Code"
            title="Product name tip"
            value={searchTerm}
            ref={inputRef}
            onChange={handleSearchChange}
          />
          {suggestions.length > 0 && (
  <ul className="suggestions-list">
    {suggestions.map((suggestion) => (
      <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
        {suggestion.label}
      </li>
    ))}
  </ul>
)}

      

            <div style={{ clear: 'both' }}>
            </div>
            </div>
         </div>
         </div>
         </div>
         <div id="print">
         <div id="left-middle" 
         style={{
            padding: "0px",
            margin: "0px",
            position: "relative",
            height: "231px",
            minHeight: "278px",
          }}>
         <div id="product-list" className="ps-container"
          style={{
            padding: "0px",
            margin: "0px",
            borderBottom: "1px solid rgb(221, 221, 221)",
            position: "absolute",
            width: "100%",
            height: "350px",
            minHeight: "278px",
            overflow: "scroll",
          }}>
         <table id="posTable"
            className="table items table-striped table-bordered table-condensed table-hover sortable_table"
            style={{ margin: "0px", padding: "0px", marginBottom: "0px" }}>
        
         <thead className="tableFloatingHeaderOriginal"
              style={{ padding: "0px", margin: "0px" }}>
   
         <tr style={{ padding: "0px", margin: "0px" }}>
                <th
                  width="40%"
                  style={{
                    padding: "0px",
                    margin: "0px",
                    borderColor: "rgb(53, 126, 189)",
                    backgroundColor: "rgb(66, 139, 202)",
                    color: "white",
                    borderTopWidth: "1px",
                    borderTopStyle: "solid",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  Produit
                </th>
                <th
                  width="15%"
                  style={{
                    padding: "0px",
                    margin: "0px",
                    borderColor: "rgb(53, 126, 189)",
                    backgroundColor: "rgb(66, 139, 202)",
                    color: "white",
                    borderTopWidth: "1px",
                    borderTopStyle: "solid",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  Prix
                </th>
                <th
                  width="15%"
                  style={{
                    padding: "0px",
                    margin: "0px",
                    borderColor: "rgb(53, 126, 189)",
                    backgroundColor: "rgb(66, 139, 202)",
                    color: "white",
                    borderTopWidth: "1px",
                    borderTopStyle: "solid",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  Qty
                </th>
                <th
                  width="20%"
                  style={{
                    padding: "0px",
                    margin: "0px",
                    borderColor: "rgb(53, 126, 189)",
                    backgroundColor: "rgb(66, 139, 202)",
                    color: "white",
                    borderTopWidth: "1px",
                    borderTopStyle: "solid",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  Ss-Total
                </th>
                <th
                  style={{
                    padding: "0px",
                    margin: "0px",
                    borderColor: "rgb(53, 126, 189)",
                    backgroundColor: "rgb(66, 139, 202)",
                    color: "white",
                    borderTopWidth: "1px",
                    borderTopStyle: "solid",
                    width: "5%",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  <FontAwesomeIcon icon={faTrashCan} 
                  style={{ padding: "0px", margin: "0px", opacity: 0.5 }}/>
               </th>
         </tr>
         </thead>
         <tbody className="ui-sortable"
              style={{ padding: "0px", margin: "0px" }}>
          {salesHistory.map((item, index) => (
  <tr key={index}>
    <td>
      {item.product} ({item.category})
      <br />
      <span>En stock: 0 <FontAwesomeIcon icon={faComment} style={{ color: 'black', fontSize: '12px', cursor: 'pointer', marginLeft: '5px' }} onClick={()=>handleCommentClick(item)} /></span>

      {item.category !== "27" && (
        <>
          <br />
          <br />
          <div className="label-wrapper">
            <div>
              Cadeau client
              <FontAwesomeIcon
                icon={faGift}
                className="fa-gift tip pointer edit3"
                title="Cadeau"
                style={{ cursor: 'pointer', color: 'green' }}
                onClick={() => handleGiftItemClick(index)}
              />
            </div>
            <div>
              Frais
              <FontAwesomeIcon
                icon={faArrowRight}
                className="fa-arrow-right tip pointer edit3"
                title="Frais"
                style={{ cursor: 'pointer', color: 'blue' }}
                onClick={() => handleFraistItemClick(index)}
              />
            </div>
          </div>
        </>
      )}
    </td>
    <td>{item.price}</td>
    <td style={{ textAlign: "center" }}>
      <input
        type="number"
        min="1"
        value={item.qty}
        onChange={(e) => handleQtyChange(e, index)}
        style={{
          width: "60px",
          textAlign: "center",
          padding: "5px 8px",
          fontSize: "14px",
        }}
      />
    </td>
      {/* tab product component */}
      {showComment && <CommentModal show={showComment} handleClose={handleCloseComment} salesHistory={salesHistory} setSalesHistory={setSalesHistory} index={index} item={commentProduct} />}
    <td>{item.ssTotal}</td>
    <td>
      <button
        type="button"
        className="btn btn-sm btn-danger"
        onClick={() => handleDeleteItem(index)}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </td>
  </tr>
))}

         </tbody>
         </table>
         <div style={{ clear: 'both' }}></div>
         <div
              className="ps-scrollbar-x"
              style={{
                padding: "0px",
                margin: "0px",
                left: "0px",
                width: "0px",
              }}
            />
          </div>
          <div
            className="ps-scrollbar-y-rail"
            style={{
              padding: "0px",
              margin: "0px",
              top: "0px",
              height: "277px",
              display: "none",
              right: "3px",
            }}
          >
            <div
              className="ps-scrollbar-y"
              style={{
                padding: "0px",
                margin: "0px",
                top: "0px",
                height: "0px",
              }}
            />
          </div>
        </div>
     
         <div style={{ clear: 'both' }}></div>
         <div id="left-bottom">
         <table id="totalTable" 
         style={{
            margin: "0px",
            padding: "5px",
            background: "rgb(255, 255, 255)",
            width: "100%",
            marginTop:'101.6px',
            cssFloat: "right",
            color: "rgb(0, 0, 0)",
          }}>
         <tr>
         <td style={{ padding: '5px 10px', borderTop: '1px solid #DDD' }}>Articles</td>
         <td className="text-right" style={{ padding: '5px 10px', fontSize: '14px', fontWeight: 'bold', borderTop: '1px solid #DDD' }}>
         <span id="titems">{nbrArticles} ({qtyArticles})</span>
         </td>
         <td style={{ padding: '5px 10px', borderTop: '1px solid #DDD' }}>Total</td>
         <td className="text-right" style={{ padding: '5px 10px', fontSize: '14px', fontWeight: 'bold', borderTop: '1px solid #DDD' }}>
         <span id="total">{total}</span>
         <input id="newdiscount" style={{ display: 'none' }} defaultValue="0" />
         <input id="maxbon" style={{ display: 'none' }} defaultValue="" />
         <span id="newdiscount2"></span>
         </td>
         </tr>
         <tr>
         <td style={{ padding: '5px 10px' }}>Taxe de commande
         <a href="/" id="pptax2">
         <FontAwesomeIcon icon={faEdit} />
         </a>
         </td>
         <td className="text-right" style={{ padding: '5px 10px', fontSize: '14px', fontWeight: 'bold' }}>
         <span id="ttax2">0.00</span>
         </td>
         <td style={{ padding: '5px 10px' }}>Remise
         <a href="/" id="ppdiscount">
         <FontAwesomeIcon icon={faEdit}  />                
         </a>
         </td>
         <td className="text-right" style={{ padding: '5px 10px', fontSize: '14px' , fontWeight: 'bold' }}>
         <span id="tds">0.00</span>
         </td>
         </tr>
         <tr>
         <td
         style={{
            margin: "0px",
            padding: "5px 10px",
            borderTop: "1px solid rgb(102, 102, 102)",
            borderBottom: "1px solid rgb(51, 51, 51)",
            background: "rgb(51, 51, 51)",
            fontWeight: "bold",
            color: "rgb(255, 255, 255)",
          }}
         colSpan="2"
         >
         Total à payer
         <a href="/" id="pshipping">
         <FontAwesomeIcon icon={faPlusSquare} />
         </a>
         <span id="tship"></span>
         </td>
         <td
         className="text-right"
         style={{
         padding: '5px 10px',
         fontSize: '14px',
         borderTop: '1px solid #666',
         borderBottom: '1px solid #333',
         fontWeight: 'bold',
         background: '#333',
         color: '#FFF',
         }}
         colSpan="2"
         >
         <span id="gtotal">0.00</span>
         </td>
         </tr>
         </table>
         <div className="clearfix"></div>
         <div id="botbuttons" className="col-xs-12 text-center">
         <input type="hidden" name="biller" id="biller" value="" />
         <div className="row">
         <div className="col-xs-4" style={{ padding: 0 }}>
         <button type="button" className="btn btn-success btn-block" id="payment" style={{ height: '67px' ,width:'94%'}}
         onClick={handleShowPaie}>
         <FontAwesomeIcon icon={faMoneyBill} />
         Paiement
         </button>
         </div>
         </div>
         <PaymentModal  show={showpaie} handleClose={handleClosePaie} itemCount={qtyArticles} totalPayable={total} />
         </div>
         <div style={{ clear: 'both', height: '5px' }}></div>
         <div id="num">
         <div id="icon"></div>
         </div>
         <span id="hidesuspend"></span>
         <input type="hidden" name="pos_note" value="" id="pos_note" />
         <input type="hidden" name="staff_note" value="" id="staff_note" />
         <div id="payment-con">
         <input type="hidden" name="amount[]" id="amount_val" value="" />
         <input type="hidden" name="balance_amount[]" id="balance_amount" value="" />
         <input type="hidden" name="paid_by[]" id="paid_by_val" value="cash" />
         <input type="hidden" name="cc_no[]" id="cc_no_val" value="" />
         <input type="hidden" name="paying_gift_card_no[]" id="paying_gift_card_no_val" value="" />
         <input type="hidden" name="cc_holder[]" id="cc_holder_val" value="" />
         <input type="hidden" name="cheque_no[]" id="cheque_no_val" value="" />
         <input type="hidden" name="cc_month[]" id="cc_month_val" value="" />
         <input type="hidden" name="cc_year[]" id="cc_year_val" value="" />
         <input type="hidden" name="cc_type[]" id="cc_type_val" value="" />
         <input type="hidden" name="cc_cvv2[]" id="cc_cvv2_val" value="" />
         <input type="hidden" name="payment_note[]" id="payment_note_val" value="" />
         </div>
         <input name="order_tax" type="hidden" value="" id="postax2" />
         <input name="discount" type="hidden" value="" id="posdiscount" />
         <input name="shipping" type="hidden" value="0" id="posshipping" />
         <input type="hidden" name="rpaidby" id="rpaidby" value="cash" style={{ display: 'none' }} />
         <input type="hidden" name="total_items" id="total_items" value="0" style={{ display: 'none' }} />
         <input type="submit" id="submit_sale" value="Submit Sale" style={{ display: 'none' }} />
         </div>
         </div>
         </div> 
  </form>
         <div id="cp">
            <div id="cpinner">
               <div class="quick-menu">
                  <div id="proContainer"
                   style={{ margin: "0px", padding: "5px", display: "block" }}>
                     <div class="x">
                        <div class="pane">
                           <div class="input-box2">
                              <div class="input-group2">
                              <input
  type="text"
  className="form-control thedata big"
  value={thedata}
  onChange={(e) => setThedata(e.currentTarget.value)}
  style={{
    fontSize: '1.5em',       
    backgroundColor: '#508cff', 
    color: 'white'  
  }}
/>
                            
                                  <span
                      id="s"
                      className="input-group-addon2"
                      style={{
                        margin: "0px",
                        padding: "3px",
                        border: "1px solid rgb(204, 204, 204)",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: 1,
                        color: "rgb(85, 85, 85)",
                        textAlign: "center",
                        backgroundColor: "rgb(238, 238, 238)",
                        display: "none",
                      }}
                    >
                      <span
                        className="glyphicon glyphicon-menu-down"
                        style={{ padding: "0px", margin: "0px" }}
                      />
                      X
                    </span>
                         {/* calculator  component */}
                        <CalculatorComponent setThedata={setThedata}/>

                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div id="ajaxproducts">
            <div>
               {/* tab product component */}
               <TabProduct salesHistory={salesHistory} setSalesHistory={setSalesHistory} setNbrArticles={setNbrArticles} thedata={thedata} setThedata={setThedata}/>

              
            </div>
            <div>
               <div
               id="item-list3"
               style={{ height: '100px', minHeight: '100px' }}
               >
            </div>
         </div>
         </div>
            </div>
         </div>
        
         <div style={{clear:'both'}}></div>
         </div>
         </div>
         </div>
         <div style={{clear:'both'}}></div>
         </div>
         <div style={{clear:'both'}}></div>
         <div style={{clear:'both'}}></div>
      </Layout>
      </>
    );
}


//   const initializeKeyboard = (input, index) => {
//   $(input).keyboard({
//     layout: 'custom',
//     customLayout: {
//       default: [
//         '1 2 3 {bksp}',
//         '4 5 6 . C',
//         '7 8 9 0 %',
//         '{accept} {cancel}'
//       ],
//       accept: 'Accept',
//       cancel: 'Cancel',
//       bksp: '\u2190', // Unicode for left arrow
//       clear: 'C'
//     },
//     autoAccept: true,
//     alwaysOpen: false,
//     initialFocus: true,
//     restrictInput: true,
//     restrictInclude: /[0-9%]/,
//     change: (e, keyboard) => {
//       console.log("00000000000000000");
//       console.log(salesHistory);
//       const newValue = keyboard.$preview.val();
//       handleQtyChange({ target: { value: newValue } }, index);
//     },
//     css: {
//       'keyboard-key-backspace': {
//         backgroundColor: 'orange',
//         color: 'white'
//       },
//       'keyboard-key-accept': {
//         backgroundColor: 'green',
//         color: 'white'
//       },
//       'keyboard-key-cancel': {
//         backgroundColor: 'red',
//         color: 'white'
//       },
//       'keyboard-key-clear': {
//         backgroundColor: 'blue',
//         color: 'white'
//       }
//     }
//   });
// };

// ref={(input) => input && initializeKeyboard(input, index)}