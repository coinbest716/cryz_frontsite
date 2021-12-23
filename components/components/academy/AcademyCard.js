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
  const { data, handleClickPayment, viewport } = props

  let title = ''
  let body = ''

  if (viewport === 'mobile') {
    title = data?.name
    body =
      data.description.replace(/(<([^>]+)>)/gi, '').slice(0, 100) +
      (data.description.replace(/(<([^>]+)>)/gi, '').length > 100 ? '...' : '')
  } else {
    title = data?.name
    body = data.description
  }

  return (
    <div>
      <div className={styles.singleCard}>
        <div className={'relative'}>
          {data.images.length > 0 && (
            <Image src={data?.images[0]?.path || ''} alt="" width={365} height={253} className={styles.cardImage} />
          )}
        </div>
        <div className={styles.cardTitle}>{title}</div>
        <div className={globalStyles.tinyMCEClass}>
          <div className={styles.cardName} dangerouslySetInnerHTML={{ __html: body }} />
        </div>
        <div className={styles.cardName}>{data?.category}</div>
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
