import React from 'react'
// styles
import styles from './ComprasSubscriptionButton.module.scss'

const ComprasSubscriptionButton = props => {
  const { title, description } = props
  return (
    <div className={styles.container + ' flex justify-center itmes-center'}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description + ' ml-1'}>{description}</div>
    </div>
  )
}

export default ComprasSubscriptionButton
