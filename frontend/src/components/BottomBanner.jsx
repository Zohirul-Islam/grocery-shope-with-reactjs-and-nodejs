import React from 'react'
import { assets } from '../assets/assets'

const BottomBanner = () => {
  return (
      <div className='mt-24 relative'>
          <img className='w-full hidden md:block' src={assets.bottom_banner_image} alt="bottom-banner" />
          <img className='w-full  md:hidden' src={assets.bottom_banner_image_sm} alt="bottom-banner" />
    </div>
  )
}

export default BottomBanner