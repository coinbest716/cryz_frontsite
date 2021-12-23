import React from 'react'

// custom components
import HamburgMenu from 'components/Menu/HamburgMenu'

// styles
import styles from 'components/Header/MobileDashboardHeader.module.scss'

const MobileDashboardHeader = props => {
  // variables
  const { title } = props
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <HamburgMenu />
    </div>
  )
}

export default MobileDashboardHeader
