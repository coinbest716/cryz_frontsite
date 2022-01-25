import React, { createRef, useEffect, useState, useReducer } from 'react'
import { useRouter } from 'next/router'

// redux
import { useDispatch } from 'react-redux'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import CircularMark from 'components/components/CircularMark'
// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './main.module.scss'

// graphql
import { useMutation, useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'
import toast from 'react-hot-toast'

const Main = props => {
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

  return (
    <div className={'flex flex-wrap justify-center'}>
      <div className={styles.container}>
        <div className={globalStyles.container + ' my-20'}>
          <div className="flex justify-between mt-24">
            <div>
              <div className={styles.topTitle}>Trabaja con nosotros</div>
              <div className={styles.topDash + ' mt-5'} />
            </div>
            <CircularMark />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main

Main.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
