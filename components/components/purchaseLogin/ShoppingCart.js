import React, { useState } from 'react'
import Image from 'next/image'
import styles from './ShoppingCart.module.scss'
import close from 'public/images/close.svg'
import down from 'public/images/down.svg'
import up from 'public/images/up.svg'
import CommonButton from './CommonButton'
import AcceptCommonButtom from 'components/components/purchase/CommonButton'

const ShoppingCart = props => {
  const { data, handleRemoveCart, handleAcceptDiscount } = props
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
        <div className={'relative ' + styles.badge}>
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
                className="duration-200 hover:bg-gray-300 w-5 h-5 flex justify-center items-center p-1.5 rounded-full"
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
            className="duration-200 hover:bg-gray-300 w-5 h-5 flex justify-center items-center p-1 rounded-full"
            onClick={handleClickExpand}
          >
            {expend ? (
              <Image src={up} alt="" width={13} height={13} />
            ) : (
              <Image src={down} alt="" width={13} height={13} />
            )}
          </div>
        </div>
        {expend && (
          <div>
            <div className="flex justify-end mt-3">
              <input type="text" id="discount" name="number" className={styles.inputDiscount} />
            </div>
            <div className="flex justify-end mt-1">
              <AcceptCommonButtom label={'Aplicar'} handleClick={handleAcceptDiscount} type={'fill'} />
            </div>
          </div>
        )}
      </div>
      <div className={styles.divider + ' mt-4 mb-4'} />
      <div className="flex justify-between">
        <div className={styles.listDescription}>Total +IVA</div>
        <div className={styles.listPrice}>€&nbsp;{total.toFixed(2)}</div>
      </div>
    </div>
  )
}

export default ShoppingCart
