import React from 'react'
import Image from 'next/image'
import plusWhite from 'public/images/plus-white.svg'
// styles
import styles from './WorkWithUsButton.module.scss'

const WorkWithUsButton = props => {
  const { handleClick, label, type, onClickAttachFile, fileRef, handleAttachFile, viewport } = props
  return (
    <>
      {viewport === 'mobile' ? (
        <>
          {type === 'pdf' && (
            <>
              <button className={styles.saveButton + ' flex items-center mt-5'} onClick={onClickAttachFile}>
                <div className={'cursor-pointer flex justify-center items-center mr-3 ' + styles.plusSection}>
                  <Image src={plusWhite} alt={''} width={10} height={10} />
                </div>
                <div className={styles.saveLabel}>{label}</div>
              </button>
              <input className={'hidden'} type="file" id="img_frontr" onChange={handleAttachFile} ref={fileRef} />
            </>
          )}
          {type === 'cv' && (
            <button className={'flex justify-between items-center ' + styles.m_cvButton} onClick={handleClick}>
              <p className={styles.m_cvLabel}>{label}</p>
            </button>
          )}
        </>
      ) : (
        <>
          {type === 'pdf' && (
            <>
              <button className={'flex justify-between items-center ' + styles.pdfButton} onClick={onClickAttachFile}>
                <p className={styles.pdfLabel}>{label}</p>
              </button>
              <input className={'hidden'} type="file" id="img_frontr" onChange={handleAttachFile} ref={fileRef} />
            </>
          )}
          {type === 'cv' && (
            <button className={'flex justify-between items-center ' + styles.cvButton} onClick={handleClick}>
              <p className={styles.cvLabel}>{label}</p>
            </button>
          )}
        </>
      )}
    </>
  )
}

export default WorkWithUsButton
