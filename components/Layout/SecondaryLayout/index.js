import React from 'react'
import Navbar from 'components/Navbar'
import styles from './secondary.module.scss'

export default function Layout({ children }) {
  return (
    <>
      <div className="flex">
        <div>
          <Navbar />
        </div>
        <div style={{ width: 'calc(100% - 224px)' }}>
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}
