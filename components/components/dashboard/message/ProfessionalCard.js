import React from 'react'

// next components
import Image from 'next/image'

// styles
import styles from './ProfessionalCard.module.scss'

const ProfessionalCard = () => {
  return (
    <div className={styles.container}>
      <div className={'flex justify-start items-center'}>
        <div className={'mr-4 ' + styles.avatar}>CS</div>
        <div className={styles.title}>David Nothere</div>
      </div>
      <div className={'grid justify-center items-center'}>
        <div className={styles.text}>Nutricionista</div>
      </div>
    </div>
  )
}

export default ProfessionalCard
