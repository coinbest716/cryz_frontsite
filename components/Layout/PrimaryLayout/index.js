import React from 'react'
import { useSelector } from 'react-redux'

// third party components
import ReactLoading from 'react-loading'

// custom components
import Header from 'components/Header'
import Footer from 'components/Footer'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'

const PrimaryLayout = ({ children }) => {
  const isLoading = useSelector(state => state.isLoading)
  return (
    <>
      <Header
        changeColorOnScroll={{
          height: 1,
        }}
      />
      <main>{children}</main>
      <Footer />
      {isLoading && (
        <div className={globalStyles.loading}>
          <ReactLoading type={'spinningBubbles'} color="#006600" />
        </div>
      )}
    </>
  )
}

export default PrimaryLayout
