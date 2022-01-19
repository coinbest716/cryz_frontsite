import React, { useState } from 'react'

// next components
import Image from 'next/image'

import moment from 'moment'
// styles
import styles from './NewsCard.module.scss'

const NewsCard = props => {
  const { item } = props

  let body = ''
  body =
    item.description.replace(/(<([^>]+)>)/gi, '').slice(0, 100) +
    (item.description.replace(/(<([^>]+)>)/gi, '').length > 100 ? '...' : '')

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageBorder}>
        <Image
          src={item.image}
          width={365}
          height={253}
          alt=""
          layout="responsive"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className={styles.textContainer + ' mt-2 py-3 px-5'}>
        <div className={styles.cardTitle}>{item.title}</div>
        <div className={styles.cardDate + ' mt-3 mb-2'}>{moment(item.date).format('DD/MM/YYYY')}</div>
        <div className={styles.cardDescription}>{body}</div>
      </div>
    </div>
  )
}

export default NewsCard
