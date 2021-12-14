import React, { useState } from 'react'

// next components
import Image from 'next/image'

// styles
import styles from './ShoppingCart.module.scss'

const ShoppingCart = props => {
  const { shoppingInfo } = props
  console.log('######################', shoppingInfo)
  return (
    <div className={styles.shoppingCart}>
      <div className={'flex justify-between'}>
        <div className={styles.summary}>Resumen compra</div>
      </div>
      <div className={styles.divider + ' mt-4 mb-4'} />
      <div className={'max-h-54 overflow-y-auto -mr-8 pr-1'}>
        <div className={'flex justify-between items-center my-3'}>
          {shoppingInfo?.image && (
            <div className={'flex justify-between'}>
              <div className={'mr-4'} style={{ minWidth: '88px' }}>
                <Image src={shoppingInfo.image} alt={''} width={88} height={88} />
              </div>
              <div className={'flex flex-col justify-between'}>
                <div className={styles.listDescription}>{shoppingInfo.description}</div>
                <div className={styles.listPrice}>€&nbsp;&nbsp;{shoppingInfo.price}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart
