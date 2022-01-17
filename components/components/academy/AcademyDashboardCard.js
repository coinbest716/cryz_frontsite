import React from 'react'

// next components
import Image from 'next/image'

// custom components
import ArrowButton from 'components/components/academy/ArrowButton'
import ArrowOutlineButton from 'components/components/academy/ArrowOutlineButton'

// styles
import styles from './AcademyDashboardCard.module.scss'

const AcademyDashboardCard = props => {
  const { data, handleClickPayment, viewport } = props

  return (
    <div className={styles.singleCard}>
      <div className={'relative'}>
        {data.images.length > 0 && (
          <Image src={data?.images[0]?.path || ''} alt="" width={365} height={253} className={styles.cardImage} />
        )}
      </div>
      <div className={styles.cardTitle}>{data?.name}</div>
      <div className={styles.cardName}>{data?.category}</div>
      {viewport === 'mobile' && (
        <div className={'mt-2 mb-4 mx-4'}>
          <ArrowOutlineButton plazas={data.plazas} label={data.price + ' €'} onClick={() => handleClickPayment(data)} />
        </div>
      )}
      {viewport !== 'mobile' && (
        <div className={'mt-2'}>
          <ArrowButton
            plazas={data.plazas}
            label={data.price + ' €'}
            onClick={() => handleClickPayment(data)}
            viewport={viewport}
          />
        </div>
      )}
    </div>
  )
}

export default AcademyDashboardCard
