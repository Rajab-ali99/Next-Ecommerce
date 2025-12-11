import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
const BreadCrumb = ({BreadcrumbData}) => {
  return (
   <Breadcrumb className="mb-5">
  <BreadcrumbList>
     {BreadcrumbData.length !==0 && BreadcrumbData.map((item,index)=>{
        return (
            index!== BreadcrumbData.length -1 ? 
             <div key={index} className='flex items-center'>
              <BreadcrumbItem >
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              </BreadcrumbItem>
                <BreadcrumbSeparator className="ms-2 mt-1"/>
             </div>
             :
              <div key={index} className='flex items-center'>
              <BreadcrumbItem>
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              </BreadcrumbItem>
                
             </div>

        )
})}
  </BreadcrumbList>
</Breadcrumb>
  )
}

export default BreadCrumb