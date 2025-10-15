'use client'
import { Card, CardContent } from '@/components/ui/card'
import axios from 'axios'
import Image from 'next/image'
import Verified from '@/public/assets/images/verified.gif'
import UnVerified from '@/public/assets/images/verification-failed.gif'
import { useState } from 'react'
import { use, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { WEBSITE_HOME } from '@/routes/WebsiteRoutes'

const VerifyEmailPage = ({ params }) => {
  const [IsVerified, setIsVerified] = useState(false)
  const Params = use(params)
  const token = Params.Token
  const VerifyEmail = async () => {
    try {
      const { data: ResponseVerifyEmail } = await axios.post('/api/auth/verify-email', {token} )
      if (ResponseVerifyEmail.success) {
        setIsVerified(true)
      }
      console.log(ResponseVerifyEmail)
    } catch (error) {
      alert(error)
    }
  }
  useEffect(() => {
    
    VerifyEmail()
  }, [token])
  return (
    <Card className='w-[400px]'>
      <CardContent>
        {IsVerified?
        <div>
          <div className='flex justify-center items-center'>
            <Image
              className='h-[100px] w-auto'
              src={Verified.src}
              height={Verified.height}
              width={Verified.width}
              alt='Verified logo' />
          </div>
          <div className='text-center'>
            <h1 className='text-green-500 text-2xl font-bold'>Email verification success!</h1>
            <Button className='mt-3 ' asChild>
              <Link href={WEBSITE_HOME}>Continue Shopping</Link>
            </Button>
          </div>
        </div>
        :
         <div>
          <div className='flex justify-center items-center'>
            <Image
              className='h-[100px] w-auto'
              src={UnVerified.src}
              height={UnVerified.height}
              width={UnVerified.width}
              alt='UnVerified logo' />
          </div>
          <div className='text-center'>
            <h1 className='text-red-500 text-2xl font-bold'>Email verification failed!</h1>
            <Button className='mt-3 ' asChild>
              <Link href={WEBSITE_HOME}>Continue Shopping</Link>
            </Button>
          </div>
        </div>
      }
        

      </CardContent>
    </Card>
  )
}

export default VerifyEmailPage