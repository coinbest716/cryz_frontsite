import React, { useState, useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'

// custom components
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'

import ProfileCommonText from 'components/components/dashboard/profile/ProfileCommonText'

import { useMutation, useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'
import toast from 'react-hot-toast'

import { useRouter } from 'next/router'
import Image from 'next/image'
import ArrowLeftWhite from 'public/images/arrow-left-white.svg'

// styles
import styles from './bill-item.module.scss'

const BillItem = props => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)
  const { viewport } = props
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

  const [getPatientBillByDashboardById, { data: billData, loading: billLoading, error: billError }] = useLazyQuery(
    graphql.queries.getPatientBillByDashboardById
  )
  const [updatePatientBillByDashboard] = useMutation(graphql.mutations.updatePatientBillByDashboard)

  useEffect(() => {
    if (router.query.bill_id > -1) {
      getPatientBillByDashboardById({ variables: { bill_id: Number(router.query.bill_id) } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // variables
  const [billItem, setBillItem] = useState({
    id: -1,
    name: '',
    surname: '',
    cif: '',
    addressAlias: '',
    email: '',
    population: '',
    address: '',
    province: '',
    country: '',
    postalCode: '',
    collapse: false,
  })

  useEffect(() => {
    if (viewport === 'desktop') {
      router.push('/dashboard/billing')
    } else if (viewport === 'mobile') {
      if (router.query.bill_id > -1) {
        router.push({ pathname: '/dashboard/billing/bill-item', query: { bill_id: router.query.bill_id } }, undefined, {
          shallow: true,
        })
      } else {
        router.push('/dashboard/billing/bill-item')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewport])

  useEffect(() => {
    if (!billError && billData && billData.getPatientBillByDashboardById) {
      const item = billData.getPatientBillByDashboardById
      const _name = item.name.split(' ')
      const _billItem = {
        id: item.id,
        name: _name[0],
        surname: _name[1],
        cif: item.cif,
        addressAlias: item.title,
        email: item.email,
        population: item.population,
        address: item.address,
        province: item.province,
        country: item.country,
        postalCode: item.postal_code,
        collapse: true,
      }
      setBillItem(_billItem)
    }
  }, [billLoading, billData, billError])

  const handleChangeAddress = (event, key) => {
    setBillItem({ ...billItem, [key]: event.target.value })
  }

  const handleSaveBillAddress = () => {
    if (billItem.name === '' || billItem.cif === '' || billItem.address === '' || billItem.province === '') {
      toast.error('Please input data!')
      return
    }
    dispatch({ type: 'set', isLoading: true })
    const variables = {
      patient_id: Number(localStorage.getItem('patient_id')),
      type: 'bill',
      title: billItem.addressAlias,
      name: billItem.name + ' ' + billItem.surname,
      cif: billItem.cif,
      email: billItem.email,
      mobile: '',
      address: billItem.address,
      province: billItem.province,
      population: billItem.population,
      postal_code: billItem.postalCode,
      country: billItem.country,
    }
    if (billItem.id > -1) {
      updatePatientBillByDashboard({
        variables: { ...variables, id: billItem.id },
      })
        .then(response => {
          if (response.data.updatePatientBillByDashboard) {
            const data = response.data.updatePatientBillByDashboard
            toast.success('Successfully updated bill information!')
            getPatientBillByDashboardById({ variables: { bill_id: data.id } })
            router.push('/dashboard/billing')
          }
          dispatch({ type: 'set', isLoading: false })
        })
        .catch(error => {
          dispatch({ type: 'set', isLoading: false })
          toast.error(error.message)
        })
    } else {
      router.push({ pathname: '/dashboard/billing', query: variables })
    }
  }

  const handleClickBack = () => {
    router.push('/dashboard/billing')
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
      <div className={'flex justify-center ' + styles.container}>
        <div className="p-5 mb-28 mt-32">
          <div className={'pt-2 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangeAddress(e, 'name')}
              label={'Nombre'}
              placeholder={''}
              type={'text'}
              value={billItem.name}
            />
          </div>
          <div className={'pt-2 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangeAddress(e, 'surname')}
              label={'Apellidos'}
              placeholder={''}
              type={'text'}
              value={billItem.surname}
            />
          </div>
          <div className={'pt-2 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangeAddress(e, 'cif')}
              label={'DNI/NIF'}
              placeholder={''}
              type={'text'}
              value={billItem.cif}
            />
          </div>
          <div className={'pt-2 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangeAddress(e, 'addressAlias')}
              label={'Alias de la dirección ( ej. casa, trabajo…)'}
              placeholder={''}
              type={'addressAlias'}
              value={billItem.addressAlias}
            />
          </div>
          <div className={'pt-2 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangeAddress(e, 'email')}
              label={'Email'}
              placeholder={''}
              type={'email'}
              value={billItem.email}
            />
          </div>
          <div className={'pt-2 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangeAddress(e, 'address')}
              label={'Dirección facturación'}
              placeholder={''}
              type={'address'}
              value={billItem.address}
            />
          </div>
          <div className={'pt-2 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangeAddress(e, 'population')}
              label={'Población'}
              placeholder={''}
              type={'population'}
              value={billItem.population}
            />
          </div>
          <div className={'pt-2 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangeAddress(e, 'postalCode')}
              label={'CP'}
              placeholder={''}
              type={'postalCode'}
              value={billItem.postalCode}
            />
          </div>
          <div className={'pt-2 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangeAddress(e, 'province')}
              label={'Provincia'}
              placeholder={''}
              type={'province'}
              value={billItem.province}
            />
          </div>
          <div className={'pt-2 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangeAddress(e, 'country')}
              label={'País'}
              placeholder={''}
              type={'country'}
              value={billItem.country}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default BillItem

BillItem.getLayout = function getLayout(page) {
  return <MobileDashboardLayout title="Direcciones de facturación">{page}</MobileDashboardLayout>
}
