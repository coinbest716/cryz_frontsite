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

  const categoryList = [
    { id: 0, label: 'Material Deportivo' },
    { id: 1, label: 'Accessorios' },
    { id: 2, label: 'Salud y Belleza' },
    { id: 3, label: 'Productos Bio' },
  ]
  // variables
  const { viewport } = props
  const [categoryId, setCategoryId] = useState(-1)

  // handlers
  useEffect(() => {
    if (router.query.id) {
      // getJobByIdForDashboard({ variables: { id: Number(router.query.id) } })
    }
    if (router.query.category) {
      setCategoryId(router.query.category)
      console.log(categoryList[router.query.category].label)
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
              <div className={'flex mt-9'}>
                <p className={styles.homePath + ' cursor-pointer'}>home</p>
                <p className={styles.homePath}>&nbsp;{'>'}&nbsp;</p>
                <p className={styles.categoryPath + ' cursor-pointer'}>{categoryList[categoryId]?.label}</p>
              </div>
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
