import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import CommonButton from 'components/components/purchaseLogin/CommonButton'
import ShoppingCart from 'components/components/purchaseLogin/ShoppingCart'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/purchase-login.module.scss'

import LoginImage from 'assets/images/login.png'
import EyeCrossIcon from 'assets/images/eye-cross-gray.svg'
import EyeIcon from 'assets/images/eye-gray.svg'

import { Auth } from 'aws-amplify'
import toast from 'react-hot-toast'
import * as gtag from '../utils/gtag'
import { isMobile } from 'react-device-detect'

const PurchaseLogin = () => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)
  const [mobile, setIsMobile] = useState(null)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    setIsMobile(isMobile)
  }, [isMobile])

  useEffect(() => {
    if (isMounted === true) {
      dispatch({ type: 'set', isLoading: false })
    }
  }, [isMounted, dispatch])
  // loading part end #######################

  // variables
  const router = useRouter()
  const [authUser, setAuthUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authChallenge, setAuthChallenge] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [serviceId, setServiceId] = useState('')
  const [tab, setTab] = useState('')
  const [shoppingInfo, setShoppingInfo] = useState({
    image: '',
    description: '',
    price: '',
  })

  // handlers
  useEffect(() => {
    dispatch({ type: 'set', isLoading: true })
    Auth.currentAuthenticatedUser()
      .then(() => {
        setIsAuthenticated(true)
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
      .catch(() => {
        setIsAuthenticated(false)
      })
    dispatch({ type: 'set', isLoading: false })
    if (localStorage.getItem('remember')) {
      setRememberMe(Boolean(localStorage.getItem('remember')))
      setEmail(localStorage.getItem('email') || '')
      setPassword(localStorage.getItem('password') || '')
    }
  }, [])

  useEffect(() => {
    let _shoppingInfo = { ...shoppingInfo }
    if (router.query.service_id) {
      setServiceId(Number(router.query.service_id))
    }
    if (router.query.tab) {
      setTab(Number(router.query.tab))
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  useEffect(() => {
    if (isAuthenticated) {
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
    }
  }, [isAuthenticated])

  const handleSetRememberMe = () => {
    setRememberMe(!rememberMe)
  }

  const handleChangeEmail = event => {
    setEmail(event.target.value)
  }

  const handleChangePassword = event => {
    setPassword(event.target.value)
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

  const handleUpdatePassword = async () => {
    dispatch({ type: 'set', isLoading: true })
    await Auth.completeNewPassword(authUser, password)
      .then(response => {
        dispatch({ type: 'set', isLoading: false })
        setAuthUser(response)
        setAuthChallenge('')
        toast.success('Successfully update password')
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
      })
      .catch(error => {
        dispatch({ type: 'set', isLoading: false })
        toast.error(error.message)
      })
  }

  const handleClickGoogle = () => {
    dispatch({ type: 'set', isLoading: true })
    Auth.federatedSignIn({ provider: 'Google' })
    dispatch({ type: 'set', isLoading: false })
  }

  const handleClickFacebook = () => {
    dispatch({ type: 'set', isLoading: true })
    Auth.federatedSignIn({ provider: 'Facebook' })
    dispatch({ type: 'set', isLoading: false })
  }

  const handleClickPurchaseLogin = async () => {
    dispatch({ type: 'set', isLoading: true })
    await Auth.signIn(email, password)
      .then(response => {
        gtag.event({
          action: 'login',
          params: {},
        })
        setAuthUser(response)
        setAuthChallenge(response.challengeName)
        if (rememberMe) {
          localStorage.setItem('email', email)
          localStorage.setItem('password', password)
          localStorage.setItem('remember', rememberMe)
        } else {
          // localStorage.setItem('email', '')
          localStorage.setItem('password', '')
          localStorage.setItem('remember', rememberMe)
        }
        localStorage.setItem('email', email)
        if (response.challengeName !== 'NEW_PASSWORD_REQUIRED') {
          toast.success('Successfully Logged in')

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
        }
        dispatch({ type: 'set', isLoading: false })
      })
      .catch(error => {
        dispatch({ type: 'set', isLoading: false })
        toast.error(error.message)
        if (error.code === 'UserNotConfirmedException') {
          resendSignUp(email, password)
        }
      })
  }

  const resendSignUp = async (email, password) => {
    localStorage.setItem('email', email)
    localStorage.setItem('password', password)

    await Auth.resendSignUp(email).then(response => {
      router
        .push({
          pathname: '/purchase-register',
          query: {
            userConfirmed: false,
            service_id: router.query.service_id,
            tab: 0,
            image: router.query.image,
            description: router.query.description,
            price: router.query.price,
          },
        })
        .catch(error => {
          toast.error(error.message)
        })
    })
  }

  const handleSetShowPass = bool => {
    setShowPass(bool)
  }

  return (
    <div className={'flex flex-wrap justify-center'}>
      <div className={styles.container}>
        <div className={globalStyles.container + ' pt-20'}>
          <div className={'grid grid-cols-12 gap-4 '}>
            {authChallenge !== 'NEW_PASSWORD_REQUIRED' ? (
              mobile ? (
                <div className={'col-span-12 pt-20 pb-14'}>
                  <div className={'w-full px-16'}>
                    <Image src={LoginImage} alt="" width={484} height={416} />
                  </div>
                  <div className={styles.m_title + ' mt-7 px-5'}>Login para continuar con la compra</div>
                  <div className="flex justify-center items-center mt-5">
                    <div className={styles.text}>¿No tienes una cuenta?</div>
                    <div className={'font-bold ml-4 ' + styles.text} onClick={handleClickRegister}>
                      Regístrate
                    </div>
                  </div>
                  <div className={'flex justify-center'}>
                    <div className={'pt-3'} style={{ maxWidth: '300px', width: '100%' }}>
                      <div className={'pt-4'}>
                        <input
                          type="email"
                          placeholder="Email"
                          className={styles.m_input}
                          value={email}
                          onChange={handleChangeEmail}
                        />
                      </div>
                      <div className={'w-full relative flex items-center mt-6 ' + styles.inputArea}>
                        <input
                          type={showPass === true ? 'text' : 'password'}
                          placeholder="Contraseña"
                          className={styles.m_input}
                          value={password}
                          onChange={handleChangePassword}
                        />
                        <div className={'absolute right-3 cursor-pointer flex items-center'}>
                          {showPass === true ? (
                            <Image
                              src={EyeIcon}
                              alt=""
                              width={17}
                              height={17}
                              onClick={() => handleSetShowPass(false)}
                            />
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
                      <div className={'pt-2 flex justify-end'}>
                        <Link href={'/forgot-password'} passHref>
                          <p className={styles.forgetPassword}>Olvidaste contraseña</p>
                        </Link>
                      </div>
                      <div className={'flex justify-center items-center mt-12'}>
                        <button className={styles.m_enterButton} onClick={handleClickPurchaseLogin}>
                          Entrar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={'col-span-12 md:col-span-8 sm:col-span-12 pt-32 pb-44'}>
                  <div className={'px-10'}>
                    <div className={styles.title}>Regístrate para continuar con la compra</div>
                  </div>
                  <div className={'flex justify-center'}>
                    <div className={'pt-12'} style={{ maxWidth: '300px', width: '100%' }}>
                      <div className={'flex justify-start gap-4'}>
                        <CommonButton handleClick={handleClickLogin} label={'LOGIN'} type={'fill'} />
                        <CommonButton handleClick={handleClickRegister} label={'REGISTRO'} type={'outline'} />
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
                            <Image
                              src={EyeIcon}
                              alt=""
                              width={17}
                              height={17}
                              onClick={() => handleSetShowPass(false)}
                            />
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
                      <div className={'flex justify-between items-center pt-6'}>
                        <div className={'flex justify-between items-center'}>
                          <input
                            type="checkbox"
                            style={{ width: 20, height: 20 }}
                            onChange={handleSetRememberMe}
                            checked={rememberMe}
                          />
                          <p className={styles.remember} onChange={handleSetRememberMe}>
                            &nbsp;&nbsp;Recuerdame
                          </p>
                        </div>
                        <div>
                          <CommonButton handleClick={handleClickPurchaseLogin} label={'Entrar'} type={'fill'} />
                        </div>
                      </div>
                      <div className={'pt-2 flex justify-end'}>
                        <Link href={'/forgot-password'} passHref>
                          <p className={styles.forgetPassword}>Olvidaste contraseña</p>
                        </Link>
                      </div>
                      {/* <div className={'flex justify-between items-center pt-10'}>
                      <div className={styles.divider} />
                      <div className={styles.remember}>or</div>
                      <div className={styles.divider} />
                    </div>
                    <div className={'flex justify-between items-center pt-10'}>
                      <CommonButton handleClick={handleClickFacebook} label={'LOGIN CON FACEBOOK'} type={'facebook'} />
                    </div>
                    <div className={'flex justify-between items-center pt-5'}>
                      <CommonButton handleClick={handleClickGoogle} label={'LOGIN CON GOOGLE'} type={'google'} />
                    </div> */}
                    </div>
                  </div>
                </div>
              )
            ) : mobile ? (
              <div className={'col-span-12 pt-24 pb-14 px-10'}>
                <div className={'w-full px-6'}>
                  <Image src={LoginImage} alt="" width={484} height={416} />
                </div>
                <div>
                  <div className={styles.m_title}>Actualiza contraseña</div>
                  <div className={'w-full relative flex items-center mt-14 ' + styles.inputArea}>
                    <input
                      type={showPass === true ? 'text' : 'password'}
                      placeholder="Actualiza contraseña"
                      className={styles.m_input}
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
                  <div className={'mt-10 flex justify-center'}>
                    <button className={styles.m_enterButton} onClick={handleUpdatePassword}>
                      Entrar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={'col-span-12 md:col-span-8 sm:col-span-12 pt-32 pb-44'}>
                <div>
                  <div className={styles.updatePassword}>Actualiza contraseña</div>
                  <div className={'w-full relative flex items-center mt-5 ' + styles.inputArea}>
                    <input
                      type={showPass === true ? 'text' : 'password'}
                      placeholder="Actualiza contraseña"
                      className={'w-full h-full border border-white rounded bg-transparent py-1 pl-2 text-white pr-10'}
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
                  {/* <div className={'flex justify-between items-center pt-10'}>
                    <div className={styles.divider} />
                    <div className={styles.remember}>or</div>
                    <div className={styles.divider} />
                  </div>
                  <div className={'flex justify-between items-center pt-10'}>
                    <CommonButton handleClick={handleClickFacebook} label={'LOGIN CON FACEBOOK'} type={'facebook'} />
                  </div>
                  <div className={'flex justify-between items-center pt-5'}>
                    <CommonButton handleClick={handleClickGoogle} label={'LOGIN CON GOOGLE'} type={'google'} />
                  </div> */}
                  <div className={'mt-10 flex justify-end'}>
                    <button className={styles.enterButton} onClick={handleUpdatePassword}>
                      Entrar
                    </button>
                  </div>
                </div>
              </div>
            )}
            {mobile ? (
              <></>
            ) : (
              <div className={'col-span-12 md:col-span-4 sm:col-span-12'}>
                <ShoppingCart shoppingInfo={shoppingInfo} />
              </div>
            )}
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
