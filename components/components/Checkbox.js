import React from 'react'
import styles from './Checkbox.module.scss'

const Radio = props => {
  const { handleChangeCheckbox, name, value, label } = props

  return (
    <div className={'flex relative'}>
      <input
        type="checkbox"
        value={value}
        name={name}
        onChange={event => handleChangeCheckbox(event)}
        className={styles.inputCheckbox}
      />
      <div>
        <p className={'pl-3 ' + styles.title}>{label}</p>
      </div>
    </div>
  )
}

export default Radio
