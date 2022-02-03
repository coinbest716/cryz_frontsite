import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
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

import ProductOne from 'public/images/product-2.svg'
import ProductTwo from 'public/images/product-2.svg'
import ProductThree from 'public/images/product-3.svg'

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

  const [category, setCategory] = useState(0)
  const handleChangeCategory = event => {
    setCategory(Number(event.target.value))
  }

  const accessoriesList = [
    { id: 0, label: 'Material Deportivo' },
    { id: 1, label: 'Accessorios' },
    { id: 2, label: 'Salud y Belleza' },
    { id: 3, label: 'Productos Bio' },
  ]

  return (
    <>
      {viewport === 'mobile' ? (
        <div className={styles.m_container}>
          <div className="w-full p-4 my-5">Mobile Store Page</div>
        </div>
      ) : (
        <div className="pt-20">
          <div className={styles.header + ' mt-11 py-7'}>
            <div className={styles.subContainer}>
              <div className={globalStyles.container}>
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex justify-start items-center">
                    <Image src={'/images/product-2.svg'} alt="" width={23} height={20} />
                    <div className={styles.headerTitle + ' ml-3'}>Calidad garantizada</div>
                  </div>
                  <div className="flex justify-start items-center">
                    <Image src={'/images/product-2.svg'} alt="" width={23} height={20} />
                    <div className={styles.headerTitle + ' ml-3'}>Envio 48 / 72 horas</div>
                  </div>
                  <div className="flex justify-start items-center">
                    <Image src={'/images/product-3.svg'} alt="" width={23} height={20} />
                    <div className={styles.headerTitle + ' ml-3'}>Devolución 30 dias</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.container}>
            <div className={globalStyles.container + ' mt-8 mb-20'}>
              <div className="relative">
                <Image src={'/images/team-03.png'} alt="" width={1108} height={310} />
                <div className={'absolute top-11 left-8 ' + styles.mainImageTitle}>Descubre nuestras categorias</div>
                <select
                  name="select"
                  onChange={handleChangeCategory}
                  value={category}
                  className={'cursor-pointer flex justify-start items-center ' + styles.select}
                >
                  {accessoriesList.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
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
