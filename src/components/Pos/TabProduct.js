import { useState } from 'react';
import VenteModal from '../Modal/VenteModal';
import GainsModal from '../Modal/GainsModal';
import api from '../../utilities/Api';
import { isAppOnline } from '../../utilities/CheckOnline';
import ProductDao from '../../dao/ProductsDao';



const productData = [
  {
    id: '279692',
    value: '84179539',
    title: 'Gains Euromillion',
    imgSrc: 'https://top.oki.lu/assets/uploads/e73b8de3201a1ded538ec23bffdef34b.jpeg',
    bgColor: 'red'
  },
  {
    id: '279689',
    value: '52934805',
    title: 'Gains Lotto',
    imgSrc: 'https://top.oki.lu/assets/uploads/edca12b1fa027a974f3e02cbb30a5edb.png',
    bgColor: 'red'
  },
  {
    id: '279693',
    value: '43804330',
    title: 'Gains ODDSET',
    imgSrc: 'https://top.oki.lu/assets/uploads/33e8166d201dfdfc7b11a9bb40dd7ac6.png',
    bgColor: 'red'
  },
  {
    id: '279691',
    value: '89203846',
    title: 'Gains PMU',
    imgSrc: 'https://top.oki.lu/assets/uploads/235655c2101a6bfa485e781acf7d8f54.png',
    bgColor: 'red'
  },
  {
    id: '279690',
    value: '53548196',
    title: 'Gains Rubbel',
    imgSrc: 'https://top.oki.lu/assets/uploads/d9205b62f2756bcd2b713134b3e22b18.jpeg',
    bgColor: 'red'
  },
  {
    id: '279695',
    value: '75525215',
    title: 'Ticket Lotto',
    imgSrc: 'https://top.oki.lu/assets/uploads/edca12b1fa027a974f3e02cbb30a5edb.png',
    bgColor: '#b8ecb8'
  },
  {
    id: '279696',
    value: '85437033',
    title: 'Ticket EUROMILLION',
    imgSrc: 'https://top.oki.lu/assets/uploads/e73b8de3201a1ded538ec23bffdef34b.jpeg',
    bgColor: '#b8ecb8'
  },
  {
    id: '279698',
    value: '12100558',
    title: 'Ticket ODDSET',
    imgSrc: 'https://top.oki.lu/assets/uploads/33e8166d201dfdfc7b11a9bb40dd7ac6.png',
    bgColor: '#b8ecb8'
  },
  {
    id: '279697',
    value: '10612190',
    title: 'Ticket PMU',
    imgSrc: 'https://top.oki.lu/assets/uploads/235655c2101a6bfa485e781acf7d8f54.png',
    bgColor: '#b8ecb8'
  },
  {
    id: '279699',
    value: '71171561',
    title: 'Ticket RUBBEL',
    imgSrc: 'https://top.oki.lu/assets/uploads/d9205b62f2756bcd2b713134b3e22b18.jpeg',
    bgColor: '#b8ecb8'
  },
  {
    id: '069703',
    value: '62286374',
    title: 'CARTE PREPAYE',
    imgSrc: 'https://top.oki.lu/assets/uploads/thumbs/no_image.png',
    bgColor: 'orange'
  },
  {
    id: '1210602',
    value: '65783846',
    title: 'Presse Divers',
    imgSrc: 'https://top.oki.lu/assets/uploads/thumbs/no_image.png',
    bgColor: '#9c9ce3'
  },
  {
    id: '289694',
    value: '92345149',
    title: 'Cigarre',
    imgSrc: 'https://top.oki.lu/assets/uploads/thumbs/no_image.png',
    bgColor: '#b59b6d'
  },
  {
    id: '2810611',
    value: '33983521',
    title: 'Article fumeur',
    imgSrc: 'https://top.oki.lu/assets/uploads/thumbs/no_image.png',
    bgColor: 'default'
  },
  {
    id: '2810613',
    value: '24406509',
    title: 'Boisson Divers',
    imgSrc: 'https://top.oki.lu/assets/uploads/thumbs/no_image.png',
    bgColor: 'default'
  },
  {
    id: '2810614',
    value: '93454316',
    title: 'Confiserie Divers',
    imgSrc: 'https://top.oki.lu/assets/uploads/thumbs/no_image.png',
    bgColor: 'default'
  },
  {
    id: '2810612',
    value: '42932951',
    title: 'Papeterie',
    imgSrc: 'https://top.oki.lu/assets/uploads/thumbs/no_image.png',
    bgColor: 'default'
  },
  {
    id: '2810610',
    value: '63881331',
    title: 'Timbres',
    imgSrc: 'https://top.oki.lu/assets/uploads/thumbs/no_image.png',
    bgColor: 'default'
  },
  {
    id: '2810615',
    value: '12628886',
    title: 'Alcohols 17%',
    imgSrc: 'https://top.oki.lu/assets/uploads/thumbs/no_image.png',
    bgColor: 'default'
  },
  {
    id: '2810616',
    value: '22634205',
    title: 'Vin 14%',
    imgSrc: 'https://top.oki.lu/assets/uploads/thumbs/no_image.png',
    bgColor: 'default'
  }
];

