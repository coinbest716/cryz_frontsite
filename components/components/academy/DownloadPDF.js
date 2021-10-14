import React from 'react'
import Image from 'next/image'
import styles from './DownloadPDF.module.scss'
import DownloadPDFIcon from 'public/images/downloadPDF.svg'

const DownloadPDF = props => {
  const { onClick } = props

  return (
    <button className={'flex justify-between w-full items-center ' + styles.download} onClick={onClick}>
      <div className={styles.label}>{'Dossier'}&nbsp;&nbsp;</div>
      <Image src={DownloadPDFIcon} alt="" width={15} height={15} />
    </button>
  )
}

export default DownloadPDF
