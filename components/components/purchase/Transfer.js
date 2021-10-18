import React from 'react'
import Image from 'next/image'
import backGrayIcon from 'public/images/arrow-left-gray.svg'
import styles from './Transfer.module.scss'
import Radio from './Radio'

const Transfer = props => {
  const { handleChangePaymentType, value } = props

  return (
    <div className={'px-10 py-8 ' + styles.creditSection}>
      <div>
        <Radio
          handleChangeType={handleChangePaymentType}
          type={'transfer'}
          value={value}
          label={'Transferencia bancaria'}
        />
      </div>
      <div className={'pl-8 pt-2 ' + styles.creditDescription}>
        Serás redirigido a tu entidad bancaria para efectuar la transferencia de manera segura
      </div>
    </div>
  )
}

export default Transfer
