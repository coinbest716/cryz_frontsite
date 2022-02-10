import React from 'react'
import Image from 'next/image'
import styles from './ArrowWatchNowButton.module.scss'
import ArrowRightWhite from 'public/images/arrow-right-white.svg'
import ArrowRightGray from 'public/images/arrow-right-gray.svg'

const ArrowWatchNowButton = props => {
  const { onClick, viewport } = props

  return (
    <>
      {viewport === 'mobile' ? (
        <button className={styles.m_workWithUsButton + ' flex justify-between items-center w-full'} onClick={onClick}>
          <div className={'flex'}>
            <p className={'mr-5 font-bold ' + styles.m_label}>VER AHORA</p>
          </div>
          <Image src={ArrowRightGray} alt="" width={10} height={8} />
        </button>
      ) : (
        <button className={styles.workWithUsButton + ' flex justify-between w-full'} onClick={onClick}>
          <div className={'flex'}>
            <p className={'mr-5 font-bold ' + styles.label}>VER AHORA</p>
          </div>
          <Image src={ArrowRightWhite} alt="" width={23} height={22} />
        </button>
      )}
    </>
  )
}

export default ArrowWatchNowButton
