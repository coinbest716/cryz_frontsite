import React from 'react'

// styles
import styles from './ProductCounter.module.scss'

const ProductCounter = props => {
  const { count, onChange } = props

  const handleChange = type => {
    switch (type) {
      case '-':
        onChange(count - 1)
        break
      case '+':
        onChange(count + 1)
        break
      default:
        break
    }
  }

  return (
    <div className={'flex justify-between items-center ' + styles.countArea}>
      <button className={'flex justify-center items-center ' + styles.countButton} onClick={() => handleChange('-')}>
        <div className={styles.buttonText}>-</div>
      </button>
      <div className={styles.countText}>{count}</div>
      <button className={'flex justify-center items-center ' + styles.countButton} onClick={() => handleChange('+')}>
        <div className={styles.buttonText}>+</div>
      </button>
    </div>
  )
}

export default ProductCounter
