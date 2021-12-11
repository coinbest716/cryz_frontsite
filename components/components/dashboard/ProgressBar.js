import React from 'react'
import styles from './ProgressBar.module.scss'

const ProgressBar = props => {
  const { data } = props
  let percentage = 0
  if (data.total !== 0) {
    percentage = Number((data.used / data.total) * 100)
  }
  return (
    <div>
      <div className={'flex justify-between'}>
        <div className={styles.label}>{data.specialty}</div>
        <div className={styles.label}>
          {data.used} / {data.total}
        </div>
      </div>
      <div className={'h-2 w-full rounded bg-gray-100 mt-2'}>
        <div
          style={{ width: `${percentage}%` }}
          // className={`h-full rounded ${
          //   type === 'women' ? 'bg-gray-200' : type === 'nutrition' ? 'bg-gray-400' : 'bg-gray-300'
          // }`}
          className={'h-full rounded bg-gray-300'}
        ></div>
      </div>
    </div>
  )
}

export default ProgressBar
