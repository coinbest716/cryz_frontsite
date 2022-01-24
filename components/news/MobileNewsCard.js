import React, { useState } from 'react'

// next components
import Image from 'next/image'

import moment from 'moment'
// styles
import styles from './MobileNewsCard.module.scss'

const MobileNewsCard = props => {
  const { item, handleClickDate } = props

  let body = ''
  body =
    item.description.replace(/(<([^>]+)>)/gi, '').slice(0, 90) +
    (item.description.replace(/(<([^>]+)>)/gi, '').length > 90 ? '...' : '')

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageBorder}>
        <Image
          src={(item.images && item.images[0]?.path) || 'https://via.placeholder.com/365x253?text=Placeholder'}
          width={166}
          height={170}
          alt=""
          layout="responsive"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className={styles.textContainer + ' mt-2 py-3 px-5'}>
        <div className={styles.cardDescription}>{body}</div>
        <div className="flex justify-start">
          <div className={styles.cardDate + ' mt-3 mb-2 cursor-pointer w-fit'} onClick={() => handleClickDate(item.id)}>
            {moment(item.publish_date).format('DD/MM/YYYY')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNewsCard
