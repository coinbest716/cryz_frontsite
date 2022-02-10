import React from 'react'

// styles
import styles from './StorePregress.module.scss'

const StorePregress = props => {
  const { currentCount, allCount } = props
  let percentage = 0
  if (allCount !== 0) {
    percentage = Math.round(currentCount / allCount) * 100
  }

  return (
    <div className={styles.homePath}>
      <p className="text-center">
        {currentCount} de {allCount} productos en página
      </p>
      <div className="relative mt-2">
        <div className={styles.processBackground} style={{ width: '100%', height: '2px' }}></div>
        <div className={styles.progress + ' absolute top-0'} style={{ width: `${percentage}%`, height: '2px' }}></div>
      </div>
    </div>
  )
}

export default StorePregress
