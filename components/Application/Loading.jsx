import Image from 'next/image'
import React from 'react'
import image from '@/public/assets/images/loading.svg'
const Loading = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <Image src={image.src} height={80} width={80} alt='loading' />
    </div>
  )
}

export default Loading