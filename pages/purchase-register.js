import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'
import Image from 'next/image'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import CommonButton from 'components/components/purchaseLogin/CommonButton'
import ShoppingCart from 'components/components/purchaseLogin/ShoppingCart'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/purchase-register.module.scss'

import EyeCrossIcon from 'assets/images/eye-cross-gray.svg'
import EyeIcon from 'assets/images/eye-gray.svg'
import toast from 'react-hot-toast'

// json data
import shoppingCartData from 'assets/data/ShoppingCartData'

const Register = () => {
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
  const router = useRouter()
  const [cartData, setCartData] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showPassConfirm, setShowPassConfirm] = useState(false)

  const [userConfirmed, setUserConfirmed] = useState(null)
  const [verifyCode, setVerifyCode] = useState('')

  const [shoppingInfo, setShoppingInfo] = useState({
    image: '',
    description: '',
    price: '',
  })
  // handlers
  useEffect(() => {
    setCartData(shoppingCartData)
  }, [])

  useEffect(() => {
    let _shoppingInfo = { ...shoppingInfo }
    if (router.query.image) {
      _shoppingInfo = { ..._shoppingInfo, image: decodeURIComponent(JSON.parse(`"${router.query.image}"`)) }
    }
    if (router.query.description) {
      _shoppingInfo = { ..._shoppingInfo, description: decodeURIComponent(JSON.parse(`"${router.query.description}"`)) }
    }
    if (router.query.price) {
      _shoppingInfo = { ..._shoppingInfo, price: Number(router.query.price) }
    }
    setShoppingInfo(_shoppingInfo)

    if (router.query.userConfirmed) {
      setUserConfirmed(Boolean(router.query.userConfirmed))
      setEmail(localStorage.getItem('email'))
      setPassword(localStorage.getItem('password'))
    }
  }, [router.query])

  const handleRemoveCart = index => {
    let array = [...cartData]
    array.splice(index, 1)
    setCartData(array)
  }

  const handleChangeEmail = event => {
    setEmail(event.target.value)
  }

  const handleChangePassword = event => {
    setPassword(event.target.value)
  }

  const handleChangeConfirmPassword = event => {
    setConfirmPassword(event.target.value)
  }

  const handleClickLogin = () => {
    router.push({
      pathname: '/purchase-login',
      query: {
        service_id: router.query.service_id,
        tab: 0,
        image: router.query.image,
        description: router.query.description,
        price: router.query.price,
      },
    })
  }

  const handleClickRegister = () => {
    router.push({
      pathname: '/purchase-register',
      query: {
        service_id: router.query.service_id,
        tab: 0,
        image: router.query.image,
        description: router.query.description,
        price: router.query.price,
      },
    })
  }

  const handleClickPurchaseRegister = async () => {
    if (password !== confirmPassword) {
      toast.error('Please confirm the password!')
      return
    }
    dispatch({ type: 'set', isLoading: true })
    await Auth.signUp({
      username: email,
      password: password,
    })
      .then(response => {
        console.log(response)
        dispatch({ type: 'set', isLoading: false })
        setUserConfirmed(response.userConfirmed)
        toast.success('Signup Successfully')
      })
      .catch(error => {
        console.log('error signing up:', error)
        toast.error(error.message)
        dispatch({ type: 'set', isLoading: false })
        if (error.code === 'UsernameExistsException') {
          dispatch({ type: 'set', isLoading: false })
          router.push({
            pathname: '/purchase-login',
            query: {
              service_id: router.query.service_id,
              tab: 0,
              image: router.query.image,
              description: router.query.description,
              price: router.query.price,
            },
          })
        } else {
          dispatch({ type: 'set', isLoading: false })
          toast.error(error.message)
        }
      })
  }

  const handleSetShowPass = bool => {
    setShowPass(bool)
  }
  const handleSetShowPassConfirm = bool => {
    setShowPassConfirm(bool)
  }

  const handleChangeVerifyCode = event => {
    setVerifyCode(event.target.value)
  }

  const handleVerifyCode = async () => {
    dispatch({ type: 'set', isLoading: true })

    await Auth.confirmSignUp(email, verifyCode)
      .then(response => {
        console.log(response)
        toast.success('Successfully confirmed signed up')
        Auth.signIn(email, password).then(response => {
          console.log('register : ', response)
          toast.success('Successfully Logged in')
          localStorage.setItem('email', email)
          dispatch({ type: 'set', isLoading: false })

          router.push({
            pathname: '/purchase',
            query: {
              service_id: router.query.service_id,
              tab: 0,
              image: router.query.image,
              description: router.query.description,
              price: router.query.price,
            },
          })
        })
      })
      .catch(error => {
        toast.error(error.message)
        dispatch({ type: 'set', isLoading: false })
      })
  }

  return (
    <div className={'flex flex-wrap justify-center'}>
      <div className={styles.container}>
        <div className={globalStyles.container + ' pt-20'}>
          <div className={'grid grid-cols-12 gap-4 '}>
            <div className={'col-span-12 md:col-span-8 sm:col-span-12 pt-32 pb-44'}>
              <div className={'px-10'}>
                <div className={styles.title}>Regístrate para continuar con la compra</div>
              </div>
              {userConfirmed === null ? (
                <div className={'flex justify-center'}>
                  <div className={'pt-12'} style={{ maxWidth: '300px', width: '100%' }}>
                    <div className={'flex justify-start gap-4'}>
                      <CommonButton handleClick={handleClickLogin} label={'LOGIN'} type={'outline'} />
                      <CommonButton handleClick={handleClickRegister} label={'REGISTRO'} type={'fill'} />
                    </div>
                    <div className={'pt-9'}>
                      <input
                        type="email"
                        placeholder="Email"
                        className={styles.input}
                        value={email}
                        onChange={handleChangeEmail}
                      />
                    </div>
                    <div className={'w-full relative flex items-center mt-5 ' + styles.inputArea}>
                      <input
                        type={showPass === true ? 'text' : 'password'}
                        placeholder="Contraseña"
                        className={styles.input}
                        value={password}
                        onChange={handleChangePassword}
                      />
                      <div className={'absolute right-3 cursor-pointer flex items-center'}>
                        {showPass === true ? (
                          <Image src={EyeIcon} alt="" width={17} height={17} onClick={() => handleSetShowPass(false)} />
                        ) : (
                          <Image
                            src={EyeCrossIcon}
                            alt=""
                            width={17}
                            height={17}
                            onClick={() => handleSetShowPass(true)}
                          />
                        )}
                      </div>
                    </div>
                    <div className={'w-full relative flex items-center mt-5 ' + styles.inputArea}>
                      <input
                        type={showPassConfirm === true ? 'text' : 'password'}
                        placeholder="Repetir contraseña"
                        className={styles.input}
                        value={confirmPassword}
                        onChange={handleChangeConfirmPassword}
                      />
                      <div className={'absolute right-3 cursor-pointer flex items-center'}>
                        {showPassConfirm === true ? (
                          <Image
                            src={EyeIcon}
                            alt=""
                            width={17}
                            height={17}
                            onClick={() => handleSetShowPassConfirm(false)}
                          />
                        ) : (
                          <Image
                            src={EyeCrossIcon}
                            alt=""
                            width={17}
                            height={17}
                            onClick={() => handleSetShowPassConfirm(true)}
                          />
                        )}
                      </div>
                    </div>
                    <div className={'flex justify-end pt-6'}>
                      <CommonButton handleClick={handleClickPurchaseRegister} label={'Entrar'} type={'fill'} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className={'flex justify-center items-center'}>
                  <div>
                    <div className={styles.updatePassword}>Verifica tu código.</div>
                    <div className={'w-full relative flex items-center mt-5 ' + styles.inputArea}>
                      <input
                        type="text"
                        autoComplete="new-password"
                        placeholder="Verifica tu código"
                        className={styles.input}
                        value={verifyCode}
                        onChange={handleChangeVerifyCode}
                      />
                    </div>
                    <div className={'flex justify-end pt-6'}>
                      <CommonButton handleClick={handleVerifyCode} label={'Entrar'} type={'fill'} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={'col-span-12 md:col-span-4 sm:col-span-12'}>
              <ShoppingCart shoppingInfo={shoppingInfo} />
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
