import React, { useState } from 'react'

// next components
import Image from 'next/image'

import moment from 'moment'
// styles
import styles from './NewsCard.module.scss'

const NewsCard = props => {
  const { item, handleClickDate } = props

  let body = ''
  body =
    item.description.replace(/(<([^>]+)>)/gi, '').slice(0, 100) +
    (item.description.replace(/(<([^>]+)>)/gi, '').length > 100 ? '...' : '')

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageBorder}>
        <Image
          src={
            (item.images.length > 0 && item.images[0]?.path) || 'https://via.placeholder.com/365x253?text=Placeholder'
          }
          width={365}
          height={253}
          alt=""
          layout="responsive"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className={styles.textContainer + ' mt-2 py-3 px-5'} onClick={() => handleClickDate(item.id)}>
        <div className={styles.cardTitle + ' cursor-pointer'}>{item.title}</div>
        <div className="flex justify-start">
          <div className={styles.cardDate + ' mt-3 mb-2 w-fit'}>{moment(item.publish_date).format('DD/MM/YYYY')}</div>
        </div>
        <div className={styles.cardDescription}>{body}</div>
      </div>
    </div>
  )
}

export default NewsCard
