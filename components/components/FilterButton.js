import React from 'react'
import Image from 'next/image'
import styles from './FilterButton.module.scss'
import ArrowRightUpGray from 'assets/images/arrow-right-up.svg'
import ArrowRightUpWhite from 'assets/images/arrow-left.svg'

const FilterButton = props => {
  const { filter, onClick, active } = props

  return (
    <>
      {active ? (
        <button className={styles.activeButton + ' flex justify-between'} onClick={() => onClick(filter.id)}>
          <p className={'mr-4 ' + styles.label}>{filter?.label}</p>
          <Image src={ArrowRightUpWhite} alt="" width={23} height={22} />
        </button>
      ) : (
        <button className={styles.deactiveButton + ' flex justify-between'} onClick={() => onClick(filter.id)}>
          <p className={'mr-4 ' + styles.label}>{filter?.label}</p>
          <Image src={ArrowRightUpGray} alt="" width={23} height={22} />
        </button>
      )}
    </>
  )
}

export default FilterButton
