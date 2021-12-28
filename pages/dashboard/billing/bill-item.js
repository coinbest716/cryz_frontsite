import React, { useState, useEffect } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import NotificationButton from 'components/components/dashboard/NotificationButton'
// import Profile from 'components/components/dashboard/Profile'
import DashboardButton from 'components/components/dashboard/DashboardButton'
import CommonText from 'components/components/purchase/CommonText'
import CommonButton from 'components/components/purchase/CommonButton'
import MobileBillCard from 'components/components/dashboard/billing/MobileBillCard'

import { useMutation, useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'
import toast from 'react-hot-toast'

import { useRouter } from 'next/router'
import Image from 'next/image'
import ArrowLeftWhite from 'public/images/arrow-left-white.svg'
import plusWhite from 'public/images/plus-white.svg'
// styles
import styles from './bill-item.module.scss'

const BillItem = props => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

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

  useEffect(() => {
    if (router.query.bill_id > -1) {
      console.log(router.query.bill_id)
    }
  }, [])

  // variables

  const handleSaveBillAddress = () => {
    console.log('handleSaveBillAddress')
  }

  const handleClickBack = () => {
    router.push('/dashboard/billing/')
  }

  return (
    <div>
      <div className={styles.header + ' p-4'}>
        <div
          className="flex justify-start items-center w-fit cursor-pointer"
          style={{ width: 'fit-content' }}
          onClick={handleClickBack}
        >
          <Image src={ArrowLeftWhite} width={18} height={15} alt="" />
          <div className={styles.backString + ' ml-2'}>Perfil</div>
        </div>
        <div className="flex justify-end" onClick={handleSaveBillAddress}>
          <div className={styles.saveButton}>Aceptar</div>
        </div>
        <div className={styles.title}>Editar información</div>
      </div>
    </div>
  )
}
export default BillItem

BillItem.getLayout = function getLayout(page) {
  return <MobileDashboardLayout title="Direcciones de facturación">{page}</MobileDashboardLayout>
}
