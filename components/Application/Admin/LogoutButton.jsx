'use client'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { logout } from '@/store/reducer/authReducer';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const LogoutButton = () => {
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch();
    const router = useRouter();
    const HandleLogout = async()=>{
         try {
            setloading(true)
            const { data: ResponseLogout } = await axios.post('/api/auth/logout')
            if (!ResponseLogout.success) {
                toast.error(ResponseLogout.message)
            }
            if (ResponseLogout.success) {
                dispatch(logout())
                toast.success(ResponseLogout.message)
                router.push('/auth/login')
            }
        } catch (error) {
            toast.error(error)
        }finally{
            setloading(false)
        }
    }
    return (
        <DropdownMenuItem onClick={HandleLogout} className='cursor-pointer'>
           
                <RiLogoutCircleLine color='red'/>
                {
                    loading ? 'Logging out...' :
                     'Logout'
                }
                
        </DropdownMenuItem>
    )
}

export default LogoutButton