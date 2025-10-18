import React from 'react'
import Mainbanner from '../components/Mainbanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import Newsletter from '../components/Newsletter'


const Home = () => {
  return (
      <div className='mt-10'>
      <Mainbanner />
      <Categories />
      <BestSeller />
      <BottomBanner />
      <Newsletter />
      
    </div>
  )
}

export default Home