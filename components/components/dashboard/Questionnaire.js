import React from 'react'

// next components
import Image from 'next/image'

// images and icons
import CloseIcon from 'assets/images/close.svg'

// styles
import styles from './Questionnaire.module.scss'

const Questionnaire = props => {
  const { onClick } = props
  return (
    <div className={styles.card}>
      <div className={styles.closeButton}>
        <button
          className={'duration-200 hover:bg-gray-300 rounded-full p-3 flex justify-center items-center'}
          onClick={() => onClick()}
        >
          <Image src={CloseIcon} alt="..." width={30} height={30} />
        </button>
      </div>
      <div className={styles.title}>Rellena el cuestionario</div>
      <div className={styles.underline}></div>
      <div className={styles.subTitle}>Titulo de sección</div>
    </div>
  )
}

export default Questionnaire
