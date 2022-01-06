import React from 'react'

// next components
import Image from 'next/image'

// images
import nextButtonGrayIcon from 'assets/images/arrow-right-gray.svg'

// styles
import styles from './ComprasItem.module.scss'

const ComprasItem = props => {
  const { data, index, handleClickComprasItem } = props
  return (
    <div>
      <div
        onClick={() => handleClickComprasItem(index)}
        className={styles.container + ' flex justify-between items-center w-full '}
      >
        <div>
          <div className={styles.number}>#{data.bill_number}</div>
          <div className={styles.date}>{data.purchase_date}</div>
        </div>
        <div>
          <Image src={nextButtonGrayIcon} alt="" width={22} height={14} />
        </div>
      </div>
      <div className={styles.divider} />
    </div>
  )
}

export default ComprasItem
