import React from 'react'
import Image from 'next/image'
import styles from './CircularMark.module.scss'
import CircularMarkIcon from 'assets/images/contact-mark.svg'
import router from 'next/router'

const CircularMark = () => {
  const handleGotoContact = () => {
    router.push('/contact')
  }
  return (
    <div>
      <Image
        src={CircularMarkIcon}
        alt=""
        width={173}
        height={173}
        opacity={0.72}
        className={'cursor-pointer ' + styles.animationMark}
        onClick={() => handleGotoContact()}
      />
    </div>
  )
}

export default CircularMark
