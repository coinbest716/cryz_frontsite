import React, { useEffect, useState } from 'react'
import styles from './Checkbox.module.scss'

const Radio = props => {
  const { handleChangeCheckbox, name, value, label, answer } = props
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    let count = 0
    answer.map((item, index) => {
      if (item === value) {
        count++
      }
    })
    if (count !== 0) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [answer, value])

  return (
    <div className={'flex relative'}>
      <input
        type="checkbox"
        value={value}
        name={name}
        checked={checked}
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
