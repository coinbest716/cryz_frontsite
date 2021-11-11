import React from 'react'
import { useSelector } from 'react-redux'

// third party components
import ReactLoading from 'react-loading'

// custom components
import Header from 'components/Header'
import ContactFooter from 'components/ContactFooter'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'

const ContactLayout = ({ children }) => {
  const isLoading = useSelector(state => state.isLoading)
  return (
    <>
      <Header
        changeColorOnScroll={{
          height: 100,
        }}
      />
      <main>{children}</main>
      <ContactFooter />
      {isLoading && (
        <div className={globalStyles.loading}>
          <ReactLoading type={'spinningBubbles'} color="#006600" />
        </div>
      )}
    </>
  )
}

export default ContactLayout
