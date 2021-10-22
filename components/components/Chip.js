import React from 'react'

// styles
import styles from 'components/components/Chip.module.scss'

const Chip = props => {
  const { data, onClick } = props

  return (
    <span className={styles.chip} style={{ backgroundColor: data.bgColor }} onClick={() => onClick}>
      <span>{data.label}</span>
    </span>
  )
}

export default Chip
