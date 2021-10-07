import React, { useState } from 'react'
import Image from 'next/image'
import styles from './ArrowButton.module.scss'
import ArrowRightUpGray from 'assets/images/arrow-right-up.svg'
import ArrowRightUpWhite from 'assets/images/arrow-left.svg'

const ArrowButton = props => {
  const { label, onClick } = props
  const [defaultIcon, setDefautIcon] = useState(ArrowRightUpGray)
  const handleSetGrayIcon = () => {
    setDefautIcon(ArrowRightUpGray)
  }
  const handleSetWhiteIcon = () => {
    setDefautIcon(ArrowRightUpWhite)
  }

  return (
    <button
      className={styles.workWithUsButton + ' flex justify-between w-full'}
      onMouseOver={handleSetWhiteIcon}
      onMouseOut={handleSetGrayIcon}
      onClick={onClick}
    >
      <p className={'mr-4 ' + styles.label}>{label}</p>
      <Image src={defaultIcon} alt="" width={23} height={22} />
    </button>
  )
}

export default ArrowButton
