import React from 'react'
import Image from 'next/image'
import styles from './ClassDoubleCard.module.scss'

const ClassDoubleCard = props => {
  const { data } = props

  return (
    <a target="_blank" href={data?.url} rel="noopener noreferrer">
      <div className={'cursor-pointer my-2 ' + styles.singleCard}>
        <div className={styles.cardImageLayer}>
          <Image
            src={data?.image ? data?.image : 'https://via.placeholder.com/244x125?text=Placeholder'}
            alt=""
            layout="responsive"
            width={244}
            height={125}
            className={styles.cardImage}
          />
          <div className={styles.cardPayment}>
            <span className={styles.cardPaymentType}>{data?.price}€/mes</span>
          </div>
        </div>
        <div className={styles.cardName}>{data?.name}</div>
        <div className={styles.cardDescripton}>{data?.description.slice(0, 50) + '...'}</div>
        <div className={styles.cardDifficulty}>Dificultad {data?.difficulty}</div>
      </div>
    </a>
  )
}

export default ClassDoubleCard
