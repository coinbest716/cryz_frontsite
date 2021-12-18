import React, { useState } from 'react'
import Image from 'next/image'
import styles from './ServiceButton.module.scss'
import RightGrayIcon from 'public/images/arrow-right-gray.svg'

const ServiceButton = props => {
  const { label, onClick } = props

  return (
    <div>
      <button className={styles.workWithUsButton + ' flex justify-between items-center w-full'} onClick={onClick}>
        <p className={'mr-4 ' + styles.label}>{label}</p>
        <Image src={RightGrayIcon} alt="" width={15} height={13} />
      </button>
    </div>
  )
}

export default ServiceButton
