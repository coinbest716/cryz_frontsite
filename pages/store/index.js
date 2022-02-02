import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// redux
import { useDispatch } from 'react-redux'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import CircularMark from 'components/components/CircularMark'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './store.module.scss'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Store = props => {
  const router = useRouter()
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (isMounted === true) {
      dispatch({ type: 'set', isLoading: false })
    }
  }, [isMounted, dispatch])
  // loading part end #######################

  // variables
  const { viewport } = props

  // handlers
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickOffer = id => {
    router.push({
      pathname: '/work-with-us/detail',
      query: {
        id: id,
      },
    })
  }

  return (
    <>
      {viewport === 'mobile' ? (
        <div className={styles.m_container}>
          <div className="w-full p-4 my-5">Mobile Store Page</div>
        </div>
      ) : (
        <div className={'flex flex-wrap justify-center'}>
          <div className={styles.container}>
            <div className={globalStyles.container + ' my-20'}>
              <div>Desktop Store Page</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Store

Store.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
