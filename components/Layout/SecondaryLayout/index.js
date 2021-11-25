import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// next components
import router from 'next/router'

// third party components
import ReactLoading from 'react-loading'

// custom components
import Navbar from 'components/Navbar'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'

import { Auth } from 'aws-amplify'

const SecondaryLayout = ({ children }) => {
  const isLoading = useSelector(state => state.isLoading)

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => {
        setIsAuthenticated(true)
      })
      .catch(() => {
        router.push('/')
        setIsAuthenticated(false)
      })
  }, [])

  return isAuthenticated === true ? (
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
        <div className={globalStyles.loadingArea}>
          <div className={globalStyles.loading}>
            <ReactLoading type={'spinningBubbles'} color="#006600" />
          </div>
        </div>
      )}
    </>
  ) : (
    <></>
  )
}

export default SecondaryLayout
