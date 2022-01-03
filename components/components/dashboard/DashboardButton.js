import React from 'react'

// next components
import Image from 'next/image'
import chatIcon from 'assets/images/messages.svg'
import plus from 'public/images/plus-gray.svg'
import plusWhite from 'public/images/plus-white.svg'
import minus from 'public/images/minus-gray.svg'
// styles
import styles from './DashboardButton.module.scss'

const DashboardButton = props => {
  const { handleClick, label, type, visible, count } = props

  return (
    <>
      {type === 'startClass' && visible === true && (
        <div className="mr-4">
          <button
            className={'flex justify-between items-center px-4 py-2 ' + styles.outlineButton}
            onClick={handleClick}
          >
            <p className={'pr-3 ' + styles.outlineLabel}>{label}</p>
            <div className="w-8 h-8 flex justify-center items-center">
              <Image
                src={'/images/start-class.svg'}
                alt={''}
                width={30}
                height={30}
                className={styles.startClassButtonImage}
              />
            </div>
          </button>
        </div>
      )}
      {type === 'message' && (
        <div>
          <button
            className={'flex justify-between items-center px-4 py-2 ' + styles.outlineGrayButton}
            onClick={handleClick}
          >
            <div className="w-6 h-6 flex justify-center">
              <Image src={chatIcon} alt={''} width={24} height={25} />
            </div>
            <p className={'pl-2 ' + styles.outlineGrayLabel}>{count} Nuevos Mensajes</p>
          </button>
        </div>
      )}
      {/* {type === 'startClass' && visible === false && (
        <div className="mr-4">
          <button className={'flex justify-between items-center px-4 py-2 ' + styles.outlineDisableButton}>
            <p className={'pr-3 ' + styles.outlineDisableLabel}>{label}</p>
            <Image src={'/images/start-class-gray.svg'} alt={''} width={30} height={30} />
          </button>
        </div>
      )} */}
      {type === 'view' && (
        <div>
          <button
            className={'flex justify-between items-center pl-8 pr-6 py-2 ' + styles.viewButton}
            onClick={handleClick}
          >
            <p className={styles.viewLabel}>{label}</p>
            <Image src={'/images/view-right.svg'} alt={''} width={8} height={8} />
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
            <Image src={'/images/view-right-red.svg'} alt={''} width={8} height={8} />
          </button>
        </div>
      )}
      {type === 'hour' && (
        <div>
          <button className={'flex justify-around items-center ' + styles.hourButton} onClick={handleClick}>
            <div className={'absolute '}>
              <p className={styles.numberLabel}>{label}</p>
              <div className={styles.hourLabel}>Horas</div>
            </div>
          </button>
        </div>
      )}
      {type === 'editProfile' && (
        <button className={'flex justify-between items-center ' + styles.editButton} onClick={handleClick}>
          <Image src={'/images/edit.svg'} alt={''} width={15} height={15} />
          <p className={'pl-3 ' + styles.editLabel}>{label}</p>
        </button>
      )}
      {type === 'iconWeight' && (
        <button className={'flex justify-between items-center ' + styles.iconButton} onClick={handleClick}>
          <Image src={'/images/weight.svg'} alt={''} width={25} height={25} />
        </button>
      )}
      {type === 'iconHeight' && (
        <button className={'flex justify-between items-center ' + styles.iconButton} onClick={handleClick}>
          <Image src={'/images/height.svg'} alt={''} width={25} height={25} />
        </button>
      )}
      {type === 'addBilling' && (
        <button className={'flex justify-around items-center ' + styles.addBilling} onClick={handleClick}>
          <div className={'cursor-pointer flex justify-center items-center ' + styles.plusSection}>
            <Image src={plusWhite} alt={''} width={10} height={10} />
          </div>
          <p className={'pr-3 ' + styles.plusLabel}>{label}</p>
        </button>
      )}
      {type === 'plusCollapse' && (
        <button
          className={'cursor-pointer flex justify-center items-center ' + styles.plusRoundSection}
          onClick={handleClick}
        >
          <Image src={plus} alt={''} width={10} height={10} />
        </button>
      )}
      {type === 'minusCollapse' && (
        <button
          className={'cursor-pointer flex justify-center items-center ' + styles.plusRoundSection}
          onClick={handleClick}
        >
          <Image src={minus} alt={''} width={10} height={10} />
        </button>
      )}
    </>
  )
}

export default DashboardButton
