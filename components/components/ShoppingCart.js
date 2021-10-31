import React, { useState } from 'react'
import Image from 'next/image'
import styles from './ShoppingCart.module.scss'
import close from 'public/images/close.svg'
import down from 'public/images/down.svg'
import up from 'public/images/up.svg'
import arrowLeftPink from 'public/images/arrow-left-pink.svg'

const ShoppingCart = props => {
  const { data, handleRemoveCart, handleBack, handleCheckout } = props
  const [expend, setExpend] = useState(false)

  const handleClickExpand = () => {
    setExpend(!expend)
  }

  let total = 0
  data?.map(item => (total += item.price))

  return (
    <div className={styles.shoppingCart}>
      <div className="flex justify-between">
        <div className={styles.summary}>Resumen compra</div>
        <div className={'relative cursor-pointer ' + styles.badge}>
          <div className={'absoulte top-3 right-3 ' + styles.summaryNumber}>2</div>
        </div>
      </div>
      <div className={styles.divider + ' mt-4 mb-4'} />
      <div className="max-h-54 overflow-y-auto -mr-8 pr-1">
        {data?.map((item, index) => (
          <div className="flex justify-between items-center my-3" key={index}>
            <div className="flex justify-between">
              <div className="mr-4" style={{ minWidth: '88px' }}>
                <img src={item.image} style={{ width: '88px', height: '88px' }} />
              </div>
              <div className="flex flex-col justify-between">
                <div className={styles.listDescription}>{item.description}</div>
                <div className={styles.listPrice}>€&nbsp;&nbsp;{item.price}</div>
              </div>
            </div>
            <div>
              <button
                className="duration-200 hover:bg-gray-300 w-6 h-6 flex justify-center items-center p-2 rounded-full"
                onClick={() => handleRemoveCart(index)}
              >
                <Image src={close} alt="" width={16} height={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {data?.length !== 0 && <div className={styles.divider + ' mt-4'} />}
      <div className="mt-4">
        <div className="flex justify-between">
          <div className={styles.discount}>Cupón descuento?</div>
          <div
            className="duration-200 cursor-pointer hover:bg-gray-300 w-6 h-6 flex justify-center items-center p-1.5 rounded-full"
            onClick={handleClickExpand}
          >
            {expend ? (
              <Image src={up} alt="" width={15} height={15} />
            ) : (
              <Image src={down} alt="" width={15} height={15} />
            )}
          </div>
        </div>
        {expend && (
          <div className="flex justify-end mt-3">
            <input type="text" id="discount" name="number" className={styles.inputDiscount} />
          </div>
        )}
      </div>
      <div className={styles.divider + ' mt-4 mb-4'} />
      <div className="flex justify-between">
        <div className={styles.listDescription}>Total +IVA</div>
        <div className={styles.listPrice}>€&nbsp;{total.toFixed(2)}</div>
      </div>
      <div className="flex justify-between items-center mt-10">
        <div>
          <button className="flex justfy-center items-center duration-200 hover:bg-gray-300 px-1" onClick={handleBack}>
            <Image src={arrowLeftPink} alt="" width={12} height={10} />
            <div className={styles.backDescription + ' ml-1'}>Seguir comprando</div>
          </button>
        </div>
        <div>
          <button onClick={handleCheckout}>
            <div className={styles.payDescription + ' px-6 py-2 duration-200 hover:bg-gray-400'}>Pagar</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart
