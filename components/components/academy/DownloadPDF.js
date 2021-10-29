import React from 'react'
import Image from 'next/image'
import styles from './DownloadPDF.module.scss'
import DownloadPDFIcon from 'public/images/downloadPDF.svg'
import DownloadWhiteIcon from 'public/images/downloadWhite.svg'

const DownloadPDF = props => {
  const { onClick, type } = props

  return (
    <div>
      {type === 'plan' ? (
        <button
          className={'flex justify-between w-full items-center px-8 py-3 ' + styles.downloadPlan}
          onClick={onClick}
        >
          <div className={styles.labelPlan}>{'Documentación'}&nbsp;&nbsp;</div>
          <Image src={DownloadWhiteIcon} alt="" width={15} height={15} />
        </button>
      ) : (
        <button className={'flex justify-between w-full items-center ' + styles.download} onClick={onClick}>
          <div className={styles.label}>{'Dossier'}&nbsp;&nbsp;</div>
          <Image src={DownloadPDFIcon} alt="" width={15} height={15} />
        </button>
      )}
    </div>
  )
}

export default DownloadPDF
