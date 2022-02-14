import React from 'react'

// next components
import Image from 'next/image'

// styles
import styles from './StoreProductCard.module.scss'

const StoreProductCard = props => {
  const { item, handleClickProduct, viewport } = props
  console.log('viewport', viewport)

  return viewport !== 'mobile' ? (
    <div className="cursor-pointer" style={{ maxWidth: '370px' }} onClick={() => handleClickProduct(item.id)}>
      <div className={styles.newImage}>
        <Image src={item.url} alt="" width={370} height={460} />
      </div>
      <div className={styles.newName + ' my-2'}>{item.name}</div>
      <div className="flex flex-wrap ">
        {item.discountPrice ? (
          <>
            <div className={'line-through mr-3 ' + styles.orgPrice}>{item.price}€</div>
            <div className={styles.disPrice}>{item.discountPrice}€</div>
          </>
        ) : (
          <div className={styles.orgPrice}>{item.price}€</div>
        )}
      </div>
    </div>
  ) : (
    <div className="cursor-pointer w-full" onClick={() => handleClickProduct(item.id)}>
      <div className={styles.newImage}>
        <Image src={item.url} alt="" width={370} height={460} />
      </div>
      <div className={styles.mobileNewName + ' my-2'}>{item.name}</div>
      <div className="flex flex-wrap ">
        {item.discountPrice ? (
          <>
            <div className={'line-through mr-3 ' + styles.mobileOrgPrice}>{item.price}€</div>
            <div className={styles.mobileDisPrice}>{item.discountPrice}€</div>
          </>
        ) : (
          <div className={styles.mobileOrgPrice}>{item.price}€</div>
        )}
      </div>
    </div>
  )
}

export default StoreProductCard
