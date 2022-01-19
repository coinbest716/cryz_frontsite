import React from 'react'
import Image from 'next/image'
import styles from './DownloadPDF.module.scss'
import DownloadPDFIcon from 'public/images/downloadPDF.svg'
import DownloadWhiteIcon from 'public/images/downloadWhite.svg'

const DownloadPDF = props => {
  const { onClick, data, type, url } = props

  const download = (fileUrl, fileName) => {
    var a = document.createElement('a')
    a.href = fileUrl
    a.setAttribute('download', fileName)
    a.click()
  }

  return (
    <div>
      {type === 'plan' ? (
        data !== undefined ? (
          <button
            className={'flex justify-between w-full items-center px-8 py-3 ' + styles.downloadPlan}
            onClick={() => download(data.path, data.path.split('/').pop())}
          >
            <div className={styles.labelPlan}>{'Documentación'}&nbsp;&nbsp;</div>
            <div className={'w-4 h-4 flex items-center'}>
              <Image src={DownloadWhiteIcon} alt="" width={15} height={15} />
            </div>
          </button>
        ) : (
          <></>
        )
      ) : (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <button className={'flex justify-between w-full items-center ' + styles.download} onClick={onClick}>
            <div className={styles.label}>{'Dossier'}&nbsp;&nbsp;</div>
            <div className={'w-4 h-4 flex items-center'}>
              <Image src={DownloadPDFIcon} alt="" width={15} height={15} />
            </div>
          </button>
        </a>
      )}
    </div>
  )
}

export default DownloadPDF
