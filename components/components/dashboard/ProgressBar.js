import React from 'react'
import styles from './ProgressBar.module.scss'

const ProgressBar = ({ percentage, label, type }) => {
  return (
    <div>
      <div className={'flex justify-between'}>
        <div className={styles.label}>{label}</div>
        <div className={styles.label}>{percentage}%</div>
      </div>
      <div className={'h-2 w-full rounded bg-gray-100 mt-2'}>
        <div
          style={{ width: `${percentage}%` }}
          className={`h-full rounded ${
            type === 'women' ? 'bg-gray-200' : type === 'nutrition' ? 'bg-gray-400' : 'bg-gray-300'
          }`}
        ></div>
      </div>
    </div>
  )
}

export default ProgressBar
