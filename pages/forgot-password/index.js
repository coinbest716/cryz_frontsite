import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

import { Auth } from 'aws-amplify'

// next components
import Image from 'next/image'
import router from 'next/router'

// styles
import styles from 'pages/forgot-password/ForgotPassword.module.scss'
import globalStyles from 'styles/GlobalStyles.module.scss'

// images
import LoginImage from 'assets/images/login.png'
import CloseIcon from 'assets/images/close.svg'
import KeyImage from 'assets/images/key.png'
import toast from 'react-hot-toast'
import ReactLoading from 'react-loading'

const ForgotPassword = () => {
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
  const [progressStatus, setProgressStatus] = useState(false)
  const [userEmail, setUserEmail] = useState('')
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

  const handleForgotPassword = async () => {
    setProgressStatus(true)
    await Auth.forgotPassword(userEmail)
      .then(response => {
        console.log(response)
        setProgressStatus(false)
        toast.success('Successfully send email.')
        localStorage.setItem('email', userEmail)
        router.push('/reset-password')
      })
      .catch(error => {
        console.log(error)
        setProgressStatus(false)
        toast.error(error.message)
        router.push('/login')
      })
  }

  const handleKeyPress = event => {
    if (event.keyCode === 13) {
      handleForgotPassword()
    }
  }
  const handleChangeEmail = event => {
    setUserEmail(event.target.value)
  }

  return (
    <div className={'relative'}>
      <div className={'w-full h-screen flex grid grid-cols-12'}>
        {viewport === 'mobile' ? (
          <></>
        ) : (
          <div
            className={
              'w-full col-span-12 lg:col-span-6 md:col-span-6 flex flex-wrap justify-center items-center ' +
              styles.whiteArea
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
        {viewport === 'mobile' ? (
          <div
            className={
              'w-full col-span-12 lg:col-span-6 md:col-span-6 flex flex-wrap justify-center items-center relative ' +
              styles.whiteArea
            }
          >
            <div className={styles.grayAreaContent}>
              <div className={'w-full flex justify-center'}>
                <Image src={KeyImage} alt="" width={167} height={136} />
              </div>
              <div className={'w-full text-center ' + styles.m_changePassTitle}>Cambia la contraseña</div>
              <div className={'w-full text-center mt-9 ' + styles.m_changePassText}>
                Introduce tu email y te enviaremos instrucciones para resetear tu contraseña.
              </div>
              {/* email input */}
              <div className={'w-full mt-24 ' + styles.inputArea}>
                <input
                  type="text"
                  placeholder="Email"
                  // autoComplete="off"
                  className={'w-full h-full border border-gray-400 rounded bg-transparent py-1 px-2 text-gray-400'}
                  value={userEmail}
                  onChange={handleChangeEmail}
                  onKeyDown={handleKeyPress}
                />
              </div>

              {/* login button part */}
              <div className={'mt-14 flex justify-center items-center'}>
                <button className={styles.m_enterButton} onClick={handleForgotPassword} disabled={progressStatus}>
                  Entrar
                </button>
              </div>
              {/* forgot password part */}
              <div className={'mt-4 flex justify-center items-center'}>
                <div className={styles.text}>Volver a Registro</div>
                <div
                  className={'font-bold cursor-pointer ml-4 ' + styles.text}
                  onClick={() => router.push('/register')}
                >
                  Registro
                </div>
              </div>
            </div>
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
            <div className={styles.grayAreaContent}>
              <div className={'w-full flex justify-center'}>
                <Image src={KeyImage} alt="" width={167} height={136} />
              </div>
              <div className={'w-full text-center ' + styles.changePassTitle}>Cambia la contraseña</div>
              <div className={'w-full text-center mt-9 ' + styles.changePassText}>
                Introduce tu email y te enviaremos instrucciones para resetear tu contraseña.
              </div>
              {/* email input */}
              <div className={'w-full mt-9 ' + styles.inputArea}>
                <input
                  type="text"
                  placeholder="Email"
                  // autoComplete="off"
                  className={'w-full h-full border border-white rounded bg-transparent py-1 px-2 text-white'}
                  value={userEmail}
                  onChange={handleChangeEmail}
                  onKeyDown={handleKeyPress}
                />
              </div>

              {/* login button part */}
              <div className={'mt-5 flex justify-end items-center'}>
                <button className={styles.enterButton} onClick={handleForgotPassword}>
                  Entrar
                </button>
              </div>
              {/* forgot password part */}
              <div
                className={'mt-3.5 flex justify-end items-center ' + styles.gotoRegister}
                onClick={() => router.push('/register')}
              >
                Volver a Registro
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

export default ForgotPassword
