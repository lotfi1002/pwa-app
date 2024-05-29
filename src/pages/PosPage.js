import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../components/Layout/Layout";
import TabProduct from "../components/Pos/TabProduct";
import {  faEdit, faEye, faMoneyBill, faPencil, faPlusCircle, faPlusSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import "../css/style.css";
import "../css/posajax.css";
import "../css/pos.css";
import { APP_NAME } from "../utilities/Params";
import CalculatorComponent from "../components/Pos/CalculatorComponent";
//import "../css/header.css";
export const PosPage = () => {
   
    return (
      <>
      <Layout>
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
                              <div style={{
                                    padding: "0px",
                                    margin: "0px",
                                    position: "absolute",
                                    left: "-9999px",
                                 }}>
                                     <input
                                       id="test"
                                       className="kb-pad ui-keyboard-input ui-widget-content ui-corner-all"
                                       name="test"
                                       type="text"
                                       aria-haspopup="true"
                                       style={{ padding: "0px", margin: "0px", boxShadow: "none" }}
                                    />
                           </div>
                           <div className="form-group"
                            style={{ padding: "0px", margin: "0px", marginBottom: "5px" }}>
                     
                        <div className="input-group" style={{ zIndex: 1 }}>
                              <div
                                 id="s2id_poscustomer"
                                 className="select2-container form-control pos-input-tip"
                                 style={{
                                 padding: "0px",
                                 margin: "0px",
                                 width: "100%",
                                 borderRadius: "0px",
                                 }}>
                                    
                                    <input id="poscustomer"
                                       className="form-control"
                                       name="customer"
                                       type="text"
                                       required
                                       tabIndex="-1"
                                        />
                              <div className="input-group-addon no-print" style={{ padding: '2px 8px', borderLeft: 0 }}>
                              <button  id="toogle-customer-read-attr" >
                                 <FontAwesomeIcon icon={faPencil} style={{
                                 padding: "0px",
                                 margin: "0px",
                                 fontSize: "1.2em",
                              }}/>
                              </button>
                           </div>
                           <div className="input-group-addon no-print" style={{ padding: '2px 7px', borderLeft: 0 }}>
                           <button   id="view-customer" className="external" data-toggle="modal" data-target="#myModal">
                              <FontAwesomeIcon icon={faEye} 
                              style={{
                                 padding: "0px",
                                 margin: "0px",
                                 fontSize: "1.2em",
                              }}/>
                           </button >
                        </div>
                              </div>
                           </div>
                  <div style={{ clear: 'both' }}>
               </div>
            </div>
            <div className="no-print">
            <div className="form-group" id="ui">
            <div className="input-group">
            <select
            value="{selectedWarehouse}"
            className="form-control poswarehouse pos-input-tip"
            data-placeholder="Select Warehouse"
            required="required"
            style={{ width: '100%' }}
            >
            <option value="">Select Warehouse</option>
            </select>
            </div>
            <div className="form-group" id="ui">
            <input
               type="text"
               value="Chercher"
               className="form-control pos-tip"
               inputMode="none"
               id="add_item"
               data-placement="top"
               data-trigger="focus"
               placeholder="Search product by name or code"
               title="Product name tip"
               />
            <div className="input-group-addon" style={{ padding: '2px 8px' }}>
            <button  >
            <FontAwesomeIcon icon={faPlusCircle} />
            </button>
            </div>
            <div style={{ clear: 'both' }}>
            </div>
            </div>
         </div>
         </div>
         </div>
         <div id="print">
         <div id="left-middle">
         <div id="product-list" style={{ overflow: 'scroll!important' }}>
         <table className="table items table-striped table-bordered table-condensed table-hover sortable_table" id="posTable" style={{ marginBottom: 0 }}>
         <thead>
         <tr>
         <th width="40%">Produit</th>
         <th width="15%">Prix</th>
         <th width="15%">Qty</th>
         <th width="20%">Ss-Total</th>
         <th style={{ width: '5%', textAlign: 'center' }}>
         <FontAwesomeIcon icon={faTrashCan} />
         </th>
         </tr>
         </thead>
         <tbody>
         </tbody>
         </table>
         <div style={{ clear: 'both' }}></div>
         </div>
         </div>
         <div style={{ clear: 'both' }}></div>
         <div id="left-bottom">
         <table id="totalTable" style={{ width: '100%', float: 'right', padding: '5px', color: '#000', background: '#FFF' }}>
         <tr>
         <td style={{ padding: '5px 10px', borderTop: '1px solid #DDD' }}>Articles</td>
         <td className="text-right" style={{ padding: '5px 10px', fontSize: '14px', fontWeight: 'bold', borderTop: '1px solid #DDD' }}>
         <span id="titems">0</span>
         </td>
         <td style={{ padding: '5px 10px', borderTop: '1px solid #DDD' }}>Total</td>
         <td className="text-right" style={{ padding: '5px 10px', fontSize: '14px', fontWeight: 'bold', borderTop: '1px solid #DDD' }}>
         <span id="total">0.00</span>
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
         <td style={{ padding: '5px 10px' }}>Remise</td>
         <a href="/" id="ppdiscount">
         <FontAwesomeIcon icon={faEdit}  />                
         </a>
         <td className="text-right" style={{ padding: '5px 10px', fontWeight: 'bold' }}>
         <span id="tds">0.00</span>
         </td>
         </tr>
         <tr>
         <td
         style={{
         padding: '5px 10px',
         borderTop: '1px solid #666',
         borderBottom: '1px solid #333',
         fontWeight: 'bold',
         background: '#333',
         color: '#FFF',
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
         <div className="col-xs-12" style={{ padding: 0 }}>
         <button type="button" className="btn btn-success btn-block" id="payment" style={{ height: '67px' }}>
         <FontAwesomeIcon icon={faMoneyBill} />
         Paiement
         </button>
         </div>
         </div>
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
                                 <input type="text" className="form-control thedata big"
                      
                                    style={{
                                       padding: "10px",
                                       margin: "3px",
                                       border: "none",
                                       transition: "box-shadow 0.2s ease 0s",
                                       color: "white",
                                       backgroundColor: "rgb(80, 140, 255)",
                                       boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 30px inset",
                                       fontFamily: "Dosis, sans-serif",
                                       fontSize: "2.5em",
                                       borderRadius: "0px",
                                    }} />
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

                        <CalculatorComponent />

                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div id="ajaxproducts">
            <div>
               <TabProduct/>
            </div>
            <div>
               <div
               id="item-list3"
               style={{ height: '100px', minHeight: '100px' }}
               >
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
