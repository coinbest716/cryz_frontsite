import React from 'react'

// next components
import Image from 'next/image'

// images
import RightGrayIcon from 'public/images/arrow-right-gray.svg'
import FileText from 'public/images/file-text.svg'
import BillCross from 'public/images/bill-cross.svg'

// styles
import styles from './MobileBillCard.module.scss'

const MobileBillCard = props => {
  const { item, handleMobileDeleteAddress, handleMobileEditAddress } = props
  return (
    <div className={'flex justify-between ' + styles.container}>
      <div>
        <div className={styles.fileText + ' flex justify-center items-center'}>
          <Image src={FileText} alt="" width={15} height={18} />
        </div>
        <div className={styles.address}>{item.address}</div>
        <div className={styles.city}>{item.province}</div>
      </div>
      <div className="flex flex-col justify-between items-center">
        <div className={styles.arrowLeft} onClick={() => handleMobileEditAddress(item.id)}>
          <Image src={RightGrayIcon} alt="" width={25} height={16} />
        </div>
        <div className={styles.billCross} onClick={() => handleMobileDeleteAddress(item.id)}>
          <Image src={BillCross} alt="" width={30} height={30} />
        </div>
      </div>
    </div>
  )
}

export default MobileBillCard
