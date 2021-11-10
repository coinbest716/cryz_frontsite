import React from 'react'

// custom components
import Navbar from 'components/Navbar'

const SecondaryLayout = ({ children }) => {
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

export default SecondaryLayout
