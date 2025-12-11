'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { useTheme } from "next-themes";


const ThemeSwitcher = () => {
     const { setTheme } = useTheme()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='focus:outline-none cursor-pointer focus:ring-0 '>
                

                <MdOutlineWbSunny size={25} className="hidden dark:block" />
                <IoMoonOutline size={25} className="dark:hidden " />
                
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mt-4'>
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>


            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ThemeSwitcher