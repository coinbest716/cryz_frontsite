import React from 'react'
import styles from './DashboardButton.module.scss'

const DashboardButton = props => {
  const { handleClick, label, type } = props
  return (
    <>
      {type === 'startClass' && (
        <div>
          <button
            className={'flex justify-between items-center px-4 py-2 ' + styles.outlineButton}
            onClick={handleClick}
          >
            <p className={'pr-3 ' + styles.outlineLabel}>{label}</p>
            <img src="/images/start-class.svg" alt="" style={{ width: '30px', height: '30px' }} />
          </button>
        </div>
      )}
      {type === 'view' && (
        <div>
          <button
            className={'flex justify-between items-center pl-8 pr-6 py-2 ' + styles.viewButton}
            onClick={handleClick}
          >
            <p className={styles.viewLabel}>{label}</p>
            <img src="/images/view-right.svg" alt="" style={{ width: '8px', height: '8px' }} />
          </button>
        </div>
      )}
      {type === 'viewRed' && (
        <div>
          <button
            className={'flex justify-between items-center pl-6 pr-5 py-2 ' + styles.viewRedButton}
            onClick={handleClick}
          >
            <p className={styles.viewRedLabel}>{label}</p>
            <img src="/images/view-right-red.svg" alt="" style={{ width: '8px', height: '8px' }} />
          </button>
        </div>
      )}
      {type === 'hour' && (
        <div>
          <button className={'flex justify-around items-center ' + styles.hourButton} onClick={handleClick}>
            <div className="absolute ">
              <p className={styles.numberLabel}>{label}</p>
              <div className={styles.hourLabel}>Horas</div>
            </div>
          </button>
        </div>
      )}
      {type === 'editProfile' && (
        <button className={'flex justify-between items-center ' + styles.editButton} onClick={handleClick}>
          <img src="/images/edit.svg" alt="" style={{ width: '15px', height: '15px' }} />
          <p className={'pl-3 ' + styles.editLabel}>{label}</p>
        </button>
      )}
      {type === 'iconWeight' && (
        <button className={'flex justify-between items-center ' + styles.iconButton} onClick={handleClick}>
          <img src="/images/weight.svg" alt="" style={{ width: '25px', height: '25px' }} />
        </button>
      )}
      {type === 'iconHeight' && (
        <button className={'flex justify-between items-center ' + styles.iconButton} onClick={handleClick}>
          <img src="/images/height.svg" alt="" style={{ width: '25px', height: '25px' }} />
        </button>
      )}
      {type === 'addBilling' && (
        <button className={'flex justify-around items-center ' + styles.addBilling} onClick={handleClick}>
          <div className={styles.plusSection}>
            <div className={styles.plusLetter}>+</div>
          </div>
          <p className={'pr-3 ' + styles.plusLabel}>{label}</p>
        </button>
      )}
      {type === 'plusCollapse' && (
        <button className={styles.plusRoundSection} onClick={handleClick}>
          <div className={styles.plusRoundLetter}>+</div>
        </button>
      )}
      {type === 'minusCollapse' && (
        <button className={styles.plusRoundSection} onClick={handleClick}>
          <div className={styles.minusRoundLetter}>-</div>
        </button>
      )}
    </>
  )
}

export default DashboardButton
