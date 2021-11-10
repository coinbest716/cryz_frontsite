import React, { useState, useEffect } from 'react'

// redux
import { useSelector } from 'react-redux'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import ProfileInfo from 'components/components/dashboard/Profile'
import DashboardButton from 'components/components/dashboard/DashboardButton'
import CommonText from 'components/components/purchase/CommonText'
import CommonButton from 'components/components/purchase/CommonButton'

// styles
import styles from './billing.module.scss'

// json data
import BillingData from 'assets/data/BillingData'

const Billing = () => {
  // variables
  const today = useSelector(state => state.today)
  const addressInfo = {
    name: '',
    title: '',
    cif: '',
    email: '',
    nif: '',
    address: '',
    phone: '',
    country: '',
    postalCode: '',
    collapse: true,
  }
  const [addressDataList, setAddressDataList] = useState([])

  // handlers
  useEffect(() => {
    setAddressDataList(BillingData)
  }, [])

  const handleAddAddress = () => {
    console.log('handleAddAddress')
    let _addressDataList = [...addressDataList]
    _addressDataList.push(addressInfo)
    setAddressDataList(_addressDataList)
  }
  const handleChangeAddress = (event, key, index) => {
    let newArr = [...addressDataList]
    newArr[index][key] = event.target.value
    setAddressDataList(newArr)
  }
  const handleSaveAddress = index => {
    console.log('handleSaveAddress', index)
  }
  const handleDeleteAddress = index => {
    let newArr = [...addressDataList]
    newArr.splice(index, 1)
    setAddressDataList(newArr)
  }
  const handlePlusCollapse = index => {
    let newArr = [...addressDataList]
    newArr[index].collapse = !newArr[index].collapse
    setAddressDataList(newArr)
  }

  return (
    <div className={'pt-10 pb-24 px-24 ' + styles.container}>
      <div className={'flex justify-between'}>
        <div>
          <div className={styles.highBoldLabel}>Direcciones de facturación</div>
          <div className={'pt-2 ' + styles.mediumLabel}>{today}</div>
        </div>
        <div className={'flex justify-end items-center'}>
          <div className={'pr-4'}>
            <NotificationButton />
          </div>
          <ProfileInfo />
        </div>
      </div>
      <div className={'pt-12'}>
        <DashboardButton handleClick={handleAddAddress} label={'Añadir dirección'} type={'addBilling'} />
      </div>
      {addressDataList.map((item, index) => (
        <div className={'px-16 py-10 mt-6 ' + styles.AddressSection} key={index}>
          <div className={'flex justify-between items-center'}>
            <div className={'flex justify-start items-center'}>
              <div className={'py-2 w-2/5'}>
                <CommonText
                  handleChange={e => handleChangeAddress(e, 'name', index)}
                  label={'Nombre completo'}
                  placeholder={''}
                  type={'text'}
                  value={item.name}
                />
              </div>
              <div className={'py-2 px-6 w-2/5'}>
                <CommonText
                  handleChange={e => handleChangeAddress(e, 'title', index)}
                  label={'Titulo'}
                  placeholder={''}
                  type={'text'}
                  value={item.title}
                />
              </div>
              <div className={'py-2 w-1/5'}>
                <CommonText
                  handleChange={e => handleChangeAddress(e, 'cif', index)}
                  label={'CIF'}
                  placeholder={''}
                  type={'text'}
                  value={item.cif}
                />
              </div>
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
              <div className={'px-40 py-10'}>
                <div className={'grid grid-cols-12 gap-12'}>
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
                        handleChange={e => handleChangeAddress(e, 'address', index)}
                        label={'Dirección facturación'}
                        placeholder={''}
                        type={'address'}
                        value={item.address}
                      />
                    </div>
                    <div className={'py-2'}>
                      <CommonText
                        handleChange={e => handleChangeAddress(e, 'country', index)}
                        label={'Pais'}
                        placeholder={''}
                        type={'country'}
                        value={item.country}
                      />
                    </div>
                  </div>
                  <div className={'col-span-12 md:col-span-6 sm:col-span-12'}>
                    <div className={'py-2'}>
                      <CommonText
                        handleChange={e => handleChangeAddress(e, 'nif', index)}
                        label={'NIF/NIE'}
                        placeholder={''}
                        type={'nif'}
                        value={item.nif}
                      />
                    </div>
                    <div className={'py-2'}>
                      <CommonText
                        handleChange={e => handleChangeAddress(e, 'phone', index)}
                        label={'Teléfono'}
                        placeholder={''}
                        type={'phone'}
                        value={item.phone}
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
                <CommonButton label={'Borrar Cuenta'} handleClick={() => handleDeleteAddress(index)} type={'icon'} />
                <CommonButton label={'Aprobar cambios'} handleClick={() => handleSaveAddress(index)} type={'fill'} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
export default Billing

Billing.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
