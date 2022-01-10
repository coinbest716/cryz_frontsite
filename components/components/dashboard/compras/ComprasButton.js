import React from 'react'
// styles
import styles from './ComprasButton.module.scss'

const ComprasButton = props => {
  const { title, description, type } = props
  return (
    <>
      {type === 'subscription' && (
        <div className={styles.sub_container + ' flex justify-center itmes-center'}>
          <div className={styles.sub_title}>{title}</div>
          <div className={styles.sub_description + ' ml-1'}>{description}</div>
        </div>
      )}
      {type === 'pending' && (
        <div className={styles.pending_container + ' flex justify-center itmes-center'}>
          <div className={styles.pending_title}>{title}</div>
        </div>
      )}
      {type === 'new' && (
        <div className={styles.new_container + ' flex justify-center itmes-center'}>
          <div className={styles.new_title}>{title}</div>
        </div>
      )}
    </>
  )
}

export default ComprasButton
