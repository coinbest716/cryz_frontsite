import React from 'react'
import Chip from 'components/components/Chip'
// styles
import styles from './ComprasDetailItem.module.scss'

const ComprasDetailItem = props => {
  const { item } = props
  return (
    <div className={styles.container + ' flex justify-between'}>
      <div className={styles.letter}>{item.session_count}</div>
      <div className="text-center">
        <div className={styles.letter}>{item.user.name + ' ' + item.user.lastname}</div>
        <div>
          <Chip data={item.status} onClick={() => {}} />
        </div>
      </div>
      <div className={styles.letter}>{item.date}</div>
    </div>
  )
}

export default ComprasDetailItem
