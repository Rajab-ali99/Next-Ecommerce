import AdminSidebar from '@/components/Application/Admin/AdminSidebar'
import Topbar from '@/components/Application/Admin/Topbar'
import ThemeProvider from '@/components/Application/ThemeProvider'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const layout = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >

      <SidebarProvider>
        <AdminSidebar />
        <main className='md:w-[calc(100vw-16rem)] w-full ' >
          <div className='min-h-[calc(100dvh-40px)]  pb-10'>
          <Topbar />
          <div className='pt-3 pb-5 px-3 md:px-5'>

            {children}
          </div>
          </div>
          <div className='h-[40px] flex bg-gray-50 dark:bg-background  items-center justify-center '>

            <footer className=' '>
              © 2025 Developer Rajab™ .  All Rights Reserved.</footer>
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default layout