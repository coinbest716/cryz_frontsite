import React from 'react'
// styles
import styles from './ComprasDetailItem.module.scss'

const ComprasDetailItem = props => {
  const { title, description, type } = props
  return (
    <div className={styles.container + ' flex justify-between'}>
      <div className={styles.letter}>1</div>
      <div>
        <div className={styles.letter}>Enrique Menéndez</div>
        <div>Button</div>
      </div>
      <div className={styles.letter}>24/52/2022</div>
    </div>
  )
}

export default ComprasDetailItem
