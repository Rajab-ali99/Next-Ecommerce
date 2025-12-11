'use client'
import React, { use } from 'react'
import ThemeSwitcher from './ThemeSwitcher'
import UserDropdown from './UserDropdown'
import { RiMenu4Fill } from "react-icons/ri";
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
const Topbar = () => {
    const {toggleSidebar} = useSidebar();
    return (
        <div className='h-14 border-b md:px-5 px-3 flex justify-between items-center'>
            <div>search component</div>
            <div className='flex items-center gap-5'>
                <ThemeSwitcher/>
                <UserDropdown/>
                <Button onClick={toggleSidebar} className='md:hidden' type='button' size='icon'>
                    <RiMenu4Fill  />
                </Button>
            </div>
        </div>
    )
}

export default Topbar