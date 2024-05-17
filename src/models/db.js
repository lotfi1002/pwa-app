// db.js
import Dexie from 'dexie';
// indexeddb
export const db = new Dexie('posDB');
db.version(1).stores({
  user: '++id, username , password , email', // Primary key and indexed props
  product : '++id, libelle , pu'
});