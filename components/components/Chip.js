import React from 'react'

// styles
import styles from 'components/components/Chip.module.scss'

const Chip = props => {
  const { bgColor, label, onClick } = props
  return (
    <span className={styles.chip} style={{ backgroundColor: bgColor }} onClick={() => onClick}>
      <span>{label}</span>
    </span>
  )
}

export default Chip
