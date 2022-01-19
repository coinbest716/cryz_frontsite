import React, { useState, useEffect } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import NotificationButton from 'components/dashboard/NotificationButton'
// import Profile from 'components/dashboard/Profile'
import DashboardButton from 'components/dashboard/DashboardButton'
import CommonText from 'components/components/purchase/CommonText'
import CommonButton from 'components/components/purchase/CommonButton'
import MobileBillCard from 'components/dashboard/billing/MobileBillCard'

import { useMutation, useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'
import toast from 'react-hot-toast'

import { useRouter } from 'next/router'
import Image from 'next/image'
import ArrowLeftWhite from 'public/images/arrow-left-white.svg'
import plusWhite from 'public/images/plus-white.svg'
// styles
import styles from './billing.module.scss'

const Billing = props => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const { viewport } = props

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
  const [getPatientBillByDashboard, { data: billData, loading: billLoading, error: billError }] = useLazyQuery(
    graphql.queries.getPatientBillByDashboard
  )
  const [createPatientBillByDashboard] = useMutation(graphql.mutations.createPatientBillByDashboard)
  const [updatePatientBillByDashboard] = useMutation(graphql.mutations.updatePatientBillByDashboard)
  const [deletePatientBillByDashboard] = useMutation(graphql.mutations.deletePatientBillByDashboard)

  const today = useSelector(state => state.today)
  const billItem = {
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
  }
  const [billDataList, setBillDataList] = useState([])

  // handlers
  useEffect(() => {
    if (!localStorage.getItem('patient_id')) {
      toast.error('Please complete profile!')
      router.push('/dashboard/profile')
    }
    getPatientBillByDashboard({ variables: { patient_id: Number(localStorage.getItem('patient_id')) } })
    if (router.query) {
      const variables = { ...router.query, patient_id: Number(localStorage.getItem('patient_id')) }
      createPatientBillByDashboard({
        variables: variables,
      })
        .then(response => {
          if (response.data.createPatientBillByDashboard) {
            toast.success('Successfully save bill information!')
            getPatientBillByDashboard({ variables: { patient_id: Number(localStorage.getItem('patient_id')) } })
            router.push('/dashboard/billing', undefined, { shallow: true })
          }
          dispatch({ type: 'set', isLoading: false })
        })
        .catch(error => {
          dispatch({ type: 'set', isLoading: false })
          toast.error(error.message)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!billError && billData && billData.getPatientBillByDashboard) {
      let _billDataList = []
      const billInfo = billData.getPatientBillByDashboard
      billInfo.map(item => {
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
        _billDataList.push(_billItem)
      })
      setBillDataList(_billDataList)
    }
  }, [billLoading, billData, billError])

  const handleAddAddress = () => {
    let _billDataList = [...billDataList]
    _billDataList.push(billItem)
    setBillDataList(_billDataList)
  }
  const handleChangeAddress = (event, key, index) => {
    let newArr = [...billDataList]
    newArr[index][key] = event.target.value
    setBillDataList(newArr)
  }

  const handleSaveAddress = index => {
    const data = billDataList[index]
    if (data.name === '' || data.cif === '') {
      toast.error('Please input data!')
      return
    }
    dispatch({ type: 'set', isLoading: true })
    const variables = {
      patient_id: Number(localStorage.getItem('patient_id')),
      type: 'bill',
      title: data.addressAlias,
      name: data.name + ' ' + data.surname,
      cif: data.cif,
      email: data.email,
      mobile: '',
      address: data.address,
      province: data.province,
      population: data.population,
      postal_code: data.postalCode,
      country: data.country,
    }
    if (data.id > -1) {
      updatePatientBillByDashboard({
        variables: { ...variables, id: data.id },
      })
        .then(response => {
          if (response.data.updatePatientBillByDashboard) {
            toast.success('Successfully save bill information!')
            getPatientBillByDashboard({ variables: { patient_id: Number(localStorage.getItem('patient_id')) } })
          }
          dispatch({ type: 'set', isLoading: false })
        })
        .catch(error => {
          dispatch({ type: 'set', isLoading: false })
          toast.error(error.message)
        })
    } else {
      createPatientBillByDashboard({
        variables: variables,
      })
        .then(response => {
          if (response.data.createPatientBillByDashboard) {
            toast.success('Successfully save bill information!')
            getPatientBillByDashboard({ variables: { patient_id: Number(localStorage.getItem('patient_id')) } })
          }
          dispatch({ type: 'set', isLoading: false })
        })
        .catch(error => {
          dispatch({ type: 'set', isLoading: false })
          toast.error(error.message)
        })
    }
  }
  const handleDeleteAddress = index => {
    const data = billDataList[index]
    const variables = {
      id: data.id,
    }
    if (data.id > -1) {
      deletePatientBillByDashboard({
        variables: variables,
      })
        .then(response => {
          if (response.data.deletePatientBillByDashboard) {
            toast.success('Successfully deleted bill information!')
            getPatientBillByDashboard({ variables: { patient_id: Number(localStorage.getItem('patient_id')) } })
          }
          dispatch({ type: 'set', isLoading: false })
        })
        .catch(error => {
          dispatch({ type: 'set', isLoading: false })
          toast.error(error.message)
        })
    } else {
      let newArr = [...billDataList]
      newArr.splice(index, 1)
      setBillDataList(newArr)
    }
  }
  const handlePlusCollapse = index => {
    let newArr = [...billDataList]
    newArr[index].collapse = !newArr[index].collapse
    setBillDataList(newArr)
  }

  /* mobile function */

  const handleClickBack = () => {
    router.push('/dashboard/profile#main', undefined, { shallow: true })
  }

  const handleMobileAddAddress = () => {
    router.push('/dashboard/billing/bill-item')
  }

  const handleMobileEditAddress = bill_id => {
    router.push({
      pathname: '/dashboard/billing/bill-item',
      query: { bill_id: bill_id },
    })
  }
  const handleMobileDeleteAddress = bill_id => {
    const variables = {
      id: bill_id,
    }
    dispatch({ type: 'set', isLoading: true })
    deletePatientBillByDashboard({
      variables: variables,
    })
      .then(response => {
        if (response.data.deletePatientBillByDashboard) {
          toast.success('Successfully deleted bill information!')
          getPatientBillByDashboard({ variables: { patient_id: Number(localStorage.getItem('patient_id')) } })
        }
        dispatch({ type: 'set', isLoading: false })
      })
      .catch(error => {
        dispatch({ type: 'set', isLoading: false })
        toast.error(error.message)
      })
  }

  return (
    <>
      {viewport === 'mobile' ? (
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
            <div className={'flex justify-end items-center '} onClick={handleMobileAddAddress}>
              <div className={styles.saveButton + ' flex items-center'}>
                <div className={'cursor-pointer flex justify-center items-center mr-3 ' + styles.plusSection}>
                  <Image src={plusWhite} alt={''} width={10} height={10} />
                </div>
                <div className={styles.saveLabel}>Añadir Dirección</div>
              </div>
            </div>
            <div className={styles.title}>Direcciones de facturación</div>
          </div>
          <div className={'mt-32 ' + styles.mobileContainer}>
            {billDataList.map((item, index) => (
              <div className="pb-4" key={index}>
                <MobileBillCard
                  item={item}
                  index={index}
                  handleMobileDeleteAddress={handleMobileDeleteAddress}
                  handleMobileEditAddress={handleMobileEditAddress}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={'pt-10 pb-24 px-24 ' + styles.container}>
          <div className={'flex justify-between'}>
            <div>
              <div className={styles.highBoldLabel}>Direcciones de facturación</div>
              <div className={'pt-2 ' + styles.mediumLabel}>{today}</div>
            </div>
            <div className={'flex justify-end items-center'}>
              <NotificationButton />
              {/* <Profile /> */}
            </div>
          </div>
          <div className={'pt-12'}>
            <DashboardButton handleClick={handleAddAddress} label={'Añadir dirección'} type={'addBilling'} />
          </div>
          {billDataList.map((item, index) => (
            <div className={'px-16 py-10 mt-6 ' + styles.AddressSection} key={index}>
              <div className={'flex justify-between items-center'}>
                <div className={'py-2'}>
                  <CommonText
                    handleChange={e => handleChangeAddress(e, 'name', index)}
                    label={'Nombre completo'}
                    placeholder={''}
                    type={'text'}
                    value={item.name}
                  />
                </div>
                <div className={'py-2'}>
                  <CommonText
                    handleChange={e => handleChangeAddress(e, 'surname', index)}
                    label={'Apellidos'}
                    placeholder={''}
                    type={'text'}
                    value={item.surname}
                  />
                </div>
                <div className={'py-2'}>
                  <CommonText
                    handleChange={e => handleChangeAddress(e, 'cif', index)}
                    label={'DNI/NIF'}
                    placeholder={''}
                    type={'text'}
                    value={item.cif}
                  />
                </div>
                <div>
                  {item.collapse ? (
                    <DashboardButton handleClick={() => handlePlusCollapse(index)} label={''} type={'plusCollapse'} />
                  ) : (
                    <DashboardButton handleClick={() => handlePlusCollapse(index)} label={''} type={'minusCollapse'} />
                  )}
                </div>
              </div>
              {!item.collapse && (
                <div className={'pt-10'}>
                  <div className={styles.divider}></div>
                  <div className={'py-10'}>
                    <div className={'grid grid-cols-12 gap-12'}>
                      <div className={'col-span-12 md:col-span-6 sm:col-span-12'}>
                        <div className={'py-2'}>
                          <CommonText
                            handleChange={e => handleChangeAddress(e, 'addressAlias', index)}
                            label={'Alias de la dirección ( ej. casa, trabajo…)'}
                            placeholder={''}
                            type={'addressAlias'}
                            value={item.addressAlias}
                          />
                        </div>
                        <div className={'py-2'}>
                          <CommonText
                            handleChange={e => handleChangeAddress(e, 'address', index)}
                            label={'Dirección facturación'}
                            placeholder={''}
                            type={'address'}
                            value={item.address}
                          />
                        </div>
                        <div className={'py-2'}>
                          <CommonText
                            handleChange={e => handleChangeAddress(e, 'province', index)}
                            label={'Provincia'}
                            placeholder={''}
                            type={'province'}
                            value={item.province}
                          />
                        </div>
                        <div className={'py-2'}>
                          <CommonText
                            handleChange={e => handleChangeAddress(e, 'country', index)}
                            label={'País'}
                            placeholder={''}
                            type={'country'}
                            value={item.country}
                          />
                        </div>
                      </div>
                      <div className={'col-span-12 md:col-span-6 sm:col-span-12'}>
                        <div className={'py-2'}>
                          <CommonText
                            handleChange={e => handleChangeAddress(e, 'email', index)}
                            label={'Email'}
                            placeholder={''}
                            type={'email'}
                            value={item.email}
                          />
                        </div>
                        <div className={'py-2'}>
                          <CommonText
                            handleChange={e => handleChangeAddress(e, 'population', index)}
                            label={'Población'}
                            placeholder={''}
                            type={'population'}
                            value={item.population}
                          />
                        </div>
                        <div className={'py-2'}>
                          <CommonText
                            handleChange={e => handleChangeAddress(e, 'postalCode', index)}
                            label={'CP'}
                            placeholder={''}
                            type={'postalCode'}
                            value={item.postalCode}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={'flex justify-end gap-5'}>
                    <CommonButton
                      label={'Borrar Cuenta'}
                      handleClick={() => handleDeleteAddress(index)}
                      type={'icon'}
                    />
                    <CommonButton
                      label={'Aprobar cambios'}
                      handleClick={() => handleSaveAddress(index)}
                      type={'fill'}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
export default Billing

Billing.getLayout = function getLayout(page) {
  return page.props.viewport === 'mobile' ? (
    <MobileDashboardLayout title="Direcciones de facturación">{page}</MobileDashboardLayout>
  ) : (
    <SecondaryLayout>{page}</SecondaryLayout>
  )
}
