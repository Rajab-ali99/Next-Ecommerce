
'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import Logo from "@/public/assets/images/logo-black.png"
import Image from 'next/image'
import { zSchema } from "@/lib/zodSchema"
import { useForm } from "react-hook-form"
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { Button } from "@/components/ui/button"
import {z} from 'zod'
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
import { WEBSITE_FORGOTPASSWORD, WEBSITE_Register } from "@/routes/WebsiteRoutes"
import { toast } from "react-toastify"
import axios from "axios"

const LoginPage = () => {
   const [loading, setloading] = useState(false)
   const [showPassword, setshowPassword] = useState(false)
    const formSchema = zSchema.pick({
    email: true,
    
}).extend({password: z
    .string()
    .min(5, "Password is required.")})

const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
        password: "",
    },
})
const handleLoginSubmit = async (values) => {
  try {
            setloading(true)
            const { data: ResponseRegistration } = await axios.post('/api/auth/login', values)
            if (!ResponseRegistration.success) {
                toast.error(ResponseRegistration.message) 
            }
             if (ResponseRegistration.success) { 
                    form.reset()
                  toast.success(ResponseRegistration.message)
                }
        } catch (error) {
            toast.error(error)
        }finally {
            setloading(false)
        }
}
    return (
        <Card className='w-[400px] '>
            <CardContent>
                <div className='flex justify-center'>
                    <Image className='max-w-[150px]' src={Logo.src} width={Logo.width} height={Logo.height} alt='Logo' />
                </div>
                <div className="text-center">
                    <h1 className='text-3xl font-bold'>Login Into Account</h1>
                    <p className="text-slate-400">Login into account by filling out the form bellow.</p>
                </div>
                <div className="mt-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleLoginSubmit)} >
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
                            <div className="mb-3 relative">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type={showPassword? 'text': 'password'} placeholder="********" {...field} />
                                            </FormControl>
                                          <button className="absolute top-[55%] right-3" type="button" onClick={()=> setshowPassword(!showPassword)}>{showPassword? <FaRegEyeSlash/> : <FaRegEye/>}</button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div><ButtonLoadder className='w-full cursor-pointer mt-1' type={'submit'} text={'Login'} loading={loading}  /></div>
                        </form>
                    </Form>
                    <div className="flex items-center justify-center gap-1 mt-2">
                        <p>Don't have account?</p>
                        <Link href={WEBSITE_Register} className="text-primary underline">create account!</Link>
                    </div>
                    <Link href={WEBSITE_FORGOTPASSWORD} className="text-primary underline flex justify-center">Forgot Password?</Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default LoginPage