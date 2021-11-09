import React from 'react'
import Image from 'next/image'
import styles from './Feature.module.scss'
import ArrowRightWhite from 'public/images/arrow-right-white.svg'

const Feature = props => {
  const { data } = props

  return (
    <div className={'flex justify-start w-full items-center'}>
      <div
        style={{ backgroundColor: data.bgColor, width: '28px', height: '28px', minWidth: '28px' }}
        className={'flex justify-center items-center mr-2'}
      >
        <img src={data.path} alt="" width={15} height={15} />
      </div>
      <div>
        <div className={styles.top}>{data.topLabel}</div>
        <div className={styles.low}>{data.lowLabel}</div>
      </div>
    </div>
  )
}

export default Feature
