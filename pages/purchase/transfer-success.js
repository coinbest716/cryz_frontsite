import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import ShoppingCart from 'components/Purchase/ShoppingCart'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './transfer-success.module.scss'

// json data
import shoppingCartData from 'assets/data/ShoppingCartData'

const TransferSuccess = () => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (isMounted === true) {
      dispatch({ type: 'set', isLoading: false })
    }
  }, [isMounted, dispatch])
  // loading part end #######################

  // variables
  const [cartData, setCartData] = useState([])

  // handlers
  useEffect(() => {
    setCartData(shoppingCartData)
  }, [])

  const handleRemoveCart = index => {
    let array = [...cartData]
    array.splice(index, 1)
    setCartData(array)
  }

  return (
    <div className={'flex flex-wrap justify-center'}>
      <div className={styles.container}>
        <div className={globalStyles.container + ' pt-20'}>
          <div className={'grid grid-cols-12 gap-4 '}>
            <div className={'col-span-12 md:col-span-8 sm:col-span-12 p-5 pt-32 pb-44'}>
              <div className={styles.title}>GRACIAS, tu pedido ha sido recibido.</div>
              <div className={'pt-12'}>
                <div className={'flex'}>
                  <p className={'font-bold ' + styles.detail}>NÚMERO DE PEDIDO:</p>
                  <p className={styles.detail}>&nbsp;&nbsp;&nbsp;#45486</p>
                </div>
                <div className={'flex pt-3'}>
                  <p className={'font-bold ' + styles.detail}>FECHA: </p>
                  <p className={styles.detail}>&nbsp;&nbsp;&nbsp;12 / 11 /2022</p>
                </div>
                <div className={'flex pt-3'}>
                  <p className={'font-bold ' + styles.detail}>TOTAL:</p>
                  <p className={styles.detail}>&nbsp;&nbsp;&nbsp;200€</p>
                </div>
                <div className={'flex pt-3'}>
                  <p className={'font-bold ' + styles.detail}>MÉTODO PAGO:</p>
                  <p className={styles.detail}>&nbsp;&nbsp;&nbsp;TRANSFERENCIA BANCARIA</p>
                </div>
              </div>
              <div className={'pt-10 ' + styles.description}>
                Para agilizar tu envío, puede hacernos llegar el justificante de la transferencia indicando el número de
                pedido a la siguiente dirección de email: administracion@crysdyazandco.com
                <br /> <br />
                Una vez recibida la justificación, se pondrá su pedido en proceso
              </div>
              <div className={'pt-10 font-bold ' + styles.detail}>Detalles bancarios</div>
              <div className={'mt-4 px-6 py-4 ' + styles.detailBank}>
                <div className={'flex'}>
                  <p className={'font-bold ' + styles.detail}>NOMBRE:</p>
                  <p className={styles.detail}>&nbsp;&nbsp;&nbsp;CRODY SALUD</p>
                </div>
                <div className={'flex pt-3'}>
                  <p className={'font-bold ' + styles.detail}>BANCO:</p>
                  <p className={styles.detail}>&nbsp;&nbsp;&nbsp;LA CAIXA</p>
                </div>
                <div className={'flex pt-3'}>
                  <p className={'font-bold ' + styles.detail}>NºCUENTA: </p>
                  <p className={styles.detail}>&nbsp;&nbsp;&nbsp;2100 9201 4202 0013 0103</p>
                </div>
                <div className={'flex pt-3'}>
                  <p className={'font-bold ' + styles.detail}>IBAN: </p>
                  <p className={styles.detail}>&nbsp;&nbsp;&nbsp;ES27</p>
                </div>
              </div>
            </div>
            <div className={'col-span-12 md:col-span-4 sm:col-span-12'}>
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
