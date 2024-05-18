import {db} from '../models/db'
import { useLiveQuery } from "dexie-react-hooks";
import { BASE_URL } from '../utilities/Params';
import api from '../utilities/Api';
import Layout from '../components/Layout/Layout';
import { isOnline } from '../utilities/CheckOnline';


export const ProductList = () => {
   

    
    // offline 
    const products = useLiveQuery(() => db.product.toArray());
    // online 
    function componentDidMount(){

        api.get(BASE_URL+'api/users').then((response) => {
            
              console.log(response.data);
            
            }).catch((error)=>{
              console.log(error);
             

            });
    };


    function getProduct(){

        api.get(BASE_URL+'api/product/1').then((response) => {
          
              console.log(response.data);
            
            }).catch((error)=>{
             
              console.log(error);
              
            });

    }

    if(isOnline() === true ){ // online request towards backend 
     
      getProduct();
      componentDidMount();
  }
    return (
        <>
        <Layout>
        <h1> List Of product </h1>
        <ul>
          {products?.map((product) => (
            <li key={product.id}>
              {product.libelle}, {product.pu}
            </li>
        
          ))}
       
        </ul>
        </Layout>
        </>
      );
  };