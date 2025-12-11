
'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import Logo from "@/public/assets/images/logo-black.png"
import Image from 'next/image'
import { zSchema } from "@/lib/zodSchema"
import { useForm } from "react-hook-form"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ButtonLoadder from "@/components/Application/ButtonLoadder"
import Link from "next/link"
import { WEBSITE_LOGIN, } from "@/routes/WebsiteRoutes"
import { toast } from "react-toastify"
import axios from "axios"
import OtpVerification from "@/components/Application/OtpVerification"

import { login } from "@/store/reducer/authReducer"
import ResetPassword from "@/components/Application/Forgot-Password"
const ForgotPassword = () => {
    const [otpEmail, setotpEmail] = useState('')
    const [OtpVerifyloading, setOtpVerifyloading] = useState(false)
    const [loading, setloading] = useState(false)
    const [isOtpVerified, setisOtpVerified] = useState(false)

    const formSchema = zSchema.pick({
        email: true,

    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })
    const handleForgotPassword = async (values) => {
        try {
            setloading(true)
            const { data: ForgotPasswordResponse } = await axios.post('/api/auth/forgot-password/send-otp', values)
            if (!ForgotPasswordResponse.success) {
                toast.error(ForgotPasswordResponse.message)
            }
            if (ForgotPasswordResponse.success) {
                form.reset()
                toast.success(ForgotPasswordResponse.message)
                setotpEmail(values.email)
            }
        } catch (error) {
            toast.error(error)
        } finally {
            setloading(false)
        }
    }
    // OTP verification 
    const handleOTPSubmit = async (values) => {
        try {
            setOtpVerifyloading(true)
            const { data: otpResponse } = await axios.post('/api/auth/forgot-password/verify-otp', values)
            if (!otpResponse.success) {
                toast.error(otpResponse.message)
            }
            if (otpResponse.success) {
                toast.success(otpResponse.message)
                setisOtpVerified(true)
            }
        } catch (error) {
            toast.error(error)
        } finally {
            setOtpVerifyloading(false)
        }
    }
    return (
        <Card className='w-[400px] '>
            <CardContent>
                {!otpEmail ?
                    <div>

                        <div className='flex justify-center'>
                            <Image className='max-w-[150px]' src={Logo.src} width={Logo.width} height={Logo.height} alt='Logo' />
                        </div>
                        <div className="text-center">
                            <h1 className='text-3xl font-bold'>Reset Password</h1>
                            <p className="text-slate-400">Enter your email to reset password.</p>
                        </div>
                        <div className="mt-5">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleForgotPassword)} >
                                    <div className="mb-3">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input type='email' placeholder="example@gmail.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div><ButtonLoadder className='w-full cursor-pointer mt-1' type={'submit'} text={'Send OTP'} loading={loading} /></div>
                                </form>
                            </Form>
                            <Link href={WEBSITE_LOGIN} className="text-primary mt-3 underline flex justify-center">Login Back?</Link>
                        </div>
                    </div>
                    :
                    <>
                        {!isOtpVerified ?
                            <div>


                                <div className='flex justify-center'>
                                    <Image className='max-w-[150px]' src={Logo.src} width={Logo.width} height={Logo.height} alt='Logo' />
                                </div>
                                <div className="mt-2">
                                    <OtpVerification email={otpEmail} onSubmit={(values) => handleOTPSubmit(values)} loading={OtpVerifyloading} />

                                </div>
                            </div>
                            :
                            <ResetPassword email={otpEmail} />
                        }

                    </>
                }

            </CardContent>
        </Card>
    )
}

export default ForgotPassword
