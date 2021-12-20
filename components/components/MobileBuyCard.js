import React from 'react'

// next components
import Image from 'next/image'

// images
import ArrowRightPink from 'assets/images/arrow-right-pink.svg'
import ArrowRightWhite from 'assets/images/arrow-right-white.svg'

// styles
import styles from './MobileBuyCard.module.scss'

const MobileBuyCard = props => {
  const { data, index, handleClickBuy } = props
  return (
    <div className={'block'}>
      <div className={'flex ' + (index % 2 === 0 ? 'justify-start' : 'justify-end') + ' ' + styles.title}>
        {data.service_type === 'personal' ? 'Personal' : ''}
        {data.service_type === 'online' ? 'Planes Online' : ''}
        {data.service_type === 'streaming' ? '1 to 1 en Streaming' : ''}
      </div>
      <div className={styles.card}>
        <div className={'flex'}>
          <div className={styles.cardTitle}>{data.web_name.slice(0, 50)}</div>
          <div className={styles.arrowIcon}>
            <Image src={ArrowRightPink} alt="" width={20} height={20} />
          </div>
        </div>
        <div className={styles.cardDescription}>{data.description.slice(0, 50) + '...'}</div>
      </div>
      <button className={styles.button} onClick={() => handleClickBuy(data.id, data.web_name, data.price)}>
        <div className={'flex justify-start'}>
          <div className={styles.buttonText}>
            {'Comprar por'} <b>{data.price} €</b>
          </div>
        </div>
        <div className={styles.arrowIcon}>
          <Image src={ArrowRightWhite} alt="" width={20} height={12} />
        </div>
      </button>
    </div>
  )
}

export default MobileBuyCard
