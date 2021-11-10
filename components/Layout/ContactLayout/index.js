import React from 'react'

// custom components
import Header from 'components/Header'
import ContactFooter from 'components/ContactFooter'

const ContactLayout = ({ children }) => {
  return (
    <>
      <Header
        changeColorOnScroll={{
          height: 100,
        }}
      />
      <main>{children}</main>
      <ContactFooter />
    </>
  )
}

export default ContactLayout
