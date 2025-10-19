'use client'
import React, { useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zSchema } from '@/lib/zodSchema'
import { useForm } from 'react-hook-form'
import ButtonLoadder from './ButtonLoadder'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from 'react-toastify'
import axios from 'axios'




const OtpVerification = ({ email, onSubmit, loading }) => {
    const [otpResending, setotpResending] = useState(false)
    const otpschema = zSchema.pick({
        otp: true, email: true
    })
    const form = useForm({
        resolver: zodResolver(otpschema),
        defaultValues: {
            otp: "",
            email: email
        },
    })

    const handleOtpSubmit = async (values) => {
        onSubmit(values)
    }
    const otpResend = async (email) => {
        try {
            setotpResending(true)
            const { data: ResponseRegistration } = await axios.post('/api/auth/resend-otp', {email})
            if (!ResponseRegistration.success) {
                toast.error(ResponseRegistration.message)
                console.log(ResponseRegistration.message)
            }
            if (ResponseRegistration.success) {
                toast.success(ResponseRegistration.message)
                setotpEmail('')
            }
        } catch (error) {
            toast.error(error)
        } finally {
            setotpResending(false)
        }
    }
    return (
        <div>
            <div className="text-center">
                <h1 className='text-2xl font-bold'>Please complete verification</h1>
                <p className="text-slate-400">We have send an One-time password (OTP) to your registered email address.The OTP is valid for 10 minutes only.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleOtpSubmit)}>
                    <div className="mb-3">
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem className=''>
                                    <FormLabel className='font-bold  flex justify-center'>One-time Password (OTP)</FormLabel>
                                    <FormControl>
                                        <div className=' flex justify-center'>
                                            <InputOTP value={field.value}
                                                onChange={field.onChange} maxLength={6}>

                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                </InputOTPGroup>
                                                <InputOTPSeparator />
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div><ButtonLoadder className='w-full cursor-pointer mt-1' type={'submit'} text={'Verify'} loading={loading} /></div>
                </form>

                <div className='flex justify-center'>
                    {!otpResending ?

                        <button onClick={()=>otpResend(email)} type='button' className='text-primary cursor-pointer underline mt-2 '>Resend OTP?</button>
                        :
                        <div className='mt-2'>Resending...</div>
                    }
                </div>
            </Form>
        </div>
    )
}

export default OtpVerification