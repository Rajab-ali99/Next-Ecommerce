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
import { WEBSITE_FORGOTPASSWORD, WEBSITE_LOGIN, WEBSITE_Register } from "@/routes/WebsiteRoutes"
const RegisterPage = () => {
   const [loading, setloading] = useState(false)
   const [showPassword, setshowPassword] = useState(false)
   const [ShowConfirmPassword, setShowConfirmPassword] = useState(false)
    const formSchema = zSchema.pick({
    email: true,name:true,password:true
    
}).extend({ConfirmPassword: z
    .string()
    .min(1, "Please confirm your password."
    )}).refine((data)=>data.password===data.ConfirmPassword,{
        message:"Passwords do not match",
        path:["ConfirmPassword"]
    })

const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        email: "",
        password: "",
        ConfirmPassword:""
    },
})
const handleLoginSubmit = async (values) => {
 console.log(values)
}
    return (
        <Card className='w-[400px] '>
            <CardContent>
                <div className='flex justify-center'>
                    <Image className='max-w-[150px]' src={Logo.src} width={Logo.width} height={Logo.height} alt='Logo' />
                </div>
                <div className="text-center">
                    <h1 className='text-3xl font-bold'>Create Account</h1>
                    <p className="text-slate-400">Create your account by filling out the form bellow.</p>
                </div>
                <div className="mt-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleLoginSubmit)} >
                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input type='text' placeholder="John" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
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
                                          <button className="absolute cursor-pointer top-[55%] right-3" type="button" onClick={()=> setshowPassword(!showPassword)}>{showPassword? <FaRegEyeSlash/> : <FaRegEye/>}</button>
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
                                            <FormControl>
                                                <Input type={ShowConfirmPassword? 'text': 'password'} placeholder="********" {...field} />
                                            </FormControl>
                                          <button className="absolute cursor-pointer top-[55%] right-3" type="button" onClick={()=> setShowConfirmPassword(!ShowConfirmPassword)}>{ShowConfirmPassword? <FaRegEyeSlash/> : <FaRegEye/>}</button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div><ButtonLoadder className='w-full cursor-pointer mt-1' type={'submit'} text={'Create Account'} loading={loading}  /></div>
                        </form>
                    </Form>
                    <div className="flex items-center justify-center gap-1 mt-2">
                        <p>Already have account?</p>
                        <Link href={WEBSITE_LOGIN} className="text-primary underline">Login!</Link>
                    </div>
                   
                </div>
            </CardContent>
        </Card>
    )
}

export default RegisterPage