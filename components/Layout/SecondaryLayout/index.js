import React from 'react'
import Navbar from 'components/Navbar'

export default function Layout({ children }) {
  return (
    <>
      <div className={'flex'}>
        <div>
          <Navbar />
        </div>
        <div className={'w-full'}>
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}
