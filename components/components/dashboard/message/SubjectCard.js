import React from 'react'

// next components
import Image from 'next/image'

// styles
import styles from './SubjectCard.module.scss'

// images
import CheckIcon from 'assets/images/check.svg'

const SubjectCard = () => {
  return (
    <div className={styles.container}>
      <div className={'flex justify-start'}>
        <div className={'relative mr-4 ' + styles.avatar}>
          CS
          <div className={styles.status} style={{ backgroundColor: '#5D51C6' }}></div>
        </div>
        <div className={'inline-grid justify-start items-center'}>
          <div className={styles.title}>Entrenamiento de resistencia</div>
          <div className={'mt-2 ' + styles.text}>Siapp enjing saya ka bumi ente masih di didinya pan?</div>
        </div>
      </div>
      <div className={'grid justify-center items-center'}>
        <div className={styles.text}>10:24 AM</div>
        <div className={'mt-2 inline-grid'}>
          <Image src={CheckIcon} alt={''} width={26} height={26} />
        </div>
      </div>
    </div>
  )
}

export default SubjectCard
