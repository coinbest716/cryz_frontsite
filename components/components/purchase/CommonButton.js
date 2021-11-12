import React from 'react'

// next components
import Image from 'next/image'

// styles
import styles from './CommonButton.module.scss'

const CommonButton = props => {
  const { handleClick, label, type } = props
  return (
    <>
      {type === 'fill' && (
        <button className={'flex justify-between items-center ' + styles.fillButton} onClick={handleClick}>
          <p className={styles.fillLabel}>{label}</p>
        </button>
      )}
      {type === 'outline' && (
        <button className={'flex justify-between items-center ' + styles.outlineButton} onClick={handleClick}>
          <p className={styles.outlineLabel}>{label}</p>
        </button>
      )}
      {type === 'continue' && (
        <button className={'flex justify-between items-center ' + styles.continueButton} onClick={handleClick}>
          <p className={styles.continueLabel}>{label}</p>
        </button>
      )}
      {type === 'icon' && (
        <button className={'flex justify-between items-center ' + styles.outlineButton} onClick={handleClick}>
          <p className={'pr-3 ' + styles.outlineLabel}>{label}</p>
          <Image src={'/images/trash.svg'} alt={''} width={12} height={12} />
        </button>
      )}
    </>
  )
}

export default CommonButton
