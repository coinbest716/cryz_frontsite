import React from 'react'
import styles from './Material.module.scss'

const Material = props => {
  const { item } = props
  return (
    <div className="flex justify-start py-2">
      <img
        src={item.url}
        alt=""
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '10px',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      <div className="pl-4 flex flex-col justify-around">
        <div className={styles.label}>{item.label}</div>
        <div className={styles.description}>{item.description}</div>
      </div>
    </div>
  )
}

export default Material
