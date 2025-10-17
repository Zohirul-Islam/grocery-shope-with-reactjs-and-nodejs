import React from 'react'
import { assets, categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Categories = () => {
    const { navigate } = useAppContext();
  return (
      <div className='mt-16'>
          <p className='text-2xl md:text-3xl font-medium'>Categories</p>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6'>
              {/* category box */}
              {categories.map((cat, index) => (
                  <div onClick={() => {
                      navigate(`/products/${cat.path.toLowerCase()}`);
                      scrollTo(0,0)
                }} style={{backgroundColor:cat.bgColor}} key={index} className='py-5 px-3 flex flex-col justify-center items-center gap-2 rounded-lg group cursor-pointer'>
                  <img className='group-hover:scale-105 transition max-w-28' src={cat.image} alt="" />
                      <p className='text-sm font-medium'>{ cat.text}</p>
                </div> 
              ))}

          </div>
    </div>
  )
}

export default Categories