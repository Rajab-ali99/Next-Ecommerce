'use client'
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import logoBlack from '@/public/assets/images/logo-black.png'
import logoWhite from '@/public/assets/images/logo-white.png'
import { LuChevronRight } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import Image from "next/image"
import { AdminSidebarMenu } from "@/lib/AdminSidebarMenu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";
const AdminSidebar = () => {
  const {toggleSidebar} = useSidebar();
  return (
      <Sidebar>
      <SidebarHeader className='h-14 border-b p-0'>
        <div className="flex items-center h-full justify-between px-4">
            <Image src={logoBlack.src} height={50} width={logoBlack.width} alt="logo"
            className="block dark:hidden h-[45px] w-auto "/>
            <Image src={logoWhite.src} height={50} width={logoWhite.width} alt="logo"
            className="hidden dark:block h-[45px] w-auto"/>
            <Button onClick={toggleSidebar} type='button' size='icon' className='cursor-pointer md:hidden'>
             <IoMdClose size={20} />
            </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className='p-3'>
        <SidebarMenu>
            {AdminSidebarMenu.map((menu,index)=>(
                <Collapsible key={index} className='group/collapsible'>
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                        <SidebarMenuButton className='font-bold  px-2 py-5' asChild>
                         <Link href={menu?.url}>
                          <menu.icon/>
                          {menu.title}
                          {menu.subMenu && menu.subMenu.length > 0 && 
                          <LuChevronRight className="ml-auto transition-transform  duration-200 group-data-[state=open]/collapsible:rotate-90"/>
                          }
                         </Link>
                        </SidebarMenuButton>
                        </CollapsibleTrigger>
                        {menu.subMenu && menu.subMenu.length > 0 &&
                        <CollapsibleContent>
                           <SidebarMenuSub>
                            {menu.subMenu.map((submenu,submenuIndex)=>(
                                <SidebarMenuSubItem key={submenuIndex}>
                                <SidebarMenuSubButton className="px-2 py-3" asChild>
                                   <Link href={submenu?.url}>
                                   {submenu.title}
                                   </Link>

                                </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            ))}
                           </SidebarMenuSub>
                        </CollapsibleContent>
                        }
                    </SidebarMenuItem>
                </Collapsible>
            ))}
        </SidebarMenu>
      </SidebarContent>
     
      
    </Sidebar>
  )
}

export default AdminSidebar