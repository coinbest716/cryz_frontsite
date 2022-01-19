import React from 'react'
import Image from 'next/image'
import styles from './ArrowOutlineButton.module.scss'
import ArrowRightGray from 'public/images/arrow-right-gray.svg'

const ArrowOutlineButton = props => {
  const { label, onClick, plazas } = props

  return (
    <button className={styles.outlineButton + ' flex w-full'} onClick={onClick}>
      {plazas ? <p>{'Consiguelo por'}</p> : <p>Completo</p>}
      {plazas && <p>{label}</p>}
      {plazas && <Image src={ArrowRightGray} alt="" width={10} height={8} />}
    </button>
  )
}

export default ArrowOutlineButton
