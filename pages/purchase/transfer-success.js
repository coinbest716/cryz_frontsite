import React, { useEffect, useState } from 'react'
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyles.module.scss'
import styles from './transfer-success.module.scss'
import Image from 'next/image'
import news from 'public/images/news.svg'
import ShoppingCart from 'components/components/purchaseLogin/ShoppingCart'
import shoppingCartData from 'assets/data/ShoppingCartData'

const TransferSuccess = () => {
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    setCartData(shoppingCartData)
  }, [])

  const handleRemoveCart = index => {
    let array = [...cartData]
    array.splice(index, 1)
    setCartData(array)
  }

  return (
    <div className="flex flex-wrap justify-center">
      <div className={styles.container}>
        <div className={globlaStyle.container + ' pt-20'}>
          <div className="grid grid-cols-12 gap-4 ">
            <div className="col-span-12 md:col-span-8 sm:col-span-12 p-5 pt-32 pb-44">
              <div className={styles.title}>GRACIAS, tu pedido ha sido recibido.</div>
              <div className="pt-12">
                <div className="flex">
                  <p className={'font-bold ' + styles.detail}>NÚMERO DE PEDIDO:</p>
                  <p className={styles.detail}>&nbsp;&nbsp;&nbsp;#45486</p>
                </div>
                <div className="flex pt-3">
                  <p className={'font-bold ' + styles.detail}>FECHA: </p>
                  <p className={styles.detail}>&nbsp;&nbsp;&nbsp;12 / 11 /2022</p>
                </div>
                <div className="flex pt-3">
                  <p className={'font-bold ' + styles.detail}>TOTAL:</p>
                  <p className={styles.detail}>&nbsp;&nbsp;&nbsp;200€</p>
                </div>
                <div className="flex pt-3">
                  <p className={'font-bold ' + styles.detail}>MÉTODO PAGO:</p>
                  <p className={styles.detail}>&nbsp;&nbsp;&nbsp;TRANSFERENCIA BANCARIA</p>
                </div>
              </div>
              <div className={'pt-10 ' + styles.description}>
                Para agilizar el envio puede hacernos llegar el justificante de l transferencia indicando el número de
                pedido. la siguiente dirección de email: administracion@crysdyazandco.com
                <br /> <br />
                Una vez recibido el justificante su pedido aparecerá en proceso.
              </div>
              <div className={'pt-10 font-bold ' + styles.detail}>Detalles bancarios</div>
              <div className={'mt-4 px-6 py-4 ' + styles.detailBank}>
                <div className="flex">
                  <p className={'font-bold ' + styles.detail}>BANCO:</p>
                  <p className={styles.detail}>&nbsp;&nbsp;&nbsp;LA CAIXA</p>
                </div>
                <div className="flex pt-3">
                  <p className={'font-bold ' + styles.detail}>NºCUENTA: </p>
                  <p className={styles.detail}>&nbsp;&nbsp;&nbsp;2100 9201 4202 0013 0103</p>
                </div>
                <div className="flex pt-3">
                  <p className={'font-bold ' + styles.detail}>IBAN: </p>
                  <p className={styles.detail}>&nbsp;&nbsp;&nbsp;ES27</p>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 sm:col-span-12">
              <ShoppingCart data={cartData} handleRemoveCart={handleRemoveCart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TransferSuccess

TransferSuccess.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
