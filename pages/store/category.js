import React, { createRef, useEffect, useState } from 'react'

// redux
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import BackButton from 'components/components/BackButton'

import { useMutation, useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'
import toast from 'react-hot-toast'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './category.module.scss'

const Category = props => {
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
    if (router.query.id) {
      // getJobByIdForDashboard({ variables: { id: Number(router.query.id) } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {viewport === 'mobile' ? (
        <div className={styles.m_container}>Mobile Category Page</div>
      ) : (
        <div className={'flex flex-wrap justify-center'}>
          <div className={styles.container}>
            <div className={globalStyles.container + ' my-20'}>
              <div className={'mt-9'}>
                <BackButton viewport={viewport} />
              </div>
              Desktop Category Page
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Category

Category.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
