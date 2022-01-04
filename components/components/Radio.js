import React, { useEffect, useState } from 'react'
import styles from './Radio.module.scss'

const Radio = props => {
  const { handleChangeType, name, value, label, answer } = props
  const [checked, setchecked] = useState('')

  useEffect(() => {
    if (answer === value) {
      setchecked('checked')
    } else {
      setchecked('')
    }
  }, [answer])

  return (
    <div className={'flex'}>
      <input
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={handleChangeType}
        className={styles.inputRadio}
      />
      <div>
        <p className={'pl-3 ' + styles.title}>{label}</p>
      </div>
    </div>
  )
}

export default Radio
