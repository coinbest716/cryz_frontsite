import React from 'react'
import Image from 'next/image'
import styles from './ClassCard.module.scss'

const ClassCard = props => {
  const { data } = props

  return (
    <a target="_blank" href={data?.url} rel="noopener noreferrer" className="w-full">
      <div className={'cursor-pointer ' + styles.singleCard}>
        <div className={styles.cardImageLayer}>
          <Image
            src={data?.image ? data?.image : 'https://via.placeholder.com/365x253?text=Placeholder'}
            alt=""
            layout="responsive"
            width={365}
            height={253}
            className={styles.cardImage}
          />
          <div className={styles.cardPayment}>
            <span className={styles.cardPaymentType}>{data?.price}€/mes</span>
          </div>
        </div>
        <div style={{ wordBreak: 'keep-all' }}>
          <div className={styles.cardName}>{data?.name}</div>
          <div className={styles.cardDescripton}>{data?.description.slice(0, 50) + '...'}</div>
          <div className={styles.cardDifficulty}>Dificultad {data?.difficulty}</div>
        </div>
      </div>
    </a>
  )
}

export default ClassCard
