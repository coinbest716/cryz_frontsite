import React from 'react'

// styles
import styles from './ProfileHealthItem.module.scss'

const ProfileHealthItem = props => {
  const { label, value, handleChange } = props
  return (
    <div className={styles.container + ' flex justify-center items-center'}>
      <div>
        <div className={styles.label}>{label}</div>
        <div className="flex justify-center">
          <input
            type="text"
            className={'w-full flex justify-between items-center ' + styles.input}
            value={value}
            onChange={handleChange}
            placeholder={''}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileHealthItem
