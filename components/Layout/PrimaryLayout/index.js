import React from 'react'

// custom components
import Header from 'components/Header'
import Footer from 'components/Footer'

const PrimaryLayout = ({ children }) => {
  return (
    <>
      <Header
        changeColorOnScroll={{
          height: 1,
        }}
      />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default PrimaryLayout
