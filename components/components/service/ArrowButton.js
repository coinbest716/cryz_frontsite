import React, { useState } from 'react'
import Image from 'next/image'
import styles from './ArrowButton.module.scss'
import ArrowRightUpGray from 'assets/images/arrow-right-up.svg'
import BrownRightUpIcon from 'public/images/brown-arrow-right-up.svg'

const ArrowButton = props => {
  const { label, onClick, type, mobile } = props

  return (
    <div>
      {mobile ? (
        <button
          className={styles.m_workWithUsButton + ' p-1 flex justify-around items-center w-full'}
          onClick={onClick}
        >
          <p className={'mr-2 ' + styles.m_label}>{label}</p>
          {type === 'nutrition' && <Image src={BrownRightUpIcon} alt="" width={22} height={20} />}
          {type === 'physiotherapy' && <Image src={ArrowRightUpGray} alt="" width={22} height={20} />}
        </button>
      ) : (
        <button
          className={styles.workWithUsButton + ' pl-28 pr-16 flex justify-around items-center w-full'}
          onClick={onClick}
        >
          <p className={'mr-4 ' + styles.label}>{label}</p>
          {type === 'nutrition' && <Image src={BrownRightUpIcon} alt="" width={36} height={30} />}
          {type === 'physiotherapy' && <Image src={ArrowRightUpGray} alt="" width={36} height={30} />}
        </button>
      )}
    </div>
  )
}

export default ArrowButton
