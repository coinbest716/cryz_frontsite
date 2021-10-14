import React from 'react'

// next components
import Image from 'next/image'

// images
import ArrowRightPink from 'assets/images/arrow-right-pink.svg'
import ArrowRightWhite from 'assets/images/arrow-right-white.svg'

// styles
import styles from 'components/components/BuyCard.module.scss'

const BuyCard = props => {
  const { data, index } = props
  return (
    <div className={'block'}>
      <div
        className={
          'flex ' +
          (index % 3 === 0 ? 'justify-start' : index % 3 === 1 ? 'justify-center' : 'justify-end') +
          ' ' +
          styles.title
        }
      >
        {data.title}
      </div>
      <div className={styles.card}>
        <div className={'flex'}>
          <div className={styles.cardTitle}>{data.cardTitle}</div>
          <Image src={ArrowRightPink} alt="" width={26} height={20} />
        </div>
        <div className={styles.cardDescription}>{data.cardDescription}</div>
      </div>
      <button className={styles.button}>
        <div className={'flex justify-start'}>
          <div className={styles.buttonText}>
            {data.buttonText} <b>{data.price}</b>
          </div>
        </div>
        <Image src={ArrowRightWhite} alt="" width={26} height={20} />
      </button>
    </div>
  )
}

export default BuyCard
