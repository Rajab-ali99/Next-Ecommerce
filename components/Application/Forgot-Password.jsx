'use client'
import { zodResolver } from "@hookform/resolvers/zod"

import React, { use, useState } from 'react'
import Logo from "@/public/assets/images/logo-black.png"
import Image from 'next/image'
import { zSchema } from "@/lib/zodSchema"
import { useForm } from "react-hook-form"
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";

import { z } from 'zod'
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
import axios from "axios"
import { toast } from "react-toastify"

import { WEBSITE_LOGIN } from "@/routes/WebsiteRoutes"
import { useRouter } from "next/navigation"
const ResetPassword = ({email}) => {
    const router = useRouter();
    const [loading, setloading] = useState(false)
    const [showPassword, setshowPassword] = useState(false)
    const [ShowConfirmPassword, setShowConfirmPassword] = useState(false)
    const formSchema = zSchema.pick({
        email: true,  password: true

    }).extend({
        ConfirmPassword: z
            .string()
            .min(1, "Please confirm your password."
            )
    }).refine((data) => data.password === data.ConfirmPassword, {
        message: "Passwords do not match",
        path: ["ConfirmPassword"]
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
           
            email: email,
            password: "",
            ConfirmPassword: ""
        },
    })
    const handleResetPassword = async (values) => {
        try {
            setloading(true)
            const { data: ResponseRegistration } = await axios.put('/api/auth/forgot-password/reset-password', values)
            if (!ResponseRegistration.success) {
                toast.error(ResponseRegistration.message) 
            }
             if (ResponseRegistration.success) { 
                    form.reset()
                  toast.success(ResponseRegistration.message)
                  router.push(WEBSITE_LOGIN);
                }
        } catch (error) {
            toast.error(error)
        }finally {
            setloading(false)
        }


    }
    return (
        
            <div>
                <div className='flex justify-center'>
                    <Image className='max-w-[150px]' src={Logo.src} width={Logo.width} height={Logo.height} alt='Logo' />
                </div>
                <div className="text-center">
                    <h1 className='text-3xl font-bold'>Update Password</h1>
                    <p className="text-slate-400">Create new password by filling the form below.</p>
                </div>
                <div className="mt-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleResetPassword)} >
                            
                            <div className="mb-3 ">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <div className="relative">

                                            <FormControl>
                                                <Input className='' type={showPassword ? 'text' : 'password'} placeholder="********" {...field} />
                                            </FormControl>
                                            <button className="absolute cursor-pointer top-[30%] right-3" type="button" onClick={() => setshowPassword(!showPassword)}>{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}</button>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-3 relative">
                                <FormField
                                    control={form.control}
                                    name="ConfirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <div className="relative">

                                            <FormControl>
                                                <Input type={ShowConfirmPassword ? 'text' : 'password'} placeholder="********" {...field} />
                                            </FormControl>
                                            <button className="absolute cursor-pointer top-[30%] right-3" type="button" onClick={() => setShowConfirmPassword(!ShowConfirmPassword)}>{ShowConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}</button>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div><ButtonLoadder className='w-full cursor-pointer mt-1' type={'submit'} text={'Reset Password'} loading={loading} /></div>
                        </form>
                    </Form>

                </div>
            </div>
        
    )
}

export default ResetPassword