// db.js
import Dexie from 'dexie';
// indexeddb
export const db = new Dexie('posDB');
db.version(3).stores({
  user:'id, last_ip_address, ip_address, username, password, lpassword, salt, email, activation_code, forgotten_password_code, forgotten_password_time, remember_code, created_on, last_login, active, first_name, last_name, company, phone, avatar, gender, group_id, warehouse_id, biller_id, company_id, show_cost, show_price, award_points, view_right, edit_right, allow_discount',
  pos_register : 'id ,date,user_id,cash_in_hand,status,total_cash,total_cheques,total_cc_slips,total_cash_submitted,total_cheques_submitted,total_cc_slips_submitted,note,closed_at,transfer_opened_bills,closed_by,total_ba,total_gains,total_refunds,total_returned,commit',
  suggestion: '++id, label, code, name, price, qty, variants',
  product: '++id, label, code, name, price, qty, variants, row, combo_items, tax_rate, units, options',
  gift_card:'id, date, card_no, value, customer_id, customer, balance, expiry, created_by, note'

});