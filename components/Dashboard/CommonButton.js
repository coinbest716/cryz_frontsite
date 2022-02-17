import React from 'react'

// styles
import styles from './CommonButton.module.scss'

const CommonButton = props => {
  const { handleClickButton, label, bgColor } = props
  return (
    <button
      className={'p-2 px-7 rounded-xs cursor-pointer ' + styles.button}
      style={{ backgroundColor: bgColor }}
      onClick={handleClickButton}
    >
      {label}
    </button>
  )
}

export default CommonButton
