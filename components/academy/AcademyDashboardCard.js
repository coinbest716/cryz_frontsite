import React from 'react'

// next components
import Image from 'next/image'

// custom components
import ArrowWatchNowButton from 'components/academy/ArrowWatchNowButton'

// styles
import styles from './AcademyDashboardCard.module.scss'

const AcademyDashboardCard = props => {
  const { data, handleWatchNow, viewport } = props

  let category = ''
  let name = ''

  if (viewport === 'mobile') {
    category = data?.category
    name =
      data.name.replace(/(<([^>]+)>)/gi, '').slice(0, 100) +
      (data.name.replace(/(<([^>]+)>)/gi, '').length > 100 ? '...' : '')
  } else {
    category = data?.category
    name = data.name
  }

  return (
    <>
      {viewport === 'mobile' ? (
        <div className={styles.singleCard}>
          <div className={'relative'}>
            {data.images.length > 0 && (
              <Image src={data?.images[0]?.path || ''} alt="" width={200} height={220} className={styles.cardImage} />
            )}
          </div>
          <div className="p-2">
            <div className={styles.m_cardName}>{category}</div>
            <div className={styles.m_cardTitle}>{name}</div>
            <div className={'mt-4'}>
              <ArrowWatchNowButton onClick={() => handleWatchNow(data)} viewport={viewport} />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.singleCard}>
          <div className={'relative'}>
            {data.images.length > 0 && (
              <Image src={data?.images[0]?.path || ''} alt="" width={365} height={253} className={styles.cardImage} />
            )}
          </div>
          <div className={styles.cardTitle}>{data?.name}</div>
          <div className={styles.cardName + ' mb-16'}>{data?.category}</div>
          <div className={'absolute bottom-0 left-0 right-0'}>
            <ArrowWatchNowButton onClick={() => handleWatchNow(data)} viewport={viewport} />
          </div>
        </div>
      )}
    </>
  )
}

export default AcademyDashboardCard
