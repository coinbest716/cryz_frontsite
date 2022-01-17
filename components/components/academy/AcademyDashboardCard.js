import React from 'react'

// next components
import Image from 'next/image'

// custom components
import ArrowWatchNowButton from 'components/components/academy/ArrowWatchNowButton'

// styles
import styles from './AcademyDashboardCard.module.scss'

const AcademyDashboardCard = props => {
  const { data, handleWatchNow, viewport } = props

  return (
    <div className={styles.singleCard}>
      <div className={'relative'}>
        {data.images.length > 0 && (
          <Image src={data?.images[0]?.path || ''} alt="" width={365} height={253} className={styles.cardImage} />
        )}
      </div>
      <div className={styles.cardTitle}>{data?.name}</div>
      <div className={styles.cardName + ' mb-16'}>{data?.category}</div>
      <div className={'absolute bottom-0 left-0 right-0'}>
        <ArrowWatchNowButton onClick={() => handleWatchNow(data)} />
      </div>
    </div>
  )
}

export default AcademyDashboardCard
