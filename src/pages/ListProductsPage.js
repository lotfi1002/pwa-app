import {db} from '../models/db'
import axios from "axios";
import { useLiveQuery } from "dexie-react-hooks";
import { url } from '../utilities/Params';

export const ProductList = () => {
    //const [resp, setResp] = useState('');
    const products = useLiveQuery(() => db.product.toArray());

    function componentDidMount(){
        axios.get(url+'api/users').then((response) => {
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