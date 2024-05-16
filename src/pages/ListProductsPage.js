import {db} from '../models/db'
import { useLiveQuery } from "dexie-react-hooks";
import { BASE_URL } from '../utilities/Params';
import api from '../utilities/Api';

export const ProductList = () => {
    //const [resp, setResp] = useState('');
    // offline 
    const products = useLiveQuery(() => db.product.toArray());
    // online 
    function componentDidMount(){
        api.get(BASE_URL+'api/users').then((response) => {
            console.log(response.data) ; 
            });
    };

    componentDidMount();


    function getProduct(){

        api.get(BASE_URL+'api/product/1').then((response) => {
            console.log(response.data) ; 
            });

    }

    getProduct();

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