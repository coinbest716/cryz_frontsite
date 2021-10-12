import React from 'react'
import Image from 'next/image'
import styles from './ArrowButton.module.scss'
import ArrowRightUpGray from 'assets/images/arrow-right-up.svg'
import ArrowRightUpWhite from 'assets/images/arrow-left.svg'

const ArrowButton = props => {
  const { filter, onClick } = props

  return (
    <>
      {filter?.active ? (
        <button className={styles.activeButton + ' flex justify-between'} onClick={() => onClick(filter.index)}>
          <p className={'mr-4 ' + styles.label}>{filter?.label}</p>
          <Image src={ArrowRightUpWhite} alt="" width={23} height={22} />
        </button>
      ) : (
        <button className={styles.deactiveButton + ' flex justify-between'} onClick={() => onClick(filter.index)}>
          <p className={'mr-4 ' + styles.label}>{filter?.label}</p>
          <Image src={ArrowRightUpGray} alt="" width={23} height={22} />
        </button>
      )}
    </>
  )
}

export default ArrowButton
