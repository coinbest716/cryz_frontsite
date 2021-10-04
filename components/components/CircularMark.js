import React from 'react'
import Image from 'next/image'
import styles from './CircularMark.module.scss'
import CircularMarkIcon from 'assets/images/contact-mark.svg'

const CircularMark = () => {
  return (
    <div>
      <Image src={CircularMarkIcon} alt="" width={173} height={173} opacity={0.72} className={styles.animationMark} />
    </div>
  )
}

export default CircularMark
