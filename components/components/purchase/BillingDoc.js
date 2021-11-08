import React from 'react'
import styles from './BillingDoc.module.scss'
import Radio from './Radio'

const BillingDoc = props => {
  const { handleChangeFrame, frameType, value } = props

  return (
    <div className={styles.billingSection}>
      <div className="flex justify-start p-2">
        <div className="w-full">
          <Radio handleChangeType={handleChangeFrame} type={frameType} value={value} label={''} />
          <div className={'px-6 ' + styles.content}>
            <div>Jamy Larson</div>
            <div>JUnit 2 Green Mount Retail Park</div>
            <div>Halfax</div>
            <div>HX15QN</div>
            <div>Tel: 0344 332 5931</div>
          </div>
        </div>
      </div>
      <div className={'w-full flex justify-end items-center ' + styles.edit}>
        <div className={'p-3 text-center '}>Editar</div>
      </div>
    </div>
  )
}

export default BillingDoc
