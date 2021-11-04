import React, { useEffect, useState } from 'react'
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyles.module.scss'
import styles from 'pages/purchase-login.module.scss'
import CommonButton from 'components/components/purchaseLogin/CommonButton'
import Link from 'next/link'
import router from 'next/router'
import ShoppingCart from 'components/components/purchaseLogin/ShoppingCart'
import shoppingCartData from 'assets/data/ShoppingCartData'

const PurchaseLogin = () => {
  const [cartData, setCartData] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPasssword] = useState('')

  useEffect(() => {
    setCartData(shoppingCartData)
  }, [])

  const handleRemoveCart = index => {
    let array = [...cartData]
    array.splice(index, 1)
    setCartData(array)
  }

  const handleChangeEmail = event => {
    setEmail(event.target.value)
  }

  const handleChangePassword = event => {
    setPasssword(event.target.value)
  }

  const handleClickLogin = () => {
    console.log('handleClickLogin', email, password)
    router.push('/purchase-login')
  }

  const handleClickRegister = () => {
    console.log('handleClickRegister')
    router.push('/purchase-register')
  }

  const handleClickGoogle = () => {
    console.log('handleClickGoogle')
  }

  const handleClickFacebook = () => {
    console.log('handleClickFacebook')
  }

  const handleClickEnter = () => {
    router.push('/purchase#address')
  }

  return (
    <div className="flex flex-wrap justify-center">
      <div className={styles.container}>
        <div className={globlaStyle.container + ' pt-20'}>
          <div className="grid grid-cols-12 gap-4 ">
            <div className="col-span-12 md:col-span-8 sm:col-span-12 pt-32 pb-44">
              <div className="px-10">
                <div className={styles.title}>Regístrate para continuar con la compra</div>
              </div>
              <div className="flex justify-center">
                <div className="pt-12" style={{ maxWidth: '300px', width: '100%' }}>
                  <div className="flex justify-start gap-4">
                    <CommonButton handleClick={handleClickLogin} label={'LOGIN'} type={'fill'} />
                    <CommonButton handleClick={handleClickRegister} label={'REGISTRO'} type={'outline'} />
                  </div>
                  <div className="pt-9">
                    <input
                      type="email"
                      placeholder="Email"
                      className={styles.input}
                      value={email}
                      onChange={handleChangeEmail}
                    />
                  </div>
                  <div className="pt-5">
                    <input
                      type="password"
                      placeholder="Contraseña"
                      className={styles.input}
                      value={password}
                      onChange={handleChangePassword}
                    />
                  </div>
                  <div className="flex justify-between items-center pt-6">
                    <div className="flex justify-between items-center">
                      <input type="checkbox" style={{ width: 20, height: 20 }} />
                      <p className={styles.remember}>&nbsp;&nbsp;Recuerdame</p>
                    </div>
                    <div>
                      <CommonButton handleClick={handleClickEnter} label={'Entrar'} type={'fill'} />
                    </div>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <Link href={'/forgot-password'} passHref>
                      <p className={styles.forgetPassword}>Olvidaste contraseña</p>
                    </Link>
                  </div>
                  <div className="flex justify-between items-center pt-10">
                    <div className={styles.divider} />
                    <div className={styles.remember}>or</div>
                    <div className={styles.divider} />
                  </div>
                  <div className="flex justify-between items-center pt-10">
                    <CommonButton handleClick={handleClickFacebook} label={'LOGIN CON FACEBOOK'} type={'facebook'} />
                  </div>
                  <div className="flex justify-between items-center pt-5">
                    <CommonButton handleClick={handleClickGoogle} label={'LOGIN CON GOOGLE'} type={'google'} />
                  </div>
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
export default PurchaseLogin

PurchaseLogin.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