const TabProduct = ({ salesHistory, setSalesHistory,  thedata, setThedata }) => {
  const [saleValue, setSaleValue] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showVente, setShowVente] = useState(false);

   const [showGains, setShowGains] = useState(false);  
   const [productCategory, setProductCategory] = useState(null);

   const handleProductSelect = async  (product) => {
    setSelectedProduct(product);
  
    isAppOnline().then( async (onlineStatus) => {
    
      if (onlineStatus) { // Online mode
        try {
          const response = await api.get('api/pos/getProductDataByCode', {params:{
            code: product.value,
            warehouse_id: 1,
            customer_id: 1
          }});
          console.log(response.data);
          const data = response.data;
          console.log(data);
          setProductCategory(data.category);
          if (data.category === "27") {
            setShowGains(true);
          } else if (["12", "6", "30", "28", "3", "1", "4"].includes(data.category)) {
            setShowVente(true);
          }
          if(thedata!==""){
            setSaleValue(thedata)
            setThedata('')
          }
         
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      } else { // Offline mode
        try {
          const productFroIndexedDB = await ProductDao.getProductByCode(product.value)
          if (productFroIndexedDB) {
            setProductCategory(productFroIndexedDB.category);
            if (productFroIndexedDB.category === "27") {
              setShowGains(true);
            } else if (["12", "6", "30", "28", "3", "1", "4"].includes(productFroIndexedDB.category)) {
              setShowVente(true);
            }
            if(thedata!==""){
              setSaleValue(thedata)
              setThedata('')
            }
   
          } else {
            console.error('Product not found in IndexedDB');
          }
        } catch (error) {
          console.error('Error fetching product from IndexedDB:', error);
        }
      }
    }).catch((error) => {
      console.error('Error determining app status:', error);
    });
  
  
    
  };

  const handleCloseGains = () => {
    setSelectedProduct(null);
    setSaleValue('');
    setShowGains(false);
  };


   //
   function verifyAndSplit(input) {
    const pattern = /^(\d+)%(\d+)$/;

    const match = String(input).match(pattern);
    

    if (match) {
      return [parseInt(match[1], 10), parseInt(match[2], 10)];
    } else {
        return null;
    }
}

  const handleAddToTable = (saleValue) => {
    if (selectedProduct) {
  
      const newSale = {
        product: selectedProduct.value + " - "+ selectedProduct.title ,
        price: parseFloat(saleValue),
        category:productCategory,
      };
  
      if(verifyAndSplit(saleValue)!=null){
        newSale.qty=verifyAndSplit(saleValue)[1]
        newSale.ssTotal=newSale.qty*verifyAndSplit(saleValue)[0]
      }else{
        newSale.qty=1
        newSale.ssTotal=1*parseFloat(saleValue)
      }
      if(newSale.category === "27"){
        newSale.price=(-1)* newSale.price
        newSale.ssTotal=(-1)* newSale.ssTotal
      }
     
      setSalesHistory([...salesHistory, newSale]); // Add new sale to sales history
    }
    handleCloseVente();
    handleCloseGains();
  
  };

  const handleCloseVente = () => {
    setShowVente(false);
  };

  return (
    <>
      <div style={{ paddingBottom: '100px' }}>
        {productData.map(product => (
          <button
            key={product.id}
            id={`product-${product.id}`}
            type="button"
            value={product.value}
            title={product.title}
            className="btn-prni btn-default product pos-tip"
            data-container="body"
            style={{ backgroundColor: product.bgColor, position: 'relative', overflow: 'visible' }}
            onClick={() => handleProductSelect(product)} 
          >
            <img src={product.imgSrc} alt={product.title} className="img-rounded" />
            <span>{product.title}</span>
            <div
              className="quantity-badge"
              style={{
                position: 'absolute',
                top: '0px',
                right: '0px',
                backgroundColor: '#ff0000',
                color: '#ffffff',
                borderRadius: '10%',
                padding: '5px',
                fontSize: '12px'
              }}
            >
              0
            </div>
            <div
              className="quantity-badge"
              style={{
                position: 'absolute',
                top: '30px',
                right: '0px',
                backgroundColor: 'green',
                color: '#ffffff',
                borderRadius: '10%',
                padding: '5px',
                fontSize: '12px'
              }}
            >
              0
            </div>
          </button>
        ))}
      </div>
      {showVente && (
        <VenteModal
          show={showVente}
          handleClose={handleCloseVente}
          initvente=""
          code={0}
          warehouse_id={1}
          customer_id={1}
          selectedProduct={selectedProduct}
          saleValue={saleValue}
          setSaleValue={setSaleValue}
          handleAddToTable={handleAddToTable}
        />
      )}
      {showGains && (
        <GainsModal
          show={showGains}
          handleClose={handleCloseGains}
          initvente=""
          code={0}
          warehouse_id={1}
          customer_id={1}
          selectedProduct={selectedProduct}
          saleValue={saleValue}
          setSaleValue={setSaleValue}
          handleAddToTable={handleAddToTable}
        />
      )}
    </>
  );
  
};

export default TabProduct;