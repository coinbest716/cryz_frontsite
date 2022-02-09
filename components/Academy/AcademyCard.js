import React from 'react'

// next components
import Image from 'next/image'

// custom components
import ArrowButton from 'components/Academy/ArrowButton'
import ArrowOutlineButton from 'components/Academy/ArrowOutlineButton'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './AcademyCard.module.scss'

const AcademyCard = props => {
  const { data, handleClickPayment, viewport } = props

  return (
    <div>
      <div className={styles.singleCard}>
        <div className={'relative'}>
          <Image
            src={data.images.length > 0 ? data?.images[0]?.path : 'https://via.placeholder.com/576x288?text=No%20Image'}
            alt=""
            width={365}
            height={253}
            className={styles.cardImage}
          />
        </div>
        <div className={styles.cardTitle}>{data?.name}</div>
        <div className={styles.cardType}>{data?.type.toUpperCase()}</div>
        <div className={styles.cardCategory}>{data?.category.toUpperCase()}</div>
        {viewport === 'mobile' && (
          <div className={'mt-2 mb-4 mx-4'}>
            <ArrowOutlineButton
              plazas={data.plazas}
              label={data.price + ' €'}
              onClick={() => handleClickPayment(data)}
            />
          </div>
        )}
      </div>
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

export default AcademyCard
