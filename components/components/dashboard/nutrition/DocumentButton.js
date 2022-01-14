import React from 'react'
import Image from 'next/image'
// styles
import styles from './DocumentButton.module.scss'
import DownloadPDFIcon from 'public/images/downloadPDF.svg'

const DocumentButton = props => {
  const { doc, onClickDownload } = props
  return (
    <div
      className={styles.container + ' flex justify-center itmes-center cursor-pointer'}
      onClick={() => onClickDownload(doc.url)}
    >
      <div className={'mr-2 ' + styles.title}>{doc.title}</div>
      <Image src={DownloadPDFIcon} alt="" width={15} height={15} />
    </div>
  )
}

export default DocumentButton
