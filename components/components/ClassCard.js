import React from 'react'
import Image from 'next/image'
import styles from './ClassCard.module.scss'

const ClassCard = props => {
  const { data } = props

  return (
    <div className={styles.singleCard}>
      <div className={styles.cardImageLayer}>
        <Image src={data?.image} alt="" layout="responsive" width={365} height={253} className={styles.cardImage} />
        <div className={styles.cardPayment}>
          <span className={styles.cardPaymentType}>{data?.price}€/mes</span>
        </div>
      </div>
      <div className={styles.cardTitle}>{data?.title}</div>
      <div className={styles.cardDescripton}>{data?.description}</div>
      <div className={styles.cardName}>{data?.name}</div>
    </div>
  )
}

export default ClassCard
