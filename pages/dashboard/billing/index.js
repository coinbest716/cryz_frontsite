import React, { useState } from 'react'
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import styles from './billing.module.scss'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import ProfileInfo from 'components/components/dashboard/Profile'
import DashboardButton from 'components/components/dashboard/DashboardButton'
import CommonText from 'components/components/purchase/CommonText'
import CommonButton from 'components/components/purchase/CommonButton'
import { add } from 'lodash'

const Billing = () => {
  const [addressInfo, setAddressInfo] = useState({
    name: '',
    title: '',
    cif: '',
    email: '',
    nif: '',
    address: '',
    phone: '',
    country: '',
    postalCode: '',
  })
  const handleAddAddress = () => {
    console.log('handleAddAddress')
  }
  const handleChangeAddress = (event, key) => {
    setAddressInfo({ ...addressInfo, [key]: event.target.value })
  }
  const handleSaveAddress = () => {}
  const handleDeleteAddress = () => {}
  const handlePlusCollapse = () => {
    console.log('handlePlusCollapse')
  }
  const handleMinusCollapse = () => {
    console.log('handleMinusCollapse')
  }

  // <DashboardButton handleClick={handlePlusCollapse} label={''} type={'plusCollapse'} />
  // <DashboardButton handleClick={handleMinusCollapse} label={''} type={'minusCollapse'} />

  return (
    <div className={'pt-10 pb-24 px-24 ' + styles.container}>
      <div className="flex justify-between">
        <div>
          <div className={styles.highBoldLabel}>Direcciones de facturación</div>
          <div className={'pt-2 ' + styles.mediumLabel}>Domingo, 12 de Diciembre 2021</div>
        </div>
        <div className="flex justify-end items-center">
          <div className="pr-4">
            <NotificationButton />
          </div>
          <ProfileInfo />
        </div>
      </div>
      <div className="pt-12">
        <DashboardButton handleClick={handleAddAddress} label={'Añadir dirección'} type={'addBilling'} />
      </div>
      <div className={'px-16 py-10 mt-6 ' + styles.AddressSection}>
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center">
            <div className="py-2 w-2/5">
              <CommonText
                handleChange={e => handleChangeAddress(e, 'name')}
                label={'Nombre completo'}
                placeholder={''}
                type={'text'}
              />
            </div>
            <div className="py-2 px-6 w-2/5">
              <CommonText
                handleChange={e => handleChangeAddress(e, 'title')}
                label={'Titulo'}
                placeholder={''}
                type={'text'}
              />
            </div>
            <div className="py-2 w-1/5">
              <CommonText
                handleChange={e => handleChangeAddress(e, 'cif')}
                label={'CIF'}
                placeholder={''}
                type={'text'}
              />
            </div>
          </div>
          <div>
            <DashboardButton handleClick={handlePlusCollapse} label={''} type={'plusCollapse'} />
          </div>
        </div>
        <div className="pt-10">
          <div className={styles.divider}></div>
          <div className="px-40 py-10">
            <div className="grid grid-cols-12 gap-12">
              <div className="col-span-12 md:col-span-6 sm:col-span-12">
                <div className="py-2">
                  <CommonText
                    handleChange={e => handleChangeAddress(e, 'email')}
                    label={'Email'}
                    placeholder={''}
                    type={'email'}
                  />
                </div>
                <div className="py-2">
                  <CommonText
                    handleChange={e => handleChangeAddress(e, 'address')}
                    label={'Dirección facturación'}
                    placeholder={''}
                    type={'address'}
                  />
                </div>
                <div className="py-2">
                  <CommonText
                    handleChange={e => handleChangeAddress(e, 'country')}
                    label={'Pais'}
                    placeholder={''}
                    type={'country'}
                  />
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 sm:col-span-12">
                <div className="py-2">
                  <CommonText
                    handleChange={e => handleChangeAddress(e, 'nif')}
                    label={'NIF/NIE'}
                    placeholder={''}
                    type={'nif'}
                  />
                </div>
                <div className="py-2">
                  <CommonText
                    handleChange={e => handleChangeAddress(e, 'phone')}
                    label={'Teléfono'}
                    placeholder={''}
                    type={'phone'}
                  />
                </div>
                <div className="py-2">
                  <CommonText
                    handleChange={e => handleChangeAddress(e, 'postalCode')}
                    label={'CP'}
                    placeholder={''}
                    type={'postalCode'}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-5">
            <CommonButton label={'Borrar Cuenta'} handleClick={handleDeleteAddress} type={'icon'} />
            <CommonButton label={'Aprobar cambios'} handleClick={handleSaveAddress} type={'fill'} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Billing

Billing.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
