import React from 'react'
import styles from './BillingDoc.module.scss'
import Radio from './Radio'

const BillingDoc = props => {
  const { handleChangeFrame, data, frameType, value } = props

  return (
    <div className={styles.billingSection}>
      <div className={'flex justify-start p-2'}>
        <div className={'w-full'}>
          <Radio handleChangeType={handleChangeFrame} type={frameType} value={value} label={''} />
          <div className={'px-6 ' + styles.content}>
            <div>{data.name + ' ' + data.surname}</div>
            <div>{data.address}</div>
            <div>{data.province}</div>
            <div>{data.postalCode}</div>
          </div>
        </div>
      </div>
      {/* <div className={'w-full flex justify-end items-center ' + styles.edit}>
        <div className={'p-3 text-center '}>Editar</div>
      </div> */}
    </div>
  )
}

export default BillingDoc
