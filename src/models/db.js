// db.js
import Dexie from 'dexie';
// indexeddb
export const db = new Dexie('posDB');
db.version(1).stores({
  user: '++id, username , password , email ,  lpassword', // Primary key and indexed props
  product : '++id, libelle , pu',
  pos_register : '++id ,date,user_id,cash_in_hand,status,total_cash,total_cheques,total_cc_slips,total_cash_submitted,total_cheques_submitted,total_cc_slips_submitted,note,closed_at,transfer_opened_bills,closed_by,total_ba,total_gains,total_refunds,total_returned'
});