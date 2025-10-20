import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import Productcard from '../components/Productcard';

const Allproducts = () => {
    const { products,searchQuary } = useAppContext();
    const [filteredProduct, setFilterProduct] = useState([]);

    useEffect(() => {
        if (searchQuary.length > 0) {
            setFilterProduct(products.filter((product)=>product.name.toLowerCase().includes(searchQuary.toLowerCase())))
        } else {
            setFilterProduct(products);
        }
    },[products,searchQuary])
  return (
      <div className='mt-16 flex flex-col'>
          {/* product header */}
          <div className='flex flex-col items-end w-max'>
              <p className='text-2xl font-medium uppercase'>All products</p>
              <div className='w-16 h-0.5 bg-primary rounded-full'></div>
          </div>
          {/* all products */}
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
              {
                  filteredProduct.filter((product) => product.inStock).map((item, index) => (
                      <Productcard key={index} product={item}/>
                  ))
              }
          </div>
    </div>
  )
}

export default Allproducts