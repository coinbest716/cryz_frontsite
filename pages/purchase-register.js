import React, { useEffect, useState } from 'react'
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from 'pages/purchase-register.module.scss'
import CommonButton from 'components/components/purchaseLogin/CommonButton'
import Link from 'next/link'
import router from 'next/router'
import ShoppingCart from 'components/components/purchaseLogin/ShoppingCart'
import shoppingCartData from 'assets/data/ShoppingCartData'

const Register = () => {
  const [cartData, setCartData] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPasssword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

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

  const handleChangeConfirmPassword = event => {
    setConfirmPassword(event.target.value)
  }

  const handleClickLogin = () => {
    console.log('handleClickLogin')
    router.push('/purchase-login')
  }

  const handleClickRegister = () => {
    console.log('handleClickRegister')
    router.push('/purchase-register')
  }

  const handleClickEnter = () => {
    console.log('handleClickEnter')
    router.push('/purchase')
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
                    <CommonButton handleClick={handleClickLogin} label={'LOGIN'} type={'outline'} />
                    <CommonButton handleClick={handleClickRegister} label={'REGISTRO'} type={'fill'} />
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
                  <div className="pt-5">
                    <input
                      type="password"
                      placeholder="Repetir contraseña"
                      className={styles.input}
                      value={confirmPassword}
                      onChange={handleChangeConfirmPassword}
                    />
                  </div>
                  <div className="flex justify-end pt-6">
                    <CommonButton handleClick={handleClickEnter} label={'Entrar'} type={'fill'} />
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
export default Register

Register.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
