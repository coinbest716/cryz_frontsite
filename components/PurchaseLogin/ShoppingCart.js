import React from 'react'

// next components
import Image from 'next/image'
import Radio from 'components/Purchase/Radio'

// images
import mainImage from 'assets/images/main-mobile.png'

// styles
import styles from './ShoppingCart.module.scss'

const ShoppingCart = props => {
  const { shoppingInfo, docData, handleChangeFrame } = props

  return (
    <div className={styles.shoppingCart}>
      <div className={'flex justify-between'}>
        <div className={styles.summary}>Resumen compra</div>
      </div>
      <div className={styles.divider + ' mt-4 mb-4'} />
      <div className="flex flex-col justify-between">
        <div className={'max-h-54 overflow-y-auto -mr-8 pr-1'}>
          <div className={'flex justify-between items-center my-3'}>
            <div className={'flex justify-between'}>
              <div className={'mr-4'} style={{ minWidth: '88px' }}>
                <Image src={shoppingInfo?.image || mainImage} alt={''} width={88} height={88} />
              </div>
              <div className={'flex flex-col justify-evenly'}>
                <div className={styles.listDescription}>{shoppingInfo?.description}</div>
                <div className={styles.listPrice}>€&nbsp;&nbsp;{shoppingInfo?.price}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {docData && (
            <div className={'pt-36'}>
              <Radio
                handleChangeType={handleChangeFrame}
                type={'billAddress'}
                value={'billAddress'}
                label={'Dirección facturación'}
              />
              <div className={'pt-2 pl-8 ' + styles.billAddress}>
                <div>{docData.name + ' ' + docData.surname}</div>
                <div>{docData.address}</div>
                <div>{docData.province}</div>
                <div>{docData.postalCode}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart
