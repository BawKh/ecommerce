import React from 'react'
import { Outlet } from 'react-router-dom'

export default function UpdateData() {
  return (
    <div className="mx-auto my-5 w-50 h-25" style={{borderRadius: '10px',backgroundColor: '#343a40'}}>
    <Outlet />
    </div>
  )
}
