import React from 'react'
import Productcard from './Productcard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
    const { products } = useAppContext();
  return (
      <div className='mt-16'>
          <p className='text-2xl md:text-3xl font-medium'>BestSeller</p>
          <div>
              <Productcard product={products[0]}/>
          </div>
    </div>
  )
}

export default BestSeller