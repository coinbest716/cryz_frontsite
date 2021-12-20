import React, { useState, useEffect } from 'react'

// next components
import Image from 'next/image'
import router from 'next/router'

// custom components
import CommonButton from 'components/components/purchaseLogin/CommonButton'

// styles
import styles from 'pages/login/login.module.scss'
import globalStyles from 'styles/GlobalStyles.module.scss'

// images
import LoginImage from 'assets/images/login.png'
import CloseIcon from 'assets/images/close.svg'
import EyeCrossIcon from 'assets/images/eye-cross.svg'
import EyeIcon from 'assets/images/eye.svg'
import EyeCrossGrayIcon from 'assets/images/eye-cross-gray.svg'
import EyeGrayIcon from 'assets/images/eye-gray.svg'

import toast from 'react-hot-toast'

import { Auth } from 'aws-amplify'
import ReactLoading from 'react-loading'
import * as gtag from '../../utils/gtag'
import { isMobile } from 'react-device-detect'

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authUser, setAuthUser] = useState(null)
  const [authChallenge, setAuthChallenge] = useState('')

  const [progressStatus, setProgressStatus] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPass, setShowPass] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [mobile, setIsMobile] = useState(null)

  useEffect(() => {
    setProgressStatus(true)
    Auth.currentAuthenticatedUser()
      .then(() => {
        setIsAuthenticated(true)
        router.push('/dashboard')
      })
      .catch(() => {
        setIsAuthenticated(false)
      })
    setProgressStatus(false)
    if (localStorage.getItem('remember')) {
      setRememberMe(Boolean(localStorage.getItem('remember')))
      setEmail(localStorage.getItem('email') || '')
      setPassword(localStorage.getItem('password') || '')
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated])

  useEffect(() => {
    setIsMobile(isMobile)
  }, [isMobile])

  const handleChangeEmail = event => {
    setEmail(event.target.value)
  }
  const handleChangePassword = event => {
    setPassword(event.target.value)
  }

  const handleSetShowPass = bool => {
    setShowPass(bool)
  }

  const handleSetRememberMe = () => {
    setRememberMe(!rememberMe)
  }

  const handleClickLogin = async () => {
    setProgressStatus(true)
    if (email === '' || password === '') {
      toast.error('You should input email or password!')
      return
    }
    await Auth.signIn(email, password)
      .then(response => {
        gtag.event({
          action: 'login',
          params: {},
        })

        console.log(response)
        setProgressStatus(false)
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
          router.push('/dashboard')
        }
      })
      .catch(error => {
        toast.error(error.message)
        setProgressStatus(false)
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
          pathname: '/register',
          query: {
            userConfirmed: false,
          },
        })
        .catch(error => {
          toast.error(error.message)
        })
    })
  }

  const handleUpdatePassword = async () => {
    setProgressStatus(true)
    await Auth.completeNewPassword(authUser, password)
      .then(response => {
        setProgressStatus(false)
        setAuthUser(response)
        setAuthChallenge('')
        toast.success('Successfully update password')
        router.push('/dashboard')
      })
      .catch(error => {
        setProgressStatus(false)
        toast.error(error.message)
      })
  }

  const googleLogin = () => {
    setProgressStatus(true)
    Auth.federatedSignIn({ provider: 'Google' })
    setProgressStatus(false)
  }
  const facebookLogin = () => {
    setProgressStatus(true)
    Auth.federatedSignIn({ provider: 'Facebook' })
    setProgressStatus(false)
  }

  return (
    <div className={'relative'}>
      <div className={'w-full h-screen grid grid-cols-12'}>
        {mobile ? (
          <div className={'col-span-12 p-10 pt-24 flex justify-center items-center ' + styles.whiteArea}>
            <div className={styles.whiteAreaContent}>
              <div styles={'w-full'}>
                <Image src={LoginImage} alt="" width={484} height={416} />
              </div>
              <div className={'w-full text-center ' + styles.title}>LOG IN</div>
              {authChallenge !== 'NEW_PASSWORD_REQUIRED' ? (
                <div className="flex justify-center items-center mt-4">
                  <div className={styles.text}>¿No tienes una cuenta?</div>
                  <div className={'font-bold ml-4 ' + styles.text} onClick={() => router.push('/register')}>
                    Regístrate
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ) : (
          <div
            className={
              'col-span-12 lg:col-span-6 md:col-span-6 flex flex-wrap justify-center items-center ' + styles.whiteArea
            }
          >
            <div className={styles.whiteAreaContent}>
              <div styles={'w-full'}>
                <Image src={LoginImage} alt="" width={484} height={416} />
              </div>
              <div className={'w-full text-center ' + styles.title}>El cambio comienza aqui</div>
              <div className={'w-full text-center ' + styles.text}>
                Siéntete mejor y con mayor calidad de vida desde ahora mismo.
              </div>
            </div>
          </div>
        )}
        {authChallenge !== 'NEW_PASSWORD_REQUIRED' ? (
          mobile ? (
            <div
              className={
                'col-span-12 flex lg:col-span-6 md:col-span-6 flex-wrap justify-center items-center relative ' +
                styles.whiteArea
              }
            >
              <div className={styles.grayAreaContent}>
                {/* email input */}
                <div className={'w-full mt-2 ' + styles.inputArea}>
                  <input
                    type="text"
                    placeholder="Email"
                    className={'w-full h-full border border-gray-400 rounded bg-transparent py-1 px-2 text-gray-400'}
                    value={email}
                    onChange={handleChangeEmail}
                  />
                </div>
                {/* password input */}
                <div className={'w-full relative flex items-center mt-8 ' + styles.inputArea}>
                  <input
                    type={showPass === true ? 'text' : 'password'}
                    placeholder="Contraseña"
                    className={
                      'w-full h-full border border-gray-400 rounded bg-transparent py-1 pl-2 text-gray-400 pr-10'
                    }
                    value={password}
                    onChange={handleChangePassword}
                  />
                  <div className={'absolute right-3 cursor-pointer flex items-center'}>
                    {showPass === true ? (
                      <Image src={EyeGrayIcon} alt="" width={17} height={17} onClick={() => handleSetShowPass(false)} />
                    ) : (
                      <Image
                        src={EyeCrossGrayIcon}
                        alt=""
                        width={17}
                        height={17}
                        onClick={() => handleSetShowPass(true)}
                      />
                    )}
                  </div>
                </div>
                {/* login button part */}
                <div className={'mt-5 '}>
                  <div
                    className={'mt-3.5 flex justify-end items-center text-gray-400 ' + styles.m_forgotPass}
                    onClick={() => router.push('forgot-password')}
                  >
                    Olvidaste contraseña
                  </div>
                  <div className="flex justify-center mt-10 mb-20">
                    <button className={styles.m_enterButton} onClick={handleClickLogin} disabled={progressStatus}>
                      Entrar
                    </button>
                  </div>
                </div>
                {/* ------------------- or ------------------- part */}
                {/* <div className={'mt-11 flex justify-between items-center'}>
                <div className={styles.line} />
                <div className={styles.orText}>or</div>
                <div className={styles.line} />
              </div> */}
                {/* facebook button */}
                {/* <div className={'mt-11'}>
                <CommonButton handleClick={facebookLogin} label={'LOGIN CON FACEBOOK'} type={'facebook'} />
              </div> */}
                {/* google button */}
                {/* <div className={'mt-6'}>
                <CommonButton handleClick={googleLogin} label={'LOGIN CON GOOGLE'} type={'google'} />
              </div> */}
              </div>
            </div>
          ) : (
            <div
              className={
                'col-span-12 flex lg:col-span-6 md:col-span-6 flex-wrap justify-center items-center relative ' +
                styles.grayArea
              }
            >
              <div className={styles.closeButton}>
                <button
                  className={'duration-200 hover:bg-gray-300 rounded-full p-3 flex justify-center items-center'}
                  onClick={() => router.push('/')}
                >
                  <Image src={CloseIcon} alt="" width={19} height={20} />
                </button>
              </div>
              <div className={styles.grayAreaContent}>
                <div className={'w-full flex justify-start'}>
                  <button className={styles.loginButton} onClick={() => router.push('/login')}>
                    LOGIN
                  </button>
                  <button className={styles.registerButton} onClick={() => router.push('/register')}>
                    REGISTRO
                  </button>
                </div>
                {/* email input */}
                <div className={'w-full mt-9 ' + styles.inputArea}>
                  <input
                    type="text"
                    placeholder="Email"
                    className={'w-full h-full border border-white rounded bg-transparent py-1 px-2 text-white'}
                    value={email}
                    onChange={handleChangeEmail}
                  />
                </div>
                {/* password input */}
                <div className={'w-full relative flex items-center mt-5 ' + styles.inputArea}>
                  <input
                    type={showPass === true ? 'text' : 'password'}
                    placeholder="Contraseña"
                    className={'w-full h-full border border-white rounded bg-transparent py-1 pl-2 text-white pr-10'}
                    value={password}
                    onChange={handleChangePassword}
                  />
                  <div className={'absolute right-3 cursor-pointer'}>
                    {showPass === true ? (
                      <Image src={EyeIcon} alt="" width={17} height={17} onClick={() => handleSetShowPass(false)} />
                    ) : (
                      <Image src={EyeCrossIcon} alt="" width={17} height={17} onClick={() => handleSetShowPass(true)} />
                    )}
                  </div>
                </div>
                {/* login button part */}
                <div className={'mt-5 flex justify-between items-center'}>
                  <div>
                    <label className={'inline-flex items-center cursor-pointer'}>
                      <input
                        type="checkbox"
                        className={'form-checkbox cursor-pointer ' + styles.checkbox}
                        onChange={() => handleSetRememberMe()}
                        checked={rememberMe}
                      />
                      <span className={'ml-2'} onChange={() => handleSetRememberMe()}>
                        Recuérdame
                      </span>
                    </label>
                  </div>
                  <div>
                    <button className={styles.enterButton} onClick={handleClickLogin} disabled={progressStatus}>
                      Entrar
                    </button>
                  </div>
                </div>
                {/* forgot password part */}
                <div
                  className={'mt-3.5 flex justify-end items-center ' + styles.forgotPass}
                  onClick={() => router.push('forgot-password')}
                >
                  Olvidaste contraseña
                </div>
                {/* ------------------- or ------------------- part */}
                {/* <div className={'mt-11 flex justify-between items-center'}>
                <div className={styles.line} />
                <div className={styles.orText}>or</div>
                <div className={styles.line} />
              </div> */}
                {/* facebook button */}
                {/* <div className={'mt-11'}>
                <CommonButton handleClick={facebookLogin} label={'LOGIN CON FACEBOOK'} type={'facebook'} />
              </div> */}
                {/* google button */}
                {/* <div className={'mt-6'}>
                <CommonButton handleClick={googleLogin} label={'LOGIN CON GOOGLE'} type={'google'} />
              </div> */}
              </div>
            </div>
          )
        ) : mobile ? (
          <div
            className={
              'w-full col-span-12 lg:col-span-6 md:col-span-6 flex flex-wrap flex justify-center items-center ' +
              styles.whiteArea
            }
          >
            <div>
              <div className={styles.m_updatePassword}>Actualiza contraseña</div>
              <div className={'w-full relative flex items-center mt-5 ' + styles.inputArea}>
                <input
                  type={showPass === true ? 'text' : 'password'}
                  placeholder="Actualiza contraseña"
                  className={
                    'w-full h-full border border-gray-400 rounded bg-transparent py-1 pl-2 text-gray-400 pr-10 flex items-center'
                  }
                  value={password}
                  onChange={handleChangePassword}
                />
                <div className={'absolute right-3 cursor-pointer flex items-center'}>
                  {showPass === true ? (
                    <Image src={EyeGrayIcon} alt="" width={17} height={17} onClick={() => handleSetShowPass(false)} />
                  ) : (
                    <Image
                      src={EyeCrossGrayIcon}
                      alt=""
                      width={17}
                      height={17}
                      onClick={() => handleSetShowPass(true)}
                    />
                  )}
                </div>
              </div>
              <div className={'mt-10 mb-20 flex justify-center'}>
                <button className={styles.m_enterButton} onClick={handleUpdatePassword}>
                  Entrar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={
              'w-full col-span-12 lg:col-span-6 md:col-span-6 flex flex-wrap flex justify-center items-center ' +
              styles.grayArea
            }
          >
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
                <div className={'absolute right-3 cursor-pointer'}>
                  {showPass === true ? (
                    <Image src={EyeIcon} alt="" width={17} height={17} onClick={() => handleSetShowPass(false)} />
                  ) : (
                    <Image src={EyeCrossIcon} alt="" width={17} height={17} onClick={() => handleSetShowPass(true)} />
                  )}
                </div>
              </div>
              <div className={'mt-10 flex justify-end'}>
                <button className={styles.enterButton} onClick={handleUpdatePassword}>
                  Entrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {progressStatus && (
        <div className={globalStyles.loadingArea}>
          <div className={globalStyles.loading}>
            <ReactLoading type={'spinningBubbles'} color="#006600" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
