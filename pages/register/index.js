import React, { useState, useEffect } from 'react'
import { Auth, signInButton } from 'aws-amplify'
// next components
import Image from 'next/image'
import { useRouter } from 'next/router'

// styles
import styles from 'pages/register/Register.module.scss'
import globalStyles from 'styles/GlobalStyles.module.scss'

// images
import RegisterImage from 'assets/images/register.png'
import CloseIcon from 'assets/images/close.svg'
import EyeCrossIcon from 'assets/images/eye-cross.svg'
import EyeIcon from 'assets/images/eye.svg'
import EyeCrossGrayIcon from 'assets/images/eye-cross-gray.svg'
import EyeGrayIcon from 'assets/images/eye-gray.svg'
import ConfirmImage from 'assets/images/confirm_code.png'

import toast from 'react-hot-toast'
import ReactLoading from 'react-loading'
import * as gtag from '../../utils/gtag'

const Register = () => {
  // variables
  const router = useRouter()
  const [progressStatus, setProgressStatus] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userConfirmed, setUserConfirmed] = useState(null)
  const [verifyCode, setVerifyCode] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showRepeatPass, setShowRepeatPass] = useState(false)
  const [viewport, setViewport] = useState('desktop') // mobile, ipad, desktop

  // handlers
  useEffect(() => {
    if (window.innerWidth > 1024) {
      setViewport('desktop')
    } else if (window.innerWidth === 1024) {
      setViewport('ipad')
    } else {
      setViewport('mobile')
    }
  }, [])

  useEffect(() => {
    const resizeFunction = () => {
      if (window.innerWidth > 1024) {
        setViewport('desktop')
      } else if (window.innerWidth === 1024) {
        setViewport('ipad')
      } else {
        setViewport('mobile')
      }
    }
    window.addEventListener('resize', resizeFunction)
  }, [])

  useEffect(() => {
    if (router.query.userConfirmed) {
      setUserConfirmed(Boolean(router.query.userConfirmed))
      setEmail(localStorage.getItem('email'))
      setPassword(localStorage.getItem('password'))
    }
  }, [router.query])

  const handleSetShowPass = bool => {
    setShowPass(bool)
  }

  const handleSetShowRepeatPass = bool => {
    setShowRepeatPass(bool)
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

  const handleChangeVerifyCode = event => {
    setVerifyCode(event.target.value)
  }

  const handleVerifyCode = async () => {
    setProgressStatus(true)

    await Auth.confirmSignUp(email, verifyCode)
      .then(response => {
        console.log(response)
        toast.success('Successfully confirmed signed up')
        Auth.signIn(email, password).then(response => {
          console.log('register : ', response)
          toast.success('Successfully Logged in')
          setProgressStatus(false)
          localStorage.setItem('email', email)
          router.push('/dashboard')
        })
        setProgressStatus(false)
      })
      .catch(error => {
        toast.error(error.message)
        setProgressStatus(false)
      })
  }

  const handleClickRegister = async () => {
    if (password !== confirmPassword) {
      toast.error('Please confirm the password!')
      return
    }
    setProgressStatus(true)
    await Auth.signUp({
      username: email,
      password: password,
    })
      .then(response => {
        gtag.event({
          action: 'sign_up',
          params: {},
        })
        console.log(response)
        setProgressStatus(false)
        setUserConfirmed(response.userConfirmed)
        toast.success('Signup Successfully')
      })
      .catch(error => {
        console.log('error signing up:', error)
        toast.error(error.message)
        if (error.code === 'UsernameExistsException') {
          setProgressStatus(false)
          router.push('/login')
        } else {
          setProgressStatus(false)
        }
      })
  }

  return (
    <div className={'relative'}>
      <div className={'w-full h-screen grid grid-cols-12'}>
        {viewport === 'mobile' ? (
          userConfirmed ? (
            <div className={'col-span-12 pt-1 flex justify-center items-center ' + styles.confirmAreaContent}>
              <div className={styles.whiteAreaContent + ' text-center'}>
                <div className={'px-24 flex justify-center '}>
                  <Image src={ConfirmImage} alt="" width={342} height={345} />
                </div>
                <div className={styles.verifyString}>Verifica tu código</div>
              </div>
            </div>
          ) : (
            <div className={'col-span-12 pt-20 pb-2 flex justify-center items-center ' + styles.whiteArea}>
              <div className={styles.whiteAreaContent + ' text-center'}>
                <div className={'px-20 flex justify-center '}>
                  <Image src={RegisterImage} alt="" width={342} height={415} />
                </div>
              </div>
            </div>
          )
        ) : (
          <div
            className={
              'w-full col-span-12 lg:col-span-6 md:col-span-6 flex flex-wrap justify-center items-center ' +
              styles.whiteArea
            }
          >
            <div className={styles.whiteAreaContent}>
              <div styles={'w-full flex justify-center'}>
                <Image src={RegisterImage} alt="" width={342} height={415} />
              </div>
              <div className={'w-full text-center ' + styles.title}>El cambio comienza aqui</div>
              <div className={'w-full text-center ' + styles.text}>
                Siéntete mejor y con mayor calidad de vida desde ahora mismo.
              </div>
            </div>
          </div>
        )}
        {viewport === 'mobile' ? (
          <div
            className={
              'w-full col-span-12 lg:col-span-6 md:col-span-6 flex flex-wrap justify-center items-center relative ' +
              styles.whiteArea
            }
          >
            {!userConfirmed && (
              <div>
                <div className={'w-full text-center ' + styles.title}>REGISTRO</div>
                <div className="w-full flex justify-center items-center mt-5">
                  <div className={styles.text}>¿Ya tienes una cuenta?</div>
                  <div className={'font-bold ml-4 ' + styles.text} onClick={() => router.push('/login')}>
                    Log in
                  </div>
                </div>
              </div>
            )}
            {userConfirmed === null ? (
              <div className={styles.grayAreaContent}>
                {/* email input */}
                <div className={'w-full mt-9 ' + styles.inputArea}>
                  <input
                    type="text"
                    placeholder="Email"
                    autoComplete="new-password"
                    className={'w-full h-full border border-gray-400 rounded bg-transparent py-1 px-2 text-gray-400'}
                    value={email}
                    onChange={handleChangeEmail}
                  />
                </div>
                {/* password input */}
                <div className={'w-full relative flex items-center mt-5 ' + styles.inputArea}>
                  <input
                    type={showPass === true ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Contraseña"
                    className={
                      'w-full h-full border border-gray-400 rounded bg-transparent py-1 pl-2 text-gray-400 pr-10'
                    }
                    value={password}
                    onChange={handleChangePassword}
                  />
                  <div className={'absolute right-3 cursor-pointer items-center flex'}>
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
                {/* repeat password input */}
                <div className={'w-full relative flex items-center mt-5 ' + styles.inputArea}>
                  <input
                    type={showRepeatPass === true ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Repetir contraseña"
                    className={
                      'w-full h-full border border-gray-400 rounded bg-transparent py-1 pl-2 text-gray-400 pr-10'
                    }
                    value={confirmPassword}
                    onChange={handleChangeConfirmPassword}
                  />
                  <div className={'absolute right-3 cursor-pointer'}>
                    {showRepeatPass === true ? (
                      <Image
                        src={EyeIcon}
                        alt=""
                        width={17}
                        height={17}
                        onClick={() => handleSetShowRepeatPass(false)}
                      />
                    ) : (
                      <Image
                        src={EyeCrossIcon}
                        alt=""
                        width={17}
                        height={17}
                        onClick={() => handleSetShowRepeatPass(true)}
                      />
                    )}
                  </div>
                </div>
                {/* login button part */}
                <div className={'mt-9 mb-16 flex justify-center items-center'}>
                  <div>
                    <button className={styles.m_enterButton} onClick={handleClickRegister} disabled={progressStatus}>
                      Entrar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.grayAreaContent}>
                <div>
                  <div className={'w-full relative flex items-center mt-5 ' + styles.inputArea}>
                    <input
                      type={showPass === true ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Verifica tu código"
                      className={
                        'w-full h-full border border-gray-400 rounded bg-transparent py-1 pl-2 text-gray-400 pr-10'
                      }
                      value={verifyCode}
                      onChange={handleChangeVerifyCode}
                    />
                    <div className={'absolute right-3 cursor-pointer flex items-center'}>
                      {showPass === true ? (
                        <Image
                          src={EyeGrayIcon}
                          alt=""
                          width={17}
                          height={17}
                          onClick={() => handleSetShowPass(false)}
                        />
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
                  <div className={'mt-32 flex justify-center'}>
                    <button className={styles.m_enterButton} onClick={handleVerifyCode}>
                      Entrar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className={
              'w-full col-span-12 lg:col-span-6 md:col-span-6 flex flex-wrap justify-center items-center relative ' +
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
            {userConfirmed === null ? (
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
                    autoComplete="new-password"
                    className={'w-full h-full border border-white rounded bg-transparent py-1 px-2 text-white'}
                    value={email}
                    onChange={handleChangeEmail}
                  />
                </div>
                {/* password input */}
                <div className={'w-full relative flex items-center mt-5 ' + styles.inputArea}>
                  <input
                    type={showPass === true ? 'text' : 'password'}
                    autoComplete="new-password"
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
                {/* repeat password input */}
                <div className={'w-full relative flex items-center mt-5 ' + styles.inputArea}>
                  <input
                    type={showRepeatPass === true ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Repetir contraseña"
                    className={'w-full h-full border border-white rounded bg-transparent py-1 pl-2 text-white pr-10'}
                    value={confirmPassword}
                    onChange={handleChangeConfirmPassword}
                  />
                  <div className={'absolute right-3 cursor-pointer'}>
                    {showRepeatPass === true ? (
                      <Image
                        src={EyeIcon}
                        alt=""
                        width={17}
                        height={17}
                        onClick={() => handleSetShowRepeatPass(false)}
                      />
                    ) : (
                      <Image
                        src={EyeCrossIcon}
                        alt=""
                        width={17}
                        height={17}
                        onClick={() => handleSetShowRepeatPass(true)}
                      />
                    )}
                  </div>
                </div>
                {/* login button part */}
                <div className={'mt-5 flex justify-end items-center'}>
                  <div>
                    <button className={styles.enterButton} onClick={handleClickRegister}>
                      Entrar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.grayAreaContent}>
                <div>
                  <div className={styles.updatePassword}>Verifica tu código.</div>
                  <div className={'w-full relative flex items-center mt-5 ' + styles.inputArea}>
                    <input
                      type={showPass === true ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Verifica tu código"
                      className={'w-full h-full border border-white rounded bg-transparent py-1 pl-2 text-white pr-10'}
                      value={verifyCode}
                      onChange={handleChangeVerifyCode}
                    />
                    <div className={'absolute right-3 cursor-pointer'}>
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
                  <div className={'mt-10 flex justify-end'}>
                    <button className={styles.enterButton} onClick={handleVerifyCode}>
                      Entrar
                    </button>
                  </div>
                </div>
              </div>
            )}
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

export default Register
