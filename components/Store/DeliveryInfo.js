import React from 'react'

// next components
import Image from 'next/image'

// images and icons
import HeartWhiteIcon from 'assets/images/heart-white.svg'
import HeartGrayIcon from 'assets/images/heart-gray.svg'
import return30WhiteIcon from 'assets/images/return-30-white.svg'
import return30GrayIcon from 'assets/images/return-30-gray.svg'
import shippingWhiteIcon from 'assets/images/shipping-white.svg'
import shippingGrayIcon from 'assets/images/shipping-gray.svg'

// styles
import styles from './DeliveryInfo.module.scss'

const DeliveryInfo = props => {
  const { viewport } = props
  return viewport === 'mobile' ? (
    <div className="flex justify-between items-center">
      <div className={'flex flex-wrap justify-center items-center'}>
        <div className={'flex justify-center items-center ' + styles.borderCircle}>
          <Image src={HeartGrayIcon} alt="" width={23} height={20} />
        </div>
        <div className={'w-full ' + styles.mobileTitle}>Calidad garantizada</div>
      </div>
      <div className={'flex flex-wrap justify-center items-center'}>
        <div className={'flex justify-center items-center ' + styles.borderCircle}>
          <Image src={return30GrayIcon} alt="" width={23} height={20} />
        </div>
        <div className={'w-full ' + styles.mobileTitle}>Envio 48 / 72 horas</div>
      </div>
      <div className={'flex flex-wrap justify-center items-center'}>
        <div className={'flex justify-center items-center ' + styles.borderCircle}>
          <Image src={shippingGrayIcon} alt="" width={23} height={20} />
        </div>
        <div className={'w-full ' + styles.mobileTitle}>Devolución 30 dias</div>
      </div>
    </div>
  ) : (
    <>
      <div className="flex justify-start items-center">
        <Image src={HeartWhiteIcon} alt="" width={23} height={20} />
        <div className={styles.title + ' ml-3'}>Calidad garantizada</div>
      </div>
      <div className="flex justify-start items-center">
        <Image src={shippingWhiteIcon} alt="" width={23} height={20} />
        <div className={styles.title + ' ml-3'}>Envio 48 / 72 horas</div>
      </div>
      <div className="flex justify-start items-center">
        <Image src={return30WhiteIcon} alt="" width={23} height={20} />
        <div className={styles.title + ' ml-3'}>Devolución 30 dias</div>
      </div>
    </>
  )
}

export default DeliveryInfo
