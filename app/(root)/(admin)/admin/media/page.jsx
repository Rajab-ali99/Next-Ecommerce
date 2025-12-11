import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import UploadMedia from '@/components/Application/Admin/UploadMedia'
import { ADMIN_DASHBOARD } from '@/routes/AdminPannelRoutes'
import React from 'react'
const breadcrumbData = [
    {href: ADMIN_DASHBOARD, label: 'Home'},
    {href: '', label: 'Media'},
]
const MediaPage = () => {
  return (
    <div>
        <BreadCrumb BreadcrumbData = {breadcrumbData}/>
        <UploadMedia/>
    </div>
  )
}

export default MediaPage