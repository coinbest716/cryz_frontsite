import React from 'react'

// next components
import Image from 'next/image'

// styles
import styles from './WorkWithUsButton.module.scss'

const WorkWithUsButton = props => {
  const { handleClick, label, type } = props
  return (
    <>
      {type === 'pdf' && (
        <button className={'flex justify-between items-center ' + styles.pdfButton} onClick={handleClick}>
          <p className={styles.pdfLabel}>{label}</p>
        </button>
      )}
      {type === 'cv' && (
        <button className={'flex justify-between items-center ' + styles.cvButton} onClick={handleClick}>
          <p className={styles.cvLabel}>{label}</p>
        </button>
      )}
    </>
  )
}

export default WorkWithUsButton
