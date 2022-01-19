import React from 'react'
import Image from 'next/image'
import backGrayIcon from 'public/images/arrow-left-gray.svg'
import styles from './PreviousButton.module.scss'

const PreviousButton = props => {
  const { handleChangePrevious, label } = props

  return (
    <button className={'flex justify-between items-center hover:bg-gray-300 px-2 py-1'} onClick={handleChangePrevious}>
      <Image src={backGrayIcon} alt="" width={15} height={15} />
      <p className={styles.back}>{label}</p>
    </button>
  )
}

export default PreviousButton
