import {db} from '../models/db'
import React, { useState } from 'react';
import axios from "axios";
import { useLiveQuery } from "dexie-react-hooks";

export const ProductList = () => {
    //const [resp, setResp] = useState('');
    const products = useLiveQuery(() => db.product.toArray());

    function componentDidMount(){
        axios.get('http://localhost/PWA-POS/api/users').then((response) => {
            console.log(response.data) ; 
            });
    };

    componentDidMount();
    return (
        <>
        <h1> List Of product </h1>
        <ul>
          {products?.map((product) => (
            <li key={product.id}>
              {product.libelle}, {product.pu}
            </li>
        
          ))}
       
        </ul>
        </>
      );
  };