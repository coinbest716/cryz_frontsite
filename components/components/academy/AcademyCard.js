import React from 'react'

// next components
import Image from 'next/image'

// custom components
import ArrowButton from 'components/components/academy/ArrowButton'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './AcademyCard.module.scss'

const AcademyCard = props => {
  const { data, handleClickPayment } = props

  return (
    <div>
      <div className={styles.singleCard}>
        <div className={'relative'}>
          {data.images.length > 0 && (
            <Image src={data?.images[0]?.path || ''} alt="" width={365} height={253} className={styles.cardImage} />
          )}
        </div>
        <div className={styles.cardTitle}>{data?.name}</div>
        <div className={globalStyles.tinyMCEClass}>
          <div
            className={styles.cardDescripton + ' tinymce-class'}
            dangerouslySetInnerHTML={{ __html: data?.description }}
          />
        </div>
        <div className={styles.cardName}>{data?.category}</div>
      </div>
      <div className={'mt-2'}>
        <ArrowButton label={data.price + ' €'} onClick={() => handleClickPayment(data)} />
      </div>
    </div>
  )
}

export default AcademyCard
