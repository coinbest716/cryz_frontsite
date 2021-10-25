import React, { useState } from 'react'
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import styles from './billing.module.scss'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import ProfileInfo from 'components/components/dashboard/Profile'
import DashboardButton from 'components/components/dashboard/DashboardButton'

const Billing = () => {
  const handleAddAddress = () => {
    console.log('handleAddAddress')
  }
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
      <div className={'px-16 py-10 mt-6 ' + styles.AddressSection}>asd</div>
    </div>
  )
}
export default Billing

Billing.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
