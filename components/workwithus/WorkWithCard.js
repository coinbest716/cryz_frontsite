import React, { useState } from 'react'

// next components
import Image from 'next/image'
import moment from 'moment'

import ArrowRightWhite from 'public/images/arrow-right-white.svg'
// styles
import styles from './WorkWithCard.module.scss'

const WorkWithCard = props => {
  const { item, handleClickOffer } = props
  let title = ''
  let body = ''
  title =
    item.title.replace(/(<([^>]+)>)/gi, '').slice(0, 50) +
    (item.title.replace(/(<([^>]+)>)/gi, '').length > 50 ? '...' : '')
  body =
    item.description.replace(/(<([^>]+)>)/gi, '').slice(0, 120) +
    (item.description.replace(/(<([^>]+)>)/gi, '').length > 120 ? '...' : '')

  return (
    <div style={{ maxWidth: '365px' }}>
      <div className={styles.textContainer + ' p-5'} style={{ minHeight: '217px' }}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description + ' mt-9'}>{body}</div>
      </div>
      <div className={styles.btContainer + ' flex justify-between items-center cursor-pointer mt-2 w-full px-7 py-3'} onClick={() => handleClickOffer(item.id)}>
        <div className={styles.btTitle + ' mr-2'}>Ver detalle de oferta</div>
        <Image src={ArrowRightWhite} width={23} height={22} alt="" />
      </div>
    </div>
  )
}

export default WorkWithCard
