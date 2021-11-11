import React from 'react'
import { useSelector } from 'react-redux'

// third party components
import ReactLoading from 'react-loading'

// custom components
import Navbar from 'components/Navbar'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'

const SecondaryLayout = ({ children }) => {
  const isLoading = useSelector(state => state.isLoading)
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
      {isLoading && (
        <div className={globalStyles.loading}>
          <ReactLoading type={'spinningBubbles'} color="#006600" />
        </div>
      )}
    </>
  )
}

export default SecondaryLayout
