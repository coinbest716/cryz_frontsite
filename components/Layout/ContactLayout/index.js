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
        viewport={children.props.viewport}
      />
      <main>{children}</main>
      <ContactFooter viewport={children.props.viewport} />
      {isLoading && (
        <div className={globalStyles.loadingArea}>
          <div className={globalStyles.loading}>
            <ReactLoading type={'spinningBubbles'} color="#006600" />
          </div>
        </div>
      )}
    </>
  )
}

export default ContactLayout
