import React from 'react'
import Image from 'next/image'
import styles from './AcademyCard.module.scss'
import ArrowButton from 'components/components/academy/ArrowButton'

const AcademyCard = props => {
  const { data, handleClickPayment } = props
  return (
    <div>
      <div className={styles.singleCard}>
        <div className={styles.cardImageLayer}>
          {data.images.length > 0 && (
            <Image src={data?.images[0]?.path || ''} alt="" width={365} height={253} className={styles.cardImage} />
          )}
        </div>
        <div className={styles.cardTitle}>{data?.name}</div>
        <div className={styles.cardDescripton} dangerouslySetInnerHTML={{ __html: data?.description }} />
        <div className={styles.cardName}>{data?.category}</div>
      </div>
      <div className={'mt-2'}>
        <ArrowButton label={data.price + ' €'} onClick={() => handleClickPayment(data)} />
      </div>
    </div>
  )
}

export default AcademyCard
