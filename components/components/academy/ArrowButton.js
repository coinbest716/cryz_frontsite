import React from 'react'
import Image from 'next/image'
import styles from './ArrowButton.module.scss'
import ArrowRightWhite from 'public/images/arrow-right-white.svg'

const ArrowButton = props => {
  const { label, onClick } = props

  return (
    <button className={styles.workWithUsButton + ' flex justify-between w-full'} onClick={onClick}>
      <div className="flex">
        <p>{'Consiguelo por'}&nbsp;&nbsp;</p>
        <p className={'mr-4 font-bold ' + styles.label}>{label}</p>
      </div>
      <Image src={ArrowRightWhite} alt="" width={23} height={22} />
    </button>
  )
}

export default ArrowButton
