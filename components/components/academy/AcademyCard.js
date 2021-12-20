import React from 'react'

// next components
import Image from 'next/image'

// custom components
import ArrowButton from 'components/components/academy/ArrowButton'
import ArrowOutlineButton from 'components/components/academy/ArrowOutlineButton'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './AcademyCard.module.scss'

const AcademyCard = props => {
  const { data, handleClickPayment, mobile } = props

  return (
    <div>
      <div className={styles.singleCard}>
        <div className={'relative'}>
          {data.images.length > 0 && (
            <Image src={data?.images[0]?.path || ''} alt="" width={365} height={253} className={styles.cardImage} />
          )}
        </div>
        <div className={styles.cardTitle}>{data?.name.slice(0, 30)}</div>
        <div className={globalStyles.tinyMCEClass}>
          <div className={styles.cardName}>{data.description.replace(/(<([^>]+)>)/gi, '').slice(0, 50)}</div>
        </div>
        <div className={styles.cardName}>{data?.category}</div>
        {mobile && (
          <div className={'mt-2 mb-4 mx-4'}>
            <ArrowOutlineButton
              plazas={data.plazas}
              label={data.price + ' €'}
              onClick={() => handleClickPayment(data)}
            />
          </div>
        )}
      </div>
      {!mobile && (
        <div className={'mt-2'}>
          <ArrowButton plazas={data.plazas} label={data.price + ' €'} onClick={() => handleClickPayment(data)} />
        </div>
      )}
    </div>
  )
}

export default AcademyCard
