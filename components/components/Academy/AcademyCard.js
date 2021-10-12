import React from 'react'
import Image from 'next/image'
import styles from './AcademyCard.module.scss'
import ArrowButton from 'components/components/Academy/ArrowButton'

const AcademyCard = props => {
  const { data, handleClickPayment } = props

  return (
    <div>
      <div className={styles.singleCard}>
        <div className={styles.cardImageLayer}>
          <Image src={data?.image} alt="" width={365} height={253} className={styles.cardImage} />
          <div className={styles.cardPayment}>
            <span className={styles.cardPaymentType}>{data?.filter}</span>
          </div>
        </div>
        <div className={styles.cardTitle}>{data?.title}</div>
        <div className={styles.cardDescripton}>{data?.description}</div>
        <div className={styles.cardName}>{data?.name}</div>
      </div>
      <div className="mt-2">
        <ArrowButton label={data.paymentType} onClick={handleClickPayment} />
      </div>
    </div>
  )
}

export default AcademyCard
