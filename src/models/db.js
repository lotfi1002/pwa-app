// db.js
import Dexie from 'dexie';

export const db = new Dexie('posDB');
db.version(1).stores({
  user: '++id, login , password , email , name, age', // Primary key and indexed props
  product : '++id, libelle , pu'
});