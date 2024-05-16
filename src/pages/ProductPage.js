import React, { useState } from 'react';
import {db} from '../models/db'
import '../css/style.css';
import Layout from '../components/Layout/Layout';

export const ProductPage = () => {
   
    const [libelle, setLibelle] = useState('');
    const [pu, setPu] = useState(0);
    const [status, setStatus] = useState('');

async function  handleSave (event ){
  event.preventDefault();  // to prevent page reload 

        try {
            // Add the new product!
            const id = await db.product.add({
              libelle,
              pu
            });

            //console.log(id);
      
            setStatus(`Product  successfully added ${id}`);
            setLibelle('');
            setPu(0);
          } catch (error) {
            setStatus(`Failed to add ${libelle}: ${error}`);
          }
    };


    return (
      <Layout>
        <div className="App-header3">
          <h2>Indexed-DB CRUD</h2>
          <div className="form-container">
          <form onSubmit={handleSave}>
            <input
              className="input-field"
              type="text"
              value={libelle}
              onChange={(e) => setLibelle(e.target.value)}
              placeholder="Libelle"
            />
            <input
              className="input-field"
              type="number"
              value={pu}
              onChange={(e) => setPu(e.target.value)}
              placeholder="Prix Unitaire"
            />
            <button className="button" >Add</button>
            </form>
          </div>
          <p>{status}</p>
          
        </div>
        </Layout>
      );


     
}

