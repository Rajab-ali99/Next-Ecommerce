"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GiShoppingBag } from "react-icons/gi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import avatr from '@/public/assets/images/admin.jpeg'
import { useDispatch, useSelector } from "react-redux";
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
const UserDropdown = () => {
    const dispatch = useDispatch();
  const auth = useSelector((state) => state.authStore.auth);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className='cursor-pointer '>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mt-3 w-36 mr-2'>
                <DropdownMenuLabel className='flex justify-center'>{auth?.name || 'Developer Rajab'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className='cursor-pointer'>
                    <Link href=''>
                       <IoShirtOutline/>
                       New Product
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className='cursor-pointer'>
                    <Link href=''>
                       <MdOutlineShoppingBag/>
                       Orders
                    </Link>
                </DropdownMenuItem>
                <LogoutButton/>
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDropdown