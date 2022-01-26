import React from 'react'

// styles
import styles from './WorkWithUsButton.module.scss'

const WorkWithUsButton = props => {
  const { handleClick, label, type, onClickAttachFile, fileRef, handleAttachFile } = props
  return (
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
  )
}

export default WorkWithUsButton
