import {db} from '../models/db'
import { useLiveQuery } from "dexie-react-hooks";

export const ProductList = () => {
    const products = useLiveQuery(() => db.product.toArray());

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